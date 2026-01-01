import { UUID } from "crypto";
import { db } from "..";
import { eq } from "drizzle-orm";
import { feed_follows, feeds, users } from "../schema";
import { RSSFeed } from "src/fetchfeed";
import { FeedFollow } from "../schema";

export async function createFeedFollow(user_id: string, feed_id: string) {
    const [newFeedFollow] = await db.insert(feed_follows).values({
         user_id: user_id,
         feed_id: feed_id
        }).returning();
    const [newFeedQuery] = await db.select({
        follow_id: feed_follows.id,
        follow_created_at: feed_follows.createdAt,
        follow_updated_at: feed_follows.updatedAt,
        feed_name: feeds.name,
        feed_user_name: users.name
    }).from(feed_follows).innerJoin(
        feeds, eq(feed_follows.feed_id, feeds.id)).innerJoin(
            users, eq(feed_follows.user_id, users.id)).where(eq(feed_follows.id, newFeedFollow.id));
    return newFeedQuery;
}