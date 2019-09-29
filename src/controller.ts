import { TodoModel, ITodo } from "./todo";
import { Controller, Route, Get, BodyProp, Post, Put, Delete } from "tsoa";

@Route('/todo')
export class TodoController extends Controller {

    @Get()
    public async getall() : Promise<ITodo[]> {
        try {
            let items: any[] = await TodoModel.find({});
            items = items.map(item => { return {id: item._id, description: item.description}});
            return items;
        } catch(err) {
            this.setStatus(500);
            return err;
        }
    }
    
    @Post()
    public async create(@BodyProp() description: string) : Promise<void> {
        let item = new TodoModel({description: description});
        await item.save();
    }

    @Put('/{id}')
    public async update(id: string, @BodyProp() description: string) : Promise<void> {
        await TodoModel.findByIdAndUpdate(id, {description: description});
    }
    
    @Delete('/{id}')
    public async remove(id: string) : Promise<void> {
        await TodoModel.findByIdAndRemove(id);
    }
}

