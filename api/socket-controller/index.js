const express = require('express')
const http = require('http')
const app = express()
const server = http.createServer(app);
const {Server} = require('socket.io')
const io = new Server(server)
const buscaminasUsecase = require('../buscaminas-usecase/buscaminas-usecase')


io.on('connection', (socket)=>{
    return buscaminasUsecase
})