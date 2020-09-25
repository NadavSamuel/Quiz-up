
module.exports = connectSockets

const activeQuizes = []
function connectSockets(io) {
    io.on('connection', socket => {
        socket.on('room quiz', quiz => {
            console.log('got quiz: ', quiz)
            if (socket.currQuiz) {
                socket.leave(socket.currQuiz)
            }
            socket.join(quiz)
            socket.currQuiz = quiz;
            activeQuizes.push({ id: currQuiz, players:[] })
            console.log('Players:', activeQuizes);
            io.to(socket.currQuiz).emit('getPlayers', players)
        })

        socket.on('game newPlayer', player => {
            // if (socket.currQuiz.players) socket.currQuiz.players.push(player)
            // else socket.currQuiz.players = [player]
            players.push(player)
            console.log('players in backend:', socket.currQuiz.players);
            io.to(socket.currQuiz).emit('game addPlayer', player)
        })

        socket.on('start game', gamePlayers => {
            io.to(socket.currQuiz).emit('game started', gamePlayers)
        })
    })
}