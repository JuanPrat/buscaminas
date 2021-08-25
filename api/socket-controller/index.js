const express = require("express");
const http = require("http");
const app = express();
const server = http.createServer(app);
const { Server } = require("socket.io");
const buscaminasUsecase = require("../buscaminas-usecase/buscaminas-usecase");
const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:3000",
  }
});
const { start, job } = require("microjob");

io.on("connection", (socket) => {
  console.log("user connected")
  socket.on('play', async (req, res) => {
    const { filas, columnas, cantidadBombas } = req;
    const matrizJuego = await job(({ filas, columnas, cantidadBombas }) => {
      const buscaminasUsecase = require("../buscaminas-usecase/buscaminas-usecase");
      return buscaminasUsecase.crearMatriz(filas, columnas, cantidadBombas)
    }, {
      data: {
        filas: filas,
        columnas: columnas,
        cantidadBombas: cantidadBombas
      }
    })
    socket.emit('playReturn', {matrizJuego, cantidadBombas})
  })

});

server.listen(3001, async () => {
  await start()
  console.log("listening on *:3001");
});