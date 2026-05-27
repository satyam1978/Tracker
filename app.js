const express = require('express');
const socketIo = require('socket.io');
const http = require('http');
const path = require('path');

const app = express();
const server = http.createServer(app);
const port = process.env.PORT || 3000;

const io = socketIo(server);

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'view'));
app.use(express.static(path.join(__dirname, 'public')));

io.on('connection', (socket) => {
  socket.on("send-location", (data)=>{
    io.emit("receive-location", {id: data.id, ...data});
  });
  socket.on("disconnect", () => {
    io.emit("user-disconnected",socket.id);
  });
  
});

app.get('/', (req, res) => {
  res.render("index");
});

server.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});