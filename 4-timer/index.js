const hours = parseInt(process.argv[2]);
const minites = parseInt(process.argv[3]);
const seconds = parseInt(process.argv[4]);

const calculateInterval = (hours, minites, seconds) => {
    let interval = 0;
    if(hours) interval += hours * 60 * 60 * 1000;
    if(minites) interval += minites * 60 * 1000;
    if(seconds) interval += seconds * 1000;
    return interval;
}

const interval = calculateInterval(hours, minites, seconds);

if(interval) {
    console.log('Alarm set successfully!');
    setTimeout(() => {
        console.log('Alarm!');
    }, interval);
} else {
    console.log('Timeout must be at least 1 second!');
}

