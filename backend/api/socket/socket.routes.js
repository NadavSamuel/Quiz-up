
module.exports = connectSockets

var activeRooms = {};
function connectSockets(io) {
    io.on('connection', socket => {
        socket.on('sign game', quiz => {
            if (socket.roomId) {
                socket.leave(socket.roomId)
            }
            socket.join(quiz)
            socket.roomId = quiz;
            var quizPlayers = activeRooms[socket.roomId]
            if (!quizPlayers) {
                activeRooms[socket.roomId] = { players: [] }
                quizPlayers = activeRooms[socket.roomId]
            }
            io.to(socket.roomId).emit('getPlayers', quizPlayers.players)
        })
        socket.on('game newPlayer', player => {
            const room = activeRooms[socket.roomId];     
            room.players.push(player)
            io.to(socket.roomId).emit('game addPlayer', player)
        })
        socket.on('start game', gamePlayers => {
            io.to(socket.roomId).emit('game started', gamePlayers)
        })
        socket.on('toggle ready', playerData => {
            const room = activeRooms[socket.roomId]
            const { playerName, isReady } = playerData
            room.players = room.players.map(player => {
                if (player.username === playerName) return { ...player, isReady }
                return player
            })
            io.to(socket.roomId).emit('update ready', playerData)
        })
        socket.on('game removePlayer', username => {
            const room = activeRooms[socket.roomId]
            if (!room.players) return;
            room.players = room.players.filter(player => player.username !== username);
            io.to(socket.roomId).emit('update players', username)
        })
        socket.on('send score', score => {
            io.to(socket.roomId).emit('update score', score)
        })
    })
}