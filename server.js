const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');
const robot = require('robotjs');


const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const PORT = process.env.PORT || 3000;

// Servir página estática
app.use(express.static(path.join(__dirname, '/public')));

// Endpoint para receber comandos de slide via WebSocket
io.on('connection', (socket) => {
    console.log('Novo cliente conectado');

    socket.on('slide', (command) => {
        console.log('Comando recebido:', command);

        // Implementar lógica para avançar ou retroceder slides com teclas simuladas
        if (command === 'next') {
            // Simular pressionamento de tecla para avançar slide (tecla da direita)
            robot.keyTap('right');
        } else if (command === 'prev') {
            // Simular pressionamento de tecla para retroceder slide (tecla da esquerda)
            robot.keyTap('left');
        }
    });

    socket.on('disconnect', () => {
        console.log('Cliente desconectado');
    });
});

server.listen(PORT, '0.0.0.0', () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
