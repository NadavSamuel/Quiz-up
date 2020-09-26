
module.exports = connectSockets


var players = [];
function connectSockets(io) {
    io.on('connection', socket => {
        socket.on('room quiz', quiz => {
            // console.log('got quiz: ', quiz)
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
            // console.log('here',gamePlayers)
            io.to(socket.currQuiz).emit('game started', gamePlayers)
            // io.to(socket.currQuiz).emit('game addPlayer', player)

        })

        socket.on('change ready', data => {
            var quizPlayers= players.find(player=>player.id===socket.currQuiz)
            const {playerName,isReady}=data
            if(!quizPlayers.players) return;
            let newPlayers = [...quizPlayers.players];
            newPlayers = newPlayers.map(player => {
                if (player.username === playerName) return { ...player, isReady }
                return player
            })
            quizPlayers.players=newPlayers
            io.to(socket.currQuiz).emit('update ready', data)
        })

        socket.on('game removePlayer', username => {
            var quizPlayers= players.find(player=>player.id===socket.currQuiz)
            if(!quizPlayers.players) return;
            let newPlayers = [...quizPlayers.players];
            newPlayers = newPlayers.filter(player => player.username!==username)
            quizPlayers.players=newPlayers
            io.to(socket.currQuiz).emit('update players', username)
        })

        socket.on('send score', data => {
            io.to(socket.currQuiz).emit('update score', data)
        })


        
    })
}