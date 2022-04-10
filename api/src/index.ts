import 'dotenv/config'
import http from 'http';
import express from 'express';
import Router from './config/Router';
import { conection } from './db/conection';

const APP: express.Express = express();

new Router(APP);

(async () => {
    try {
        await conection.sync();
        console.log(`Database conected`);
        
        http.createServer(APP).listen(process.env.PORT, () => {
            console.log(`Server is Running on port ${process.env.PORT}`);
        });
    } catch (error) {
        console.log(error);
    }
})();