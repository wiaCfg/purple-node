import axios from 'axios';
import { getKeyValue, TOKEN_DICTIONARY } from "./storage.service.js";


const getWeather = async (city) => {
    const token = await getKeyValue(TOKEN_DICTIONARY.token);
    const lang = await getKeyValue(TOKEN_DICTIONARY.language) || 'en';

    if(!token) {
        throw new Error('Токен не задан!')
    }

    const { data } = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
        params: {
            q: city,
            appid: token,
            lang,
            units: 'metric'
        }
    });
    return data;
}

export { getWeather };
