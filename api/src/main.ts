import { Application } from "./app";
import { myContainer } from "./inversify.config";
import { TYPES } from "./types";
import 'reflect-metadata';

const bootstrap = async () => {
    const app = myContainer.get<Application>(TYPES.Application);
    await app.init();
}

bootstrap();