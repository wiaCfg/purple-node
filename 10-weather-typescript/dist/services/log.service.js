"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.printWeather = exports.printHelp = exports.printSuccess = exports.printError = void 0;
const chalk_1 = __importDefault(require("chalk"));
const dedent_js_1 = __importDefault(require("dedent-js"));
const printError = (error) => {
    console.log(chalk_1.default.bgRed(' ERROR ') + ' ' + error);
};
exports.printError = printError;
const printSuccess = (message) => {
    console.log(chalk_1.default.bgGreen(' SUCCESS ') + ' ' + message);
};
exports.printSuccess = printSuccess;
const printHelp = () => {
    console.log((0, dedent_js_1.default) `${chalk_1.default.bgCyan(' HELP ')}
		Без параметров - вывод погоды
		-s [CITY] для установки города
		-h для вывода помощи
		-t [API_KEY] для сохранения токена
		`);
};
exports.printHelp = printHelp;
const printWeather = (res, icon) => {
    console.log((0, dedent_js_1.default) `${chalk_1.default.bgYellow(' WEATHER ')} Погода в городе ${res.name}
		${icon}  ${res.weather[0].description}
		Температура: ${res.main.temp} (ощущается как ${res.main.feels_like})
		Влажность: ${res.main.humidity}%
		Скорость ветра: ${res.wind.speed}
		`);
};
exports.printWeather = printWeather;
