const { Worker } = require('worker_threads');
const perf_hooks = require('perf_hooks');
const OS = require('os');

process.env.UV_THREADPOOL_SIZE = OS.cpus().length;

console.log(OS.cpus().length)

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


const arr = [];
for(let i = 1; i <= 300000; i++) {
    arr.push(i);
}

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

const count = (arr) => {
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

const paralel = async (arr) => {
    performance.mark('paralel start');
    let cnt = 0;

    const cnt_1 = await count(arr.slice(0, 75000));
    const cnt_2 = await count(arr.slice(75000, 150000));
    const cnt_3 = await count(arr.slice(150000, 225000));
    const cnt_4 = await count(arr.slice(225000, 300000));

    console.log(cnt_1+cnt_2+cnt_3+cnt_4);
    performance.mark('paralel end');
    performance.measure('paralel', 'paralel start', 'paralel end');
}

linear(arr);
paralel(arr);
