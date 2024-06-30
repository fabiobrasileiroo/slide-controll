const os = require('os');

const interfaces = os.networkInterfaces();
const addresses = [];

for (const key in interfaces) {
    for (const iface of interfaces[key]) {
        if (iface.family === 'IPv4' && !iface.internal) {
            addresses.push(iface.address);
        }
    }
}

console.log(`Endereços IP disponíveis: ${addresses.join(', ')}`);
