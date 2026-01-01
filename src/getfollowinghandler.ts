import { readConfig } from "./config";
import { createFeedFollow } from "./lib/db/queries/createfeedfollow";
import { getFeedByUrl } from "./lib/db/queries/getfeedbyurl";
import { getFeedFollowsForUser } from "./lib/db/queries/getfeedfollowsforuser";
import { getUser } from "./lib/db/queries/getuser";
import { User } from "./lib/db/schema";

export async function getFollowingHandler(cmdName: string, currentUser: User, ...args: string[]){
    try{
        const currentUserName = currentUser.name;
        const followResults = await getFeedFollowsForUser(currentUserName);
        console.log("-------------");
        for (const feedFollow of followResults){
            console.log(`Name of Feed: ${feedFollow.feed_name}`);
        }
        console.log("-------------");
    }catch(error){
        throw error;
    }
}