 var socket = io.connect('http://localhost:8081');
      
  socket.on('removeScreen', function(msg){
    console.log("message " + msg);
  });