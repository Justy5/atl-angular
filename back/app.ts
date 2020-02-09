import * as express from 'express';
import * as bodyParser from 'body-parser';
import {Middlewares} from "./routes/middlewares";
import {MongoClient} from 'mongodb';
import * as fs from 'fs';
import "reflect-metadata"; // this shim is required
import {createExpressServer} from "routing-controllers";
import * as cons from 'consolidate';
import * as path from 'path';

class App {
    public readonly app: express.Application;
    private middlewares: Middlewares= new Middlewares();

    constructor() {
        this.initMongoDBConnections();
        this.app = createExpressServer({
            routePrefix: '/api',
            controllers: [__dirname + '/routes/Controllers/*.ts']
        });
        this.app.use(express.static(path.join(__dirname, "..", "my-app", "dist", "my-app")));
        this.middlewares.declareMiddlewares(this.app);
        this.app.engine('html', cons.swig);
        this.app.set('view engine', 'html');
        this.app.set('views', path.join(__dirname, "..", "my-app", "dist", "my-app"));
        // this.config();
    }

    private config(): void {
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({extended: false}));
    }

    private async initMongoDBConnections() {
        let runConfig = this.readRunConfig();
        let musicConnection = await MongoClient.connect(runConfig.mongodb.connectionString, {  useUnifiedTopology: true, useNewUrlParser: true });
        // MongoConnections.musicDatabase = await musicConnection.db(runConfig.mongodb.musicDatabase);
        // MongoConnections.musicListCollection = runConfig.mongodb.musicListCollection;
    }

    private readRunConfig(): any {
        let file = fs.readFileSync('./run-config.cfg', 'utf-8');
        return JSON.parse(file);
    }
}

export default new App().app;

//document.querySelectorAll('.style-scope.ytd-thumbnail-overlay-resume-playback-renderer').forEach(e=> { e.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.setAttribute('style', 'display: none') })
