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

io.on('connection', (socket) => {
    console.log('Novo cliente conectado');

    socket.on('slide', (command) => {
        console.log('Comando recebido:', command);

        switch (command) {
            case 'next':
                robot.keyTap('right');
                break;
            case 'prev':
                robot.keyTap('left');
                break;
            case 'first':
                robot.keyTap('home');
                break;
            case 'last':
                robot.keyTap('end');
                break;
        }
    });

    socket.on('mouseMove', (movement) => {
        console.log('Movimento do mouse recebido:', movement);
        const mouse = robot.getMousePos();
        robot.moveMouse(mouse.x + movement.deltaX, mouse.y + movement.deltaY);
    });

    socket.on('disconnect', () => {
        console.log('Cliente desconectado');
    });
});

server.listen(PORT, '0.0.0.0', () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
