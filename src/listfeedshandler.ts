import { CommandHandler } from "./commandhandler";
import { listFeeds } from "./lib/db/queries/listfeeds";
import { users } from "./lib/db/schema";


export async function listFeedsHandler(cmdName: string, ...args: string[]){
    const feedArray = await listFeeds();
    for (const feed of feedArray){
        console.log("-----------------");
        console.log(`Name of Feed: ${feed.feedName}`);
        console.log(`URL of Feed: ${feed.feedUrl}`);
        console.log(`Name of User: ${feed.userName}`);
        console.log("-----------------");
    }
}