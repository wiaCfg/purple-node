"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getIcon = exports.getWeather = void 0;
const axios_1 = __importDefault(require("axios"));
const storage_service_1 = require("./storage.service");
const getIcon = (icon) => {
    switch (icon.slice(0, -1)) {
        case '01':
            return '☀️';
        case '02':
            return '🌤️';
        case '03':
            return '☁️';
        case '04':
            return '☁️';
        case '09':
            return '🌧️';
        case '10':
            return '🌦️';
        case '11':
            return '🌩️';
        case '13':
            return '❄️';
        case '50':
            return '🌫️';
        default:
            return 'No icon';
    }
};
exports.getIcon = getIcon;
const getWeather = (city) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const token = (_a = process.env.TOKEN) !== null && _a !== void 0 ? _a : yield (0, storage_service_1.getKeyValue)(storage_service_1.TOKEN_DICTIONARY.token);
    if (!token) {
        throw new Error('Не задан ключ API, задайте его через команду -t [API_KEY]');
    }
    const { data } = yield axios_1.default.get('https://api.openweathermap.org/data/2.5/weather', {
        params: {
            q: city,
            appid: token,
            lang: 'ru',
            units: 'metric'
        }
    });
    return data;
});
exports.getWeather = getWeather;
