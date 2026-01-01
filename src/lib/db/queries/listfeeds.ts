import { db } from "..";
import { eq } from "drizzle-orm";
import { users, feeds } from "../schema";

export async function listFeeds(){
    const results = await db.select({
        feedName: feeds.name,
        feedUrl: feeds.url,
        userName: users.name
    }).from(feeds).innerJoin(users, eq(feeds.user_id, users.id));
    return results;
}