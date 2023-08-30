const repl = require('repl');

function getRandomNumber() {
    return Math.random();
}

repl.start('REPL mode (Type command): ').context.getRandomNumber = getRandomNumber;

