const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", // client url
    methods: ["GET", "POST"],
  },
});

io.on("connect", (socket) => {
  console.log("User Connected", socket.id);

  socket.on("join", (data) => {
    //--------> Join specific Room
    socket.join(data);
  });

  socket.on("message", (data) => {
    // if (data.room === "") {
    //   socket.broadcast.emit("receive", data); //------> Send message to everyone apart from you
    // } else {
    socket.to(data.room).emit("receive", data); //----> send message just to people joined this room
    // }
  });

  socket.on("disconnect", () => {
    console.log("User Disconnect:" + socket.id);
  });
});

server.listen(3001, () => {
  console.log("server running on port 3001");
});
