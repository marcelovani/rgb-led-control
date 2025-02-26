const express = require("express")
const http = require("http")
const path = require("path")

const app = express()
const server = http.createServer(app)

const io = require("./io")(server)

app.use(express.static(path.join(__dirname, "public")))

const PORT = process.env.PORT || 3000
const HOST = process.env.HOST || "127.0.0.1"

server.listen(PORT, HOST, function (error) {
	if (error) {
		console.error(error)
	}
	else {
		console.log(`Server is listening on PORT:${PORT}\nHOST:${HOST}`)
	}
})

io.on('connection', function(socket){
    console.log('New connection');

	socket.on('changeColor', function (data) {
		console.log(data);
		// Send it back to the UI.
		io.emit('changeColor', data);
	});

	socket.on('changeBrightness', function (data) {
		console.log(data);
		// Send it back to the UI.
		io.emit('changeBrightness', data);
	});

    socket.on('disconnect', function(){
      console.log('user disconnected');
	    socket.broadcast.emit('user left', {name: 'foo'});
    });
});
