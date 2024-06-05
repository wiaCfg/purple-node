const { Worker } = require('worker_threads');
const perf_hooks = require('perf_hooks');

const arr = Array.from({length: 30000}, (_, i) => i + 1); 

const performanceObserver = new perf_hooks.PerformanceObserver((items, observer) => {
	items.getEntries().forEach((entry) => {
        if (entry.entryType === "mark") {
          console.log(`${entry.name}'s startTime: ${entry.startTime}`);
        }
        if (entry.entryType === "measure") {
          console.log(`${entry.name}'s duration: ${entry.duration}`);
        }
      });
});

performanceObserver.observe({ entryTypes: ['measure', 'function'] });

const linear = (arr) => {
    performance.mark('linear start');
    let cnt = 0;

    arr.forEach((val) => {
        if(!(val % 3)) cnt += 1;
    });

    console.log(cnt);
    performance.mark('linear end');
    performance.measure('linear', 'linear start', 'linear end');
}

const workerThread = (arr) => {
    return new Promise((resolve, reject) => {
        const worker = new Worker('./worker.js', {
            workerData: arr,
        });
    
        worker.on('message', (msg) => {
            resolve(msg);
        });
    
        worker.on('error', (err) => {
            reject(err);
        });
    });
}

function splitArray(arr) {
    const chunkSize = Math.ceil(arr.length / 4);
    const splitedArray = [];

    for (let i = 0; i < 4; i++) {
        const start = i * chunkSize;
        const end = Math.min(start + chunkSize, arr.length);
        const chunk = arr.slice(start, end);
        splitedArray.push(chunk);
    }
    return splitedArray;
}

const paralel = async (arr) => {
    performance.mark('paralel start');
    
    const splitedArray = splitArray(arr);
    const req = splitedArray.map(arr => workerThread(arr));
    const res = await Promise.all(req);
    console.log(res.reduce((acc, item) => acc + item));

    performance.mark('paralel end');
    performance.measure('paralel', 'paralel start', 'paralel end');
}

linear(arr);
paralel(arr);
