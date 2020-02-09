import {Get, HttpCode, Render, HttpError, JsonController, OnUndefined, Param, Post, Req, Res, ContentType, UseBefore} from "routing-controllers";
import * as path from "path";
import * as fs from "fs";
import {Request, Response} from "express";
import {ObjectId} from "bson";
// @ts-ignore
import * as ms from 'mediaserver';

@JsonController()
@UseBefore(function(req: Request, res: Response, next: any) {
    try {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    } catch (e) {
    }
    next();
})

export class ACJController {
    // @HttpCode(200)
    // @OnUndefined(404)
    @Get("/")
    // @Render("index.html")
    @ContentType("application/json")
    Api(@Res() response:any) {
        return fs.readFileSync((path.join(__dirname, "..", "..",  "atlassian-connect.json")));
    }
}


export class MainPageController {
    // @HttpCode(200)
    // @OnUndefined(404)
    @Get("/page")
    @Render("./../../../my-app/dist/my-app/index.html")
    // @Render("index.html")
    Api(@Res() response:any) {}
}

//export class MusicController {
//     @HttpCode(200)
//     @OnUndefined(404)
//     @Get("/music/list")
//     async getListMusic() {
//         let musicFiles: Music[] = [];
//
//         let recordsMusicFiles = await MongoConnections.musicListCollection.find({}, {
//             projection: {
//                 pathToFile: 0
//             }
//         }).toArray();
//
//         recordsMusicFiles.forEach((record: any) => {
//             let infoFile = Object.assign({}, record);
//             delete infoFile._id;
//             infoFile.id = record._id.toString();
//             musicFiles = [...musicFiles, infoFile];
//         });
//
//         return  musicFiles;
//     }
//
//     @Post("/music/list")
//     uploadMusic() {
//         return {
//             error: {},
//             message: "Success!"
//         };
//     }
//
//
//     @Get('/music-play/:id')
//     @OnUndefined(404)
//     @ContentType('application/octet-stream')
//     async getStreamMusic(@Req() req: Request, @Res() res: Response, @Param("id") id: string) {
//         console.dir(id);
//         let musicFile = await MongoConnections.musicListCollection.findOne({_id: new ObjectId(id)}, {
//             projection: {
//                 pathToFile: 1,
//                 _id: 0
//             }
//         });
//
//         if (!musicFile) {
//             throw new HttpError(404, "File not found!");
//         }
//         ms.pipe(req, res, musicFile.pathToFile);
//     }
// }
