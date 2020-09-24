
module.exports = connectSockets
const players = []

function connectSockets(io) {
    io.on('connection', socket => {
        socket.on('room quiz', quiz => {
            if (socket.roomId) {
                socket.leave(socket.roomId)
            }
            socket.join(quiz)
            socket.emit('getPlayers', players)
            socket.currQuiz = quiz;
        })

        socket.on('game newPlayer', player => {
            players.push(player)
            io.to(socket.roomId).emit('game addPlayer', player)
        })

        socket.on('start game', gamePlayers => {
            io.to(socket.roomId).emit('game started',gamePlayers)
        })
    })
}