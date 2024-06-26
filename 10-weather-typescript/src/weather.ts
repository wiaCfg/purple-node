#!/usr/bin/env node
import { getArgs } from './helpers/args';
import { getWeather, getIcon } from './services/api.service';
import { printHelp, printSuccess, printError, printWeather } from './services/log.service';
import { saveKeyValue, TOKEN_DICTIONARY, getKeyValue } from './services/storage.service';


const saveToken = async (token: string | boolean) => {
  if (typeof token === 'boolean') return;
  if (!token.length) {
    printError('Не передан token');
    return;
  }
  try {
    await saveKeyValue(TOKEN_DICTIONARY.token, token);
    printSuccess('Токен сохранён');
  } catch (e) {
    printError((e as Error).message);
  }
}

const saveCity = async (city: string | boolean) => {
  if (typeof city === 'boolean') return;
  if (!city.length) {
    printError('Не передан город');
    return;
  }
  try {
    await saveKeyValue(TOKEN_DICTIONARY.city, city);
    printSuccess('Город сохранён');
  } catch (e) {
    printError((e as Error).message);
  }
}

const printForcast = async () => {
  try {
    const city = process.env.CITY ?? await getKeyValue(TOKEN_DICTIONARY.city);
	if(city) {
		const weather = await getWeather(city);
		const icon: string = getIcon(weather.weather[0].icon);
		printWeather(weather, icon);
	} else {
		throw new Error('Ошибка, город задан не верно!');
	}
  } catch (e: any) {
    if (e?.response?.status === 404) {
      printError('Неверно указан город');
    } else if (e?.response?.status === 401) {
      printError('Неверно указан токен');
    } else {
      printError(e.message);
    }
  }
}

const initCLI = () => {
  const args = getArgs(process.argv);
  if (args.h) {
    return printHelp();
  }
  if (args.s) {
    return saveCity(args.s);
  }
  if (args.t) {
    return saveToken(args.t);
  }
  return printForcast();
};

initCLI();