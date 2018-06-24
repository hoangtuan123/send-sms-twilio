const express = require('express');
const http = require('http');

require('dotenv').config();
const loggers = require('./src/ultis/logger');

const port = process.env.PORT;
const app = new express();

const writeLog = (req, res, next) => {
    loggers.info(req.path);

    const end = res.end;

    res.end = (chunk, encoding) => {
        loggers.info(req.path, res.statusCode);
        loggers.debug(req.path + ' body:', chunk.toString('utf8'));
        res.end = end;
        res.end(chunk, encoding);
    };

    next();
}

app.use(writeLog);

app.get('/logging', (req, res) => {
    res.status(200)
        .end(JSON.stringify({ status: "OK" }));
});


app.get('/logging/1', (req, res) => {
    res.status(200)
        .send(JSON.stringify({ status: "OK" }));
});

http.createServer(app).listen(port, () => {
    loggers.info("server listening on port:", port);
});