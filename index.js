var io = require('socket.io');
var express = require('express');
var app = express.createServer()
  , io = io.listen(app);

console.log("app")

app.configure(function () {
  app.use(express.static(__dirname + '/web'));

  function compile (str, path) {
    return stylus(str)
      .set('filename', path)
      .use(nib());
  };
});

app.get('/', function (req, res) {
  res.render('index', { layout: false });
});

app.listen(8081, function () {
  var addr = app.address();
  console.log('   app listening on http://' + addr.address + ':' + addr.port);
});


io.sockets.on('connection', function (socket) {

	socket.on('nickname', function (nicknames) {
		  socket.broadcast.emit('nicknames', "chicle");
	      io.sockets.emit('nicknames', nicknames);
	      console.log("nicknames")
	    });

});
