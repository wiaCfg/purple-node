#!/usr/bin/env node
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
Object.defineProperty(exports, "__esModule", { value: true });
const args_1 = require("./helpers/args");
const api_service_1 = require("./services/api.service");
const log_service_1 = require("./services/log.service");
const storage_service_1 = require("./services/storage.service");
const saveToken = (token) => __awaiter(void 0, void 0, void 0, function* () {
    if (!token.length) {
        (0, log_service_1.printError)('Не передан token');
        return;
    }
    try {
        yield (0, storage_service_1.saveKeyValue)(storage_service_1.TOKEN_DICTIONARY.token, token);
        (0, log_service_1.printSuccess)('Токен сохранён');
    }
    catch (e) {
        (0, log_service_1.printError)(e.message);
    }
});
const saveCity = (city) => __awaiter(void 0, void 0, void 0, function* () {
    if (!city.length) {
        (0, log_service_1.printError)('Не передан город');
        return;
    }
    try {
        yield (0, storage_service_1.saveKeyValue)(storage_service_1.TOKEN_DICTIONARY.city, city);
        (0, log_service_1.printSuccess)('Город сохранён');
    }
    catch (e) {
        (0, log_service_1.printError)(e.message);
    }
});
const getForcast = () => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    try {
        const city = (_a = process.env.CITY) !== null && _a !== void 0 ? _a : yield (0, storage_service_1.getKeyValue)(storage_service_1.TOKEN_DICTIONARY.city);
        if (city) {
            const weather = yield (0, api_service_1.getWeather)(city);
            const icon = (0, api_service_1.getIcon)(weather.weather[0].icon);
            (0, log_service_1.printWeather)(weather, icon);
        }
        else {
            throw new Error('Ошибка, город задан не верно!');
        }
    }
    catch (e) {
        if (((_b = e === null || e === void 0 ? void 0 : e.response) === null || _b === void 0 ? void 0 : _b.status) === 404) {
            (0, log_service_1.printError)('Неверно указан город');
        }
        else if (((_c = e === null || e === void 0 ? void 0 : e.response) === null || _c === void 0 ? void 0 : _c.status) === 401) {
            (0, log_service_1.printError)('Неверно указан токен');
        }
        else {
            (0, log_service_1.printError)(e.message);
        }
    }
});
const initCLI = () => {
    const args = (0, args_1.getArgs)(process.argv);
    if (args.h) {
        return (0, log_service_1.printHelp)();
    }
    if (args.s) {
        return saveCity(args.s);
    }
    if (args.t) {
        return saveToken(args.t);
    }
    return getForcast();
};
initCLI();
