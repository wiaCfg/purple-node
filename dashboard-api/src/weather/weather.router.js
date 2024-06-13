import { Router } from 'express';
import { TOKEN_DICTIONARY, getKeyValue, saveKeyValue } from '../services/storage.service.js';
import { getWeather } from '../services/api.service.js';


const weatherRouter = Router();

weatherRouter.get('/forcast', async (req, res) => {
    const token = await getKeyValue(TOKEN_DICTIONARY.token);
    const cites = await getKeyValue(TOKEN_DICTIONARY.city);

    if(!token) res.status(400).send('You need to setup token!');
    if(!cites) res.status(400).send('You need to setup city!');

    try {
        const reqData = cites.split(',').map(city => getWeather(city));
        const data = await Promise.all(reqData);
        return res.json(data);
    } catch (error) {
        return res.status(400).send(error.message);
    }
});

weatherRouter.post('/set', async (req, res) => {
    const { token, language, city } = req.body;

    if(!token && !language && !city) {
        return res.status(400).send('You need to pass any parameter to setup!');
    }

    if(token) {
        try {
            await saveKeyValue(TOKEN_DICTIONARY.token, token);
            return res.status(201).send('Token successfully saved');
        } catch (error) {
            return res.status(400).send(error.message);
        }
    }

    if(language) {
        try {
            await saveKeyValue(TOKEN_DICTIONARY.language, language);
            return res.status(201).send('Language successfully saved');
        } catch (error) {
            return res.status(400).send(error.message);
        }
    }

    if(city) {
        try {
            await saveKeyValue(TOKEN_DICTIONARY.city, city);
            return res.status(201).send('City successfully saved');
        } catch (error) {
            return res.status(400).send(error.message);
        }
    }
});


export { weatherRouter };
