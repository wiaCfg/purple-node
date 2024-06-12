#!/usr/bin/env node
import { getArgs } from "./helpers/args.js";
import { printSuccess, printHelp, printError, printWeather } from "./services/log.service.js";
import { saveKeyValue, getKeyValue ,TOKEN_DICTIONARY } from "./services/storage.service.js";
import { getWeather, getIcon } from './services/api.service.js';
import dedent from 'dedent';
import translate from './helpers/translate.js';

const saveToken = async (token) => {
    if(!token[0].length) {
        printError('Token is required!');
        return;
    }
    try {
        await saveKeyValue(TOKEN_DICTIONARY.token, token[0]);
        printSuccess('Token successfully saved!');
    } catch (error) {
        printError(error.message);
    }
}

const saveLanguage = async (language) => {
    if(!translate.hasOwnProperty(language)) {
        printError('Wrong language passed!');
        return;
    }
    try {
        await saveKeyValue(TOKEN_DICTIONARY.language, language[0]);
        printSuccess('Language successfully saved!');
    } catch (error) {
        printError(error.message);
    }
}

const saveCity = async (city) => {
    if(!city.length) {
        printError('City is required!');
        return;
    }
    try {
        await saveKeyValue(TOKEN_DICTIONARY.city, city);
        printSuccess('City successfully saved!');
    } catch (error) {
        printError(error.message);
    }
}

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

const initCLI = async () => {
    const args = getArgs(process.argv);

    if(args.h) {
        return printHelp();
    }

    if(args.s) {
        return saveCity(args.s)
    }

    if(args.t) {
        return saveToken(args.t);
    }

    if(args.l) {
        return saveLanguage(args.l);
    }
    return getForcast();
}

initCLI();
