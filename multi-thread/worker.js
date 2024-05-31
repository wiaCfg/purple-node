const { parentPort, workerData } = require('worker_threads');

let cnt = 0;

workerData.forEach((val) => {
    if(!(val % 3)) cnt += 1;
});

parentPort.postMessage(cnt);