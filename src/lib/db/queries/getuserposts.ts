import { UUID } from "crypto";
import { db } from "..";
import { eq, sql } from "drizzle-orm";
import { feed_follows, feeds, posts, users } from "../schema";
import { RSSFeed } from "src/fetchfeed";
import { FeedFollow } from "../schema";
import { getUserId } from "./getuserid";

export async function getUserPosts(user: string, limit: number){
    const user_id_query = await getUserId(user);
    const user_id = user_id_query[0].field1;
    const postResults = await db.select().from(posts).innerJoin(
        feeds, eq(posts.feed_id, feeds.id)).innerJoin(
            users, eq(feeds.user_id, users.id)).where(eq(users.id, user_id))
    .orderBy(sql`${posts.publishedAt} desc`).limit(limit)
    return postResults;
}