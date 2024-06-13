import express from 'express';
import bodyParser from 'body-parser';
import { weatherRouter } from './src/weather/weather.router.js';

const PORT = 3030;
const app = express();

app.use(bodyParser.json());
app.use('/weather', weatherRouter);

app.use((req, res, next) => {
    res.status(404).json({ error: 'Not Found' });
});
  

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Internal Server Error' });
});

app.listen(PORT, () => {
    console.log('Server launched!');
});
