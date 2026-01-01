import { CommandHandler } from "./commandhandler"
import { createFeed } from "./lib/db/queries/createfeed";
import { getUser } from "./lib/db/queries/getuser";
import { readConfig } from "./config";
import { setUser } from "./config";
import { getUserId } from "./lib/db/queries/getuserid";
import { fetchFeed } from "./fetchfeed";
import { Feed, User } from "./lib/db/schema";
import { createFeedFollow } from "./lib/db/queries/createfeedfollow";

export async function addFeedHandler(cmdName: string, currentUser: User, ...args: string[]): Promise<void>{
    if(args.length < 2){
        throw new Error("You need a name and URL!")
    }
    const currentUserId = currentUser.id;
    const feedName = args[0];
    const feedUrl = args[1];
    const feedObject =  await fetchFeed(feedUrl);
    const result = await createFeed(feedObject, feedName, currentUserId, feedUrl);
    printFeed(result, currentUser);
    const feedFollowQuery = await createFeedFollow(currentUser.id, result.id);
}

function printFeed(feed: Feed, user: User){
    console.log(feed);
    console.log(user);
}