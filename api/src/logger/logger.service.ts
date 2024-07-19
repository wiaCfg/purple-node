import { injectable } from "inversify";
import { ILogger } from "./logger.interface";
import { Logger, ILogObj } from "tslog";

@injectable()
class LoggerService implements ILogger {
    public logger: Logger<ILogObj>;

    constructor() {
        this.logger = new Logger({})
    }

    log(...args: unknown[]): void {
        this.logger.info(...args)
    }

    warn(...args: unknown[]): void {
        this.logger.warn(...args)
    }

    error(...args: unknown[]): void {
        this.logger.error(...args)
    }
}

export default LoggerService;