var app            = require ('express')()
    , http         = require ('http').Server(app)
    , serveStatic  = require ('serve-static')
    , io           = require ('socket.io')(http);

io.on('connection', function (socket) {
  console.log('a user is connected');

  socket.on('message:send', function (message) {
    io.emit('message:received', message);
  });
});

app.use(serveStatic (__dirname + '/front', { 'index': 'index.html' }));

http.listen(4000, function () {
  console.log('Front-end Server listening to port 4000');
});
