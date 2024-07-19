import { injectable, inject } from "inversify";
import { Request, Response } from "express";
import { TYPES } from "./../types";
import { ILogger } from "./../logger/logger.interface";
import { TrackerService } from "./tracker.service";

@injectable()
export class TrackerController {
  constructor(
    @inject(TYPES.ILogger) private logger: ILogger,
    @inject(TYPES.TrackerService) private trackerService: TrackerService
  ) {
    this.logger.log('Logger injected');
  }

  // GET /tracker/:id
  public async trackPairPrice(req: Request, res: Response) {
    console.log('Tracker controller')
    try {
      const { fromId, toId } = req.params;
      console.log(fromId, toId);
      console.log('this.trackerService', this.trackerService);

      //const rate = await this.trackerService.getPairPriceByIds({ fromId, toId });
      //this.logger.log(rate);
      res.status(200).json({ status: 'success' });
    } catch (error) {
      console.log('error Tracker controller');
      //this.logger.error(error);
      res.status(500).json({ message: "Failed to retrieve tracker" });
    }
  }

  // POST /tracker
  public async createTracker(req: Request, res: Response) {
    try {
      const trackerData = req.body;
      const newTracker = await this.trackerService.createTracker(trackerData);
      res.status(201).json(newTracker);
    } catch (error) {
      ///this.logger.error(error);
      console.log('error Tracker controller');
      res.status(500).json({ message: "Failed to create tracker" });
    }
  }

  // PUT /tracker/:id
  public async updateTracker(req: Request, res: Response) {
    try {
      const trackerId = req.params.id;
      const updatedTrackerData = req.body;
      const updatedTracker = await this.trackerService.updateTracker(
        trackerId,
        updatedTrackerData
      );
      res.status(200).json(updatedTracker);
    } catch (error) {
      console.log('error Tracker controller');
      //this.logger.error(error);
      res.status(500).json({ message: "Failed to update tracker" });
    }
  }

  // DELETE /tracker/:id
  public async deleteTracker(req: Request, res: Response) {
    try {
      const trackerId = req.params.id;
      await this.trackerService.deleteTracker(trackerId);
      res.status(204).send();
    } catch (error) {
      console.log('error Tracker controller');
      //this.logger.error(error);
      res.status(500).json({ message: "Failed to delete tracker" });
    }
  }
}
