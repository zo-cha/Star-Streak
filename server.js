const express = require("express");
const socketIO = require("socket.io");
const http = require("http");

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

const players = {};

const path = require("path");``
app.use(express.static(__dirname));

io.on("connection", (socket) => {
  console.log("Player connected:", socket.id);

  socket.on("playerData", (data) => {
    players[socket.id] = {
      id: socket.id,
      ...data
    };
    io.emit("playerData", Object.values(players));
  });

  socket.on("playerHitAsteroid", (data) => {
    io.emit("playerHitAsteroid", data);
  });

  socket.on("disconnect", () => {
    delete players[socket.id];
    io.emit("disconnected", socket.id);
    console.log("Player disconnected:", socket.id);
  });
});

server.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});