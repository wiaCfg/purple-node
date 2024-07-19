import { Container } from "inversify";
import { TYPES } from "./types";
import { Application } from "./app";
import { TrackerController } from "./tracker/tracker.controller";
import { TrackerService } from "./tracker/tracker.service";
import { ILogger } from "./logger/logger.interface";
import LoggerService  from "./logger/logger.service";
import { TrackerRoutes } from "./tracker/tracker.routes";

const myContainer = new Container();

myContainer.bind<Application>(TYPES.Application).to(Application).inSingletonScope();
myContainer.bind<TrackerController>(TYPES.TrackerController).to(TrackerController).inSingletonScope();
myContainer.bind<TrackerService>(TYPES.TrackerService).to(TrackerService).inSingletonScope();
myContainer.bind<TrackerRoutes>(TYPES.TrackerRoutes).to(TrackerRoutes).inSingletonScope();
myContainer.bind<ILogger>(TYPES.ILogger).to(LoggerService).inSingletonScope();

export { myContainer };
