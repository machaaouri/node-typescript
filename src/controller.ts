import {Request, Response, NextFunction, Router } from "express"

export const Routes = Router();

Routes.get('/todo', (req: Request, resp: Response, next: NextFunction) => {
    resp.json({id:1, description: 'Add item'});
})


Routes.post('/todo', (req: Request, resp: Response, next: NextFunction) => {
    console.info(req.body);
    resp.end();
})

Routes.put('/todo/:id', (req: Request, resp: Response, next: NextFunction) => {
    console.info(req.body);
    console.info(req.params.id);
    resp.end();
})

Routes.delete('/todo/:id', (req: Request, resp: Response, next: NextFunction) => {
    console.info(req.params.id);
    resp.end();
})