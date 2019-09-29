import {Request, Response, NextFunction, Router } from "express"
import { TodoModel } from "./todo";
import * as mongodb from "mongodb"

export const Routes = Router();

Routes.get('/todo', async (req: Request, resp: Response, next: NextFunction) => {
    try {
        let items: any[] = await TodoModel.find({});
        items = items.map(item => { return {id: item._id, description: item.description}});
        resp.json(items);
    } catch(err) {
        resp.status(500);
        console.error('Caught error', err);
        resp.end();
    }
})

Routes.post('/todo', async (req: Request, resp: Response, next: NextFunction) => {
    const description = req.body['description'];
    let item = new TodoModel({description: description});
    await item.save();
    resp.end();
})

Routes.put('/todo/:id', async (req: Request, resp: Response, next: NextFunction) => {
    const description = req.body['description'];
    const id = req.params['id'];
    await TodoModel.findByIdAndUpdate(id, {description: description});
    resp.end();
})

Routes.delete('/todo/:id', async (req: Request, resp: Response, next: NextFunction) => {
    const id = req.params['id'];
    await TodoModel.findByIdAndRemove(id);
    resp.end();
})