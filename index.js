
const { startSocketConnection } = require("./src/socket");
const { app } = require("./src/app");
const { dbConnect } = require("./src/config/db");
const { startCronJob } = require("./src/utils/cron-job/node-cron");
const http = require('http');

const startServer = async () => {

    dbConnect(process.env.MONGO_URL);
    
    let server = http.createServer(app);
    server.listen(process.env.PORT || 3001, () => {
        console.log(`Server started on port ${process.env.PORT || 3001}`)
    });
    startSocketConnection(server);
};


startServer();