const client = require('twilio')(accountSid, authToken);
const logger = require('./logger');

const accountSid = process.env.ACCOUNT_SID;
const authToken = process.env.ACCOUNT_SID;

function sendSMS(body, from, to) {
    return client.messages
        .create({ body, from, to })
        .then(message => logger.info('message: ' + JSON.stringify(message)))
        .done();
}

module.exports = sendSMS;