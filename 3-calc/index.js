const fs = require('fs');

const firstNum = process.argv[2];
const secondNum = process.argv[3];
const operation = process.argv[4];

if(isNaN(firstNum) || isNaN(secondNum) || !isFinite(firstNum / secondNum)) {
    console.error('Error! Incorrect arguments passed!');
    return;
}

try {
    const calculator = require(`./${operation}.js`);
    console.log(calculator(parseFloat(firstNum), parseFloat(secondNum)));
} catch (error) {
    console.error('Error! Unknown calculator...')
}
