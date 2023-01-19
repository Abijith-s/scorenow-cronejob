var io = require('socket.io-client');
var cron = require('node-cron');
const { trigger } = require('../utils/cron-job/trigger');

const startSocketConnection = async (server) => {

    var socket = io.connect("http://localhost:4000/", {
        reconnection: true,
        'reconnectionDelay': 5000,
        'reconnectionAttempts': 10
    });


    socket.on('connect', () => {
        console.log("connected");
        cron.schedule('*/15 * * * * *', async () => {
            // const { liveMatch } = await trigger();
            socket.emit('trigger', 'update the match data');
        }).start();
    });

    socket.on('disconnect', () => {
        console.log("disconnected");
        socket.disconnect();
        socket = io.connect("http://localhost:4000/", {
            reconnection: true,
            'reconnectionDelay': 5000,
            'reconnectionAttempts': 10
        });
    })
}

module.exports = {
    startSocketConnection
};