import { UUID } from "crypto";
import { db } from "..";
import { feeds } from "../schema";
import { RSSFeed } from "src/fetchfeed";

export async function createFeed(feed: RSSFeed, feed_name: string, user_id: string, feed_url: string) {
    const [result] = await db.insert(feeds).values({
         name: feed_name,
         url: feed_url,
         user_id: user_id
        }).returning();
    return result;
}