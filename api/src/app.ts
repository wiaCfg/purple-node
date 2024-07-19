import { json } from "body-parser";
import express, { Express } from "express";
import { Server } from "http";
import { inject, injectable } from "inversify";
import 'reflect-metadata';
import { myContainer } from "./inversify.config";
import { ILogger } from "./logger/logger.interface";
import { TrackerRoutes } from "./tracker/tracker.routes";
import { TYPES } from "./types";


@injectable()
export class Application {
  private server: Server;
  private app: Express;
  private port: number;
  //private router: Router;

  constructor(@inject(TYPES.ILogger) private logger: ILogger) {
    this.app = express();
    this.port = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;
    //this.router = Router();
  }

  public useMiddleware(): void {
    this.app.use(json());
  }

  public useRoutes(): void {
    this.logger.log("Setting up routes");
    const trackerRoutes = myContainer.get<TrackerRoutes>(TYPES.TrackerRoutes);
    this.app.use("/tracker", trackerRoutes.getRouter());
  }

  public init(): Promise<void> {
    this.useMiddleware();
    this.useRoutes();
    this.server = this.app.listen(this.port, () => {
      this.logger.log(`Server listening on port ${this.port}`);
    });
    return new Promise((resolve) => {
      this.server.on("listening", resolve);
    });
  }
}
