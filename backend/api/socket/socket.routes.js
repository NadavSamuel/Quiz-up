
module.exports = connectSockets


const players = [];
function connectSockets(io) {
    io.on('connection', socket => {
        socket.on('room quiz', quiz => {
            console.log('got quiz: ', quiz)
            if (socket.currQuiz) {
                socket.leave(socket.currQuiz)
            }
            socket.join(quiz)
            socket.currQuiz = quiz;
            var quizPlayers= players.find(player=>player.id===socket.currQuiz)
            if(!quizPlayers) quizPlayers={id:socket.currQuiz, players:[]}
            io.to(socket.currQuiz).emit('getPlayers', quizPlayers.players)
        })

        socket.on('game newPlayer', player => {
            const idx=players.findIndex(player=>player.id===socket.currQuiz)
            if(idx===-1){
                players.unshift({id:socket.currQuiz,players:[player]})
            }else{
                players[idx].players.push(player)
            }
            io.to(socket.currQuiz).emit('game addPlayer', player)
        })

        socket.on('start game', gamePlayers => {
            io.to(socket.currQuiz).emit('game started', gamePlayers)
        })

        socket.on('send score', data => {
            io.to(socket.currQuiz).emit('update score', data)
          // socketService.emit('update score', {playerName:currUser, score});
        })


        
    })
}