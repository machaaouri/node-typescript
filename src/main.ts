import { app } from './app'
import * as http from 'http'
import { MongoHelper } from './mongodb-helper';

const PORT = 8080;
const server = http.createServer(app);

server.listen(PORT);
server.on('listening', async () => {
    console.log(`Server listening on ${PORT}`);
    try {
        await MongoHelper.connect("mongodb://localhost:27017");
        console.info("Connected to Mongo.");
    }
    catch(err) {
        console.error(err);
    }
})