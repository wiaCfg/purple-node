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
exports.TOKEN_DICTIONARY = exports.getKeyValue = exports.saveKeyValue = void 0;
const os_1 = require("os");
const path_1 = require("path");
const fs_1 = require("fs");
const filePath = (0, path_1.join)((0, os_1.homedir)(), 'weather-data.json');
const TOKEN_DICTIONARY = {
    token: 'token',
    city: 'city'
};
exports.TOKEN_DICTIONARY = TOKEN_DICTIONARY;
const saveKeyValue = (key, value) => __awaiter(void 0, void 0, void 0, function* () {
    let data = {};
    if (yield isExist(filePath)) {
        const file = yield fs_1.promises.readFile(filePath, 'utf-8');
        data = JSON.parse(file);
    }
    data[key] = value;
    yield fs_1.promises.writeFile(filePath, JSON.stringify(data));
});
exports.saveKeyValue = saveKeyValue;
const getKeyValue = (key) => __awaiter(void 0, void 0, void 0, function* () {
    if (yield isExist(filePath)) {
        const file = yield fs_1.promises.readFile(filePath, 'utf-8');
        const data = JSON.parse(file);
        return data[key];
    }
    return undefined;
});
exports.getKeyValue = getKeyValue;
const isExist = (path) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield fs_1.promises.stat(path);
        return true;
    }
    catch (e) {
        return false;
    }
});
