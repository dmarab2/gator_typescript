import { UUID } from "crypto";
import { db } from "..";
import { and, eq } from "drizzle-orm";
import { feed_follows, feeds, users } from "../schema";
import { FeedFollow } from "../schema";

export async function deleteFeedFollow(user_id: string, feed_id: string){
    const result = await db.delete(feed_follows).where(and(eq(feed_follows.user_id, user_id), eq(feed_follows.feed_id, feed_id)));
    return result;
}