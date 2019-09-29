import { app } from './app'
import * as http from 'http'
import mongoose  from 'mongoose';

const PORT = 8080;
const MONGO_URI = 'mongodb://localhost:27017/todo'
const server = http.createServer(app);

server.listen(PORT);
server.on('listening', async () => {
    console.log(`Server listening on ${PORT}`);
    mongoose.connect(MONGO_URI, {useNewUrlParser: true});
    mongoose.connection.on('connected',() => {
        console.info("Connected to Mongo.");
    })
    mongoose.connection.on('error',(err: any) => {
        console.error(err);
    })
})