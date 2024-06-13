import { getWeather } from "../services/api.service.js";

const getForcast = async () => {
    try {
        const cities = process.env.CITY || await getKeyValue(TOKEN_DICTIONARY.city);

        cities.forEach(async city => {
            const weather =  await getWeather(city);
            printWeather(weather, getIcon(weather.weather[0].icon)); 
        });     
    } catch (error) {
        if(error?.response?.status == 404) {
            printError('Wrong city');
        } else if(error?.response?.status == 401) {
            printError('Wrong token');
        } else {
            printError(error.message);
        }
    }
}

export { getForcast };