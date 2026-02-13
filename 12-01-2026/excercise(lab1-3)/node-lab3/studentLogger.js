const EventEmitter = require('events');
const fs = require('fs');
const path = require('path');

class StudentLogger extends EventEmitter {}
const logger = new StudentLogger();

function logToFile(message) {
    const date = new Date().toISOString().split('T')[0];
    const dir = 'logs';

    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
    }

    const filePath = path.join(dir, `activity-${date}.log`);
    const logMessage = `${new Date().toISOString()} - ${message}\n`;

    fs.appendFile(filePath, logMessage, (err) => {
        if (err) {
            console.error('Error writing log:', err);
        }
    });
}

logger.on('login', (studentName) => {
    logToFile(`Student ${studentName} logged in`);
});

logger.on('view_lesson', (data) => {
    logToFile(`Student ${data.name} viewed lesson ${data.lesson}`);
});

logger.on('submit_assignment', (data) => {
    logToFile(`Student ${data.name} submitted assignment ${data.assignment}`);
});

//Exercise 1 – logout (Easy)
logger.on('logout', (name) => {
    logToFile(`Student ${name} logged out`);
});

//Exercise 2 – quiz_attempt (Medium)
logger.on('quiz_attempt', (data) => {
    logToFile(`Student ${data.name} attempted quiz: ${data.score}/${data.total}`);
});
logger.emit('quiz_attempt', {
    name: 'Bob',
    score: 8,
    total: 10
});

//Exercise 4 – error event (Advanced)
logger.on('error', (err) => {
    const errorMessage = `${new Date().toISOString()} - ${err}\n`;

    fs.appendFile('error.log', errorMessage, (err) => {
        if (err) {
            console.error('Error writing error log:', err);
        }
    });
});
logger.emit('error', 'Database connection failed');

module.exports = logger;