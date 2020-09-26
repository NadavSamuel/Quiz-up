
module.exports = connectSockets

//NOW3

var activeRooms = [];
function connectSockets(io) {
    io.on('connection', socket => {
        socket.on('room quiz', quiz => {
            if (socket.roomId) {
                socket.leave(socket.roomId)
            }
            socket.join(quiz)
            socket.roomId = quiz;
            var quizPlayers = activeRooms.find(room => room.id === socket.roomId)
            if (!quizPlayers) quizPlayers = { id: socket.roomId, players: [] }
            io.to(socket.roomId).emit('getPlayers', quizPlayers.players)
        })
        socket.on('game newPlayer', player => {
            const roomIdx = activeRooms.findIndex(room => room.id === socket.roomId)
            if (roomIdx === -1) {
                activeRooms.unshift({ id: socket.roomId, players: [player] })
            } else {
                activeRooms[roomIdx].players.push(player)
            }
            io.to(socket.roomId).emit('game addPlayer', player)
        })

        socket.on('start game', gamePlayers => {
            io.to(socket.roomId).emit('game started', gamePlayers)

        })

        socket.on('change ready', data => {
            var quizPlayers = activeRooms.find(room => room.id === socket.roomId)
            const { playerName, isReady } = data
            if (!quizPlayers.players) return;
            let newPlayers = [...quizPlayers.players];
            newPlayers = newPlayers.map(player => {
                if (player.username === playerName) return { ...player, isReady }
                return player
            })
            quizPlayers.players = newPlayers
            io.to(socket.roomId).emit('update ready', data)
        })

        socket.on('game removePlayer', username => {
            var quizPlayers = activeRooms.find(room => room.id === socket.roomId)
            if (!quizPlayers.players) return;
            let newPlayers = [...quizPlayers.players];
            newPlayers = newPlayers.filter(player => player.username !== username)
            quizPlayers.players = newPlayers
            io.to(socket.roomId).emit('update players', username)
        })

        socket.on('send score', data => {
            io.to(socket.roomId).emit('update score', data)
        })



    })
}