
module.exports = connectSockets
const history = []

function connectSockets(io) {
    io.on('connection', socket => {
        socket.on('chat topic', topic => {
            if (socket.myTopic) {
                socket.leave(socket.myTopic)
            }
            socket.join(topic)
            socket.emit('getMsgs', history)
            socket.myTopic = topic;
        })
        socket.on('is typing', username => {
            socket.to(socket.myTopic).emit('user typing',username)
            
        })

        socket.on('chat newMsg', msg => {
            history.push(msg)
            console.log('Got Msg:', msg.txt)
            // io.emit('chat addMsg', msg)
            // emits only to sockets in the same room
            io.to(socket.myTopic).emit('chat addMsg', msg)
        })
    })
}