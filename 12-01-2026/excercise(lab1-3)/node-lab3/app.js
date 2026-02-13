const logger = require('./studentLogger');

logger.emit('login', 'Alice');

logger.emit('view_lesson', {
    name: 'Alice',
    lesson: 'EventEmitter Basics'
});

logger.emit('quiz_attempt', {
    name: 'Bob',
    score: 8,
    total: 10
});

logger.emit('submit_assignment', {
    name: 'Alice',
    assignment: 'Lab 3'
});

logger.emit('logout', 'Alice');

logger.emit('error', 'Database connection failed');

console.log('All events emitted successfully!');