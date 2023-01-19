var cron = require('node-cron');

function startCronJob() {
    var task = cron.schedule('*/15 * * * * *', () => {
        console.log('Cron job trigger');
    });

    task.start();
}


module.exports = {
    startCronJob
}