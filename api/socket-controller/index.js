const express = require('express')
const http = require('http')
const app = express()
const server = http.createServer(app);
const {Server} = require('socket.io')
const io = new Server(server)
const buscaminasUsecase = require('../buscaminas-usecase/buscaminas-usecase')

io.on('connection', (socket)=>{
    socket.on('play', (tamannio, filas, columnas) => {
        return buscaminasUsecase.crearMatriz(tamannio, filas, columnas);
    })
    socket.on('click', (fila, columna, matriz) => {
        return buscaminasUsecase.click(fila, columna, matriz)
    })
})

server.listen(3000, () => {
    const matriz = buscaminasUsecase.crearMatriz(10, 15, 9);
    console.log(matriz)
    console.log('listening on *:3000');
  });
  