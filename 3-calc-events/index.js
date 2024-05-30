const EventEmitter = require('node:events');

const calculator = new EventEmitter();
const events = ['add', 'minus', 'multiply', 'divide'];

const firstNum = process.argv[2];
const secondNum = process.argv[3];
const event = process.argv[4];

calculator.on('add', (firstNum, secondNum) => {
    console.log(firstNum + secondNum);
});

calculator.on('minus', (firstNum, secondNum) => {
    console.log(firstNum - secondNum);
});

calculator.on('multiply', (firstNum, secondNum) => {
    console.log(firstNum * secondNum);
});

calculator.on('divide', (firstNum, secondNum) => {
    console.log(firstNum / secondNum);
});

if(!events.includes(event) ||
    !firstNum || 
    !secondNum
    ) {
    console.error('Error! Incorrect arguments passed!');
    return;
}

calculator.emit(event, parseFloat(firstNum), parseFloat(secondNum));
