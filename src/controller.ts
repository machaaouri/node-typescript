import {Request, Response, NextFunction, Router } from "express"
import { MongoHelper } from "./mongodb-helper";
import * as mongodb from 'mongodb';

export const Routes = Router();

const getCollection = () => {
    return MongoHelper.client.db('todo').collection('todos');
}

Routes.get('/todo', (req: Request, resp: Response, next: NextFunction) => {
    const collection = getCollection();
    collection.find({}).toArray((err, items) => {
        if(err) {
            resp.status(500);
            console.error('Caught error', err);
            resp.end();
        } else {
            items = items.map(item => { return {id: item._id, description: item.description}});
            resp.json(items);
        }
    })
})

Routes.post('/todo', (req: Request, resp: Response, next: NextFunction) => {
    const description = req.body['description']
    const collection = getCollection();
    collection.insert({description: description});
    resp.end();
})

Routes.put('/todo/:id', (req: Request, resp: Response, next: NextFunction) => {
    const description = req.body['description'];
    const id = req.params['id'];
    const collection = getCollection();
    collection.findOneAndUpdate({"_id": new mongodb.ObjectID(id)}, {$set :{description: description}});
    resp.end();
})

Routes.delete('/todo/:id', (req: Request, resp: Response, next: NextFunction) => {
    const id = req.params['id'];
    const collection = getCollection();
    collection.remove({"_id": new mongodb.ObjectID(id)});
    resp.end();
})