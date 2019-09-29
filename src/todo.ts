import mongoose  from 'mongoose';
export interface ITodo {
    id: string,
    description: string
}
const TodoSchema = new mongoose.Schema({
    description: String
});

export const TodoModel = mongoose.model('todo', TodoSchema);