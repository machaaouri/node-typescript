import mongoose  from 'mongoose';

const TodoSchema = new mongoose.Schema({
    description: String
});

export const TodoModel = mongoose.model('todo', TodoSchema);