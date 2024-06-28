import { Request, Response, NextFunction } from 'express';

export interface IExaptionFilter {
	catch: (err: Error, req: Request, res: Response, next: NextFunction) => void;
}
