import { Router } from "express";
import { injectable, inject } from "inversify";
import { TYPES } from "../types";
import { TrackerController } from "./tracker.controller";

@injectable()
export class TrackerRoutes {
  private router: Router;

  constructor(@inject(TYPES.TrackerController) private trackerController: TrackerController) {
    this.router = Router();
    this.setupRoutes();
  }

  private setupRoutes() {
    this.router.get("/:fromId/:toId", this.trackerController.trackPairPrice);
    this.router.post("/", this.trackerController.createTracker);
    this.router.put("/:id", this.trackerController.updateTracker);
    this.router.delete("/:id", this.trackerController.deleteTracker);
  }

  public getRouter(): Router {
    return this.router;
  }
}
