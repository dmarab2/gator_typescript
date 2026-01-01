import { readConfig } from "./config";
import { createFeedFollow } from "./lib/db/queries/createfeedfollow";
import { getFeedByUrl } from "./lib/db/queries/getfeedbyurl";
import { getFeedFollowsForUser } from "./lib/db/queries/getfeedfollowsforuser";
import { getUser } from "./lib/db/queries/getuser";
import { getUserPosts } from "./lib/db/queries/getuserposts";
import { User } from "./lib/db/schema";

export async function getFollowingHandler(cmdName: string, currentUser: User, ...args: string[]){
    let limit = 0;
    if(args.length < 1){
        limit = 2;
    }else{
        limit = +args[0];
    }
    try{
        const currentUserName = currentUser.name;
        const postResults = await getUserPosts(currentUserName, limit);
        console.log("-------------");
        for (const post of postResults){
            console.log(`Name of Post: ${post.posts.name}`);
        }
        console.log("-------------");
    }catch(error){
        throw error;
    }
}