"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Application = void 0;
var inversify_1 = require("inversify");
var express_1 = __importDefault(require("express"));
var body_parser_1 = require("body-parser");
var types_1 = require("./types");
var inversify_config_1 = require("./inversify.config");
require("reflect-metadata");
var Application = /** @class */ (function () {
    //private router: Router;
    function Application(logger) {
        this.logger = logger;
        this.app = (0, express_1.default)();
        this.port = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;
        //this.router = Router();
    }
    Application.prototype.useMiddleware = function () {
        this.app.use((0, body_parser_1.json)());
    };
    Application.prototype.useRoutes = function () {
        this.logger.log("Setting up routes");
        var trackerRoutes = inversify_config_1.myContainer.get(types_1.TYPES.TrackerRoutes);
        this.app.use("/tracker", trackerRoutes.getRouter());
    };
    Application.prototype.init = function () {
        var _this = this;
        this.useMiddleware();
        this.useRoutes();
        this.server = this.app.listen(this.port, function () {
            _this.logger.log("Server listening on port ".concat(_this.port));
        });
        return new Promise(function (resolve) {
            _this.server.on("listening", resolve);
        });
    };
    Application = __decorate([
        (0, inversify_1.injectable)(),
        __param(0, (0, inversify_1.inject)(types_1.TYPES.ILogger)),
        __metadata("design:paramtypes", [Object])
    ], Application);
    return Application;
}());
exports.Application = Application;
