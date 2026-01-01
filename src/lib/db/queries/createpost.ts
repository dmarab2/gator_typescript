import { UUID } from "crypto";
import { db } from "..";
import { eq } from "drizzle-orm";
import {posts, feed_follows, feeds, users } from "../schema";
import { RSSFeed } from "src/fetchfeed";

export async function createPost(name: string, url: string, description: string, published_at: Date, feed_id: string) {
    const [newPost] = await db.insert(posts).values({
        name: name,
        url: url,
        description: description,
        publishedAt: published_at,
        feed_id: feed_id
    }).returning();
    return newPost;
}