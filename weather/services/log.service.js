import chalk from 'chalk';
import dedent from 'dedent';
import translate from '../helpers/translate.js';
import { getKeyValue, TOKEN_DICTIONARY } from "./../services/storage.service.js";


const printError = (error) => {
    console.log(chalk.bgRed(' Error ') + ' ' + error);
}

const printSuccess = (msg) => {
    console.log(chalk.bgGreen(' Error ') + ' ' + msg);
}

const printHelp = () => {
    console.log(
        dedent`
        ${chalk.bgCyan(' HELP ')}
        Без параметров - вывод погоды
        -s [CITY] для установки города
        -h для вывода помощи 
        -t [API] для сохранения токена
        `
    );
}

const printWeather = async (res, icon) => {
    const language = await getKeyValue(TOKEN_DICTIONARY.language) || 'ru';

	console.log(
		dedent`${chalk.bgYellow(' WEATHER ')} ${translate[language].weatherIn} ${res.name}
		${icon}  ${res.weather[0].description}
		${translate[language].temperature}: ${res.main.temp} (${translate[language].feelsLike} ${res.main.feels_like})
		${translate[language].humidity}: ${res.main.humidity}%
		${translate[language].windSpeed}: ${res.wind.speed}
		`
	);
};

export { printError, printSuccess, printHelp, printWeather };