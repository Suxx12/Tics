const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');
const socketIo = require('socket.io');
const app = express();
const port = 3000;

const server = http.createServer(app);
const io = socketIo(server);

app.use(bodyParser.json());

app.post('/api/datos', (req, res) => {
  const datos = req.body;
  console.log(datos);
  
  io.emit('nuevosDatos', datos);
  
  res.send('Datos recibidos');
});

io.on('connection', (socket) => {
  console.log('Nuevo cliente conectado');
  socket.on('disconnect', () => {
    console.log('Cliente desconectado');
  });
});

server.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
