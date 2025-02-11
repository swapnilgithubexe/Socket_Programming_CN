import dotenv from 'dotenv';
dotenv.config();
import { connectToDatabase } from "./db.config.js";
import { app } from './server.js';

app.listen(3000, () => {
    // console.log(PROCESS.env.MONGODB);
    console.log('Server is running on port 3000');
    connectToDatabase();
});
