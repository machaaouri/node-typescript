import {Request, Response, NextFunction} from "express"

export const requestLoggerMiddleware = (req: Request, resp: Response, next: NextFunction) => {
    console.info(`${req.method} ${req.originalUrl}`);
    const start = new Date().getTime();
    resp.on('finish', () => {
        const elapsedTime = new Date().getTime() - start;
        console.info(`${req.method} ${req.originalUrl} ${resp.statusCode} ${elapsedTime}ms`)
    });

    next();
}