//node index.js 0h 0m 1s
const notifier = require('node-notifier');
const path = require('path');

const getIntarval = () => {
  let h, m, s;
  const [executer, file, ...params] = process.argv;
  params.forEach(param => {
    if(param.includes('h')) h = parseInt(param);
    if(param.includes('m')) m = parseInt(param);
    if(param.includes('s')) s = parseInt(param);
  });
  return {h, m, s};
}

function sendNotification(message) {
    notifier.notify({
      title: 'Node.js Notification',
      icon: path.join(__dirname, 'image.jpg'),
      message: 'message',
      sound: true,
      wait: false
    }, function (err, response, metadata) {
      if (err) {
        console.error('Notification Error:', err);
      } else {
        console.log('Notification Response:', response);
      }
    });
}

const calculateInterval = () => {
    let interval = 0;
    const { h, m, s } = getIntarval();
    if(h) interval += h * 60 * 60;
    if(m) interval += m * 60;
    if(s) interval += s;
    return interval * 1000;
}

const interval = calculateInterval();

if(interval) {
    console.log('Alarm set successfully!');
    setTimeout(() => sendNotification('Message'), interval);
} else {
    console.log('Timeout must be at least 1 second!');
}
