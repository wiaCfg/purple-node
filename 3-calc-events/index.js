const EventEmitter = require('node:events');

const calculator = new EventEmitter();

const events = {
    add: (firstNum, secondNum) => {
        console.log(firstNum + secondNum);
    }, 
    minus: (firstNum, secondNum) => {
        console.log(firstNum - secondNum);
    }, 
    multiply: (firstNum, secondNum) => {
        console.log(firstNum * secondNum);
    },
    divide: (firstNum, secondNum) => {
        if(!isFinite(firstNum / secondNum)) 
            return console.log('Error! You trying to divide by zero!');
        console.log(firstNum / secondNum);
    }
};

const firstNum = process.argv[2];
const secondNum = process.argv[3];
const event = process.argv[4];

calculator.on(event, events[event], parseFloat(firstNum), parseFloat(secondNum));

if(
    !events.hasOwnProperty(event) ||
    isNaN(firstNum) || 
    isNaN(secondNum)
) {
    console.error('Error! Incorrect arguments passed!');
    return;
}

calculator.emit(event, firstNum, secondNum);
