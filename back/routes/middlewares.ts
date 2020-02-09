import {Request, Response} from "express";
import * as cors from 'cors';

export class Middlewares {
    originsWhitelist: string[];
    corsOptions: object;

    constructor() {

        this.originsWhitelist = [
            'http://localhost:4200',
            'http://127.0.0.1:4200',
            'http://test.solacein.com',
            'http://testmusic.solacein.com',
            'http://192.168.0.67:4200'
        ];
        this.corsOptions = {
            origin: (origin: any, callback: any) => {
                let isWhitelisted = this.originsWhitelist.indexOf(origin) !== -1;
                callback(null, isWhitelisted);
            },
            credentials: true
        }
    }

    public declareMiddlewares(app: any): void {
        // app.use(cors(this.corsOptions)); // allow white list hosts

        app.use((req: Request, res: Response, next: any) => {
            next();
            console.dir(`${req.method} ${req.url} | ${new Date().toISOString()} | ${res.statusCode}`);
        });
    }

}
