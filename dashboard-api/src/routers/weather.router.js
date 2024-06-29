import { Router } from 'express';
import { TOKEN_DICTIONARY, getKeyValue, saveKeyValue } from '../services/storage.service.js';
import { getWeather } from '../services/api.service.js';


const weatherRouter = Router();

weatherRouter.get('/forcast', async (req, res) => {
    const token = await getKeyValue(TOKEN_DICTIONARY.token);
    const cities = await getKeyValue(TOKEN_DICTIONARY.city);
    const errors = [];

    if(!token) errors.push({ message: 'You need to setup token!' });
    if(!cities) errors.push({ message: 'You need to setup city!' });

    if (errors.length > 0) {
        return res.status(400).send(errors);
    }

    try {
        const citiesArray = cities.split(',');
        const data = [];

        const chunkSize = 2;
        for (let i = 0; i < citiesArray.length; i += chunkSize) {
            const chunk = citiesArray.slice(i, i + chunkSize);
            const reqData = chunk.map(city => getWeather(city));
            const reqChank = await Promise.all(reqData);
            data.push(reqChank);
        }

        return res.json(data);
    } catch (error) {
        return res.status(400).send(error.message);
    }
});

weatherRouter.post('/set', async (req, res) => {
    const keys = Object.keys(req.body);
    if(keys.length < 1) 
        return res.status(400).send('You must to pass at least one parameter!');
        
    keys.forEach(async (key) => {
        try {
            if(!TOKEN_DICTIONARY[key])
                return res.status(400).send('Unknown parametr passed');
            await saveKeyValue(TOKEN_DICTIONARY[key], req.body[key]);
        } catch (error) {
            return res.status(400).send(error.message);
        }
    });
    return res.status(201).send(keys.toString() + ' - successfully saved');
});


export { weatherRouter };
