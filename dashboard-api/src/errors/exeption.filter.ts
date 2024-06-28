import { Request, Response, NextFunction } from 'express';
import { LoggerService } from '../logger/logger.service';
import { IExaptionFilter } from './exeption.filter.interface';
import { HTTPError } from './http.error';
import { inject, injectable } from 'inversify';
import { TYPES } from '../types';
import 'reflect-metadata';

@injectable()
export class ExeptionFilter implements IExaptionFilter {
	constructor(@inject(TYPES.ILogger) private logger: LoggerService) {}

	catch(err: Error | HTTPError, req: Request, res: Response, next: NextFunction): void {
		if (err instanceof HTTPError) {
			this.logger.error(`${err.context} Ошибка ${err.statusCode} : ${err.message}`);
			res.status(500).send({ err: err.message });
		} else {
			this.logger.error(`${err.message}`);
			res.status(500).send({ err: err.message });
		}
	}
}
