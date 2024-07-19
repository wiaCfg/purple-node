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
Object.defineProperty(exports, "__esModule", { value: true });
exports.TrackerRoutes = void 0;
var express_1 = require("express");
var inversify_1 = require("inversify");
var types_1 = require("../types");
var tracker_controller_1 = require("./tracker.controller");
var TrackerRoutes = /** @class */ (function () {
    function TrackerRoutes(trackerController) {
        this.trackerController = trackerController;
        this.router = (0, express_1.Router)();
        this.setupRoutes();
    }
    TrackerRoutes.prototype.setupRoutes = function () {
        this.router.get("/:id", this.trackerController.getTrackerById);
        this.router.post("/", this.trackerController.createTracker);
        this.router.put("/:id", this.trackerController.updateTracker);
        this.router.delete("/:id", this.trackerController.deleteTracker);
    };
    TrackerRoutes.prototype.getRouter = function () {
        return this.router;
    };
    TrackerRoutes = __decorate([
        (0, inversify_1.injectable)(),
        __param(0, (0, inversify_1.inject)(types_1.TYPES.TrackerController)),
        __metadata("design:paramtypes", [tracker_controller_1.TrackerController])
    ], TrackerRoutes);
    return TrackerRoutes;
}());
exports.TrackerRoutes = TrackerRoutes;
