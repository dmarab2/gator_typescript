import { userInfo } from "os";
import { readConfig } from "./config";
import { createFeedFollow } from "./lib/db/queries/createfeedfollow";
import { getFeedByUrl } from "./lib/db/queries/getfeedbyurl";
import { getUser } from "./lib/db/queries/getuser";
import { deleteFeedFollow } from "./lib/db/queries/deletefeedfollow";
import { User } from "./lib/db/schema";

export async function deleteFollowHandler(cmdName: string, currentUser: User, ...args: string[]){
    try{
        const feedUrl = args[0];
        const feedObj = await getFeedByUrl(feedUrl);
        const feedId = feedObj.id;
        const userId = currentUser.id;
        const result = await deleteFeedFollow(userId, feedId);
    }catch(Error){
        throw Error;
    }
}
