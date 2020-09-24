
module.exports = connectSockets
const players = []

function connectSockets(io) {
    io.on('connection', socket => {
        socket.on('room quiz', quiz => {
            if (socket.currQuiz) {
                socket.leave(socket.currQuiz)
            }
            socket.join(quiz)
            socket.emit('getPlayers', players)
            socket.currQuiz = quiz;
        })
        // socket.on('is typing', username => {
        //     socket.to(socket.myTopic).emit('user typing',username)
            
        // })

        socket.on('game newPlayer', player => {
            players.push(player)
            console.log('New Player:', player)
            io.to(socket.currQuiz).emit('game addPlayer', player)
        })
    })
}