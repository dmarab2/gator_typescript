import { UUID } from "crypto";
import { db } from "..";
import { eq } from "drizzle-orm";
import { feed_follows, feeds, users } from "../schema";
import { RSSFeed } from "src/fetchfeed";
import { FeedFollow } from "../schema";
import { getUserId } from "./getuserid";

export async function getFeedFollowsForUser(user: string){
    const user_id_query = await getUserId(user);
    const user_id = user_id_query[0].field1;
    const followResults = await db.select({
        follow_id: feed_follows.id,
        feed_name: feeds.name,
        follow_user_name: users.name
    }).from(feed_follows).innerJoin(
        feeds, eq(feed_follows.feed_id, feeds.id)).innerJoin(
            users, eq(feed_follows.user_id, users.id)).where(eq(feed_follows.user_id, user_id));
    return followResults;
}