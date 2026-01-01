import { readConfig } from "./config";
import { createFeedFollow } from "./lib/db/queries/createfeedfollow";
import { getFeedByUrl } from "./lib/db/queries/getfeedbyurl";
import { getUser } from "./lib/db/queries/getuser";
import { User } from "./lib/db/schema";

export async function addFollowHandler(cmdName: string, currentUser: User, ...args: string[]){
    try{
        const url = args[0]
        console.log(`Current url is ${url}`);
        const feed = await getFeedByUrl(url);
        const configObject = readConfig();
        const currentUserName = configObject.currentUserName;
        console.log("About to give feed id");
        console.log(`Feed ID: ${feed.id}`);
        console.log("About to give user id");
        console.log(`User ID: ${currentUser.id}`)
        const followResult = await createFeedFollow(currentUser.id, feed.id);
        console.log("Added feed.")
        console.log("-----------")
        console.log(`Name of Feed: ${followResult.feed_name}`)
        console.log(`Name of User: ${followResult.feed_user_name}`)
        console.log("-----------")
    }catch(error){
        throw error;
    }
}