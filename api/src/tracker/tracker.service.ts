import { injectable, inject } from "inversify";
import { TYPES } from "../types";
import { ILogger } from "./../logger/logger.interface";
import { ITracker } from "./tracker.interface";

@injectable()
export class TrackerService {
  constructor(@inject(TYPES.ILogger) private logger: ILogger) {}

  public async getPairPriceByIds({fromId, toId}: {fromId: string, toId: string}): Promise<ITracker> {
    console.log('first');
    console.log(fromId, toId);
    return { rate: 432.5 };
  }

  public async createTracker(trackerData: any): Promise<ITracker> {

    return { id: "new-tracker-id", ...trackerData };
  }

  public async updateTracker(id: string, updatedData: any): Promise<ITracker> {
    // ... your logic to update a tracker
    // ...
    return { id, ...updatedData }; // Replace with actual data
  }

  public async deleteTracker(id: string): Promise<void> {
    // ... your logic to delete a tracker
    // ...
  }
}
