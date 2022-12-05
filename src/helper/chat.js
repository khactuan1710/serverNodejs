
class SocketServices {

    //connection socket
    connection(socket) {
        socket.on('disconnect', () => {
            console.log(`User disconnect id is ${socket.id}`);
        })

        // socket.on('connection', () => {
        //     console.log('a user connected ' + socket.id);
        // })

        // event on here

        socket.on('message', msg => {
            console.log(msg)
            // console.log(`msg is ${msg}`)
            socket.emit('message', msg)
        })

        // on room..
    }
}

module.exports = new SocketServices();