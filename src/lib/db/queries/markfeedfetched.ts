import { db } from "..";
import { eq } from "drizzle-orm";
import { users, feeds } from "../schema";
import { PgUUID, uuid } from "drizzle-orm/pg-core";
import { firstOrUndefined } from "./getnextfeedtofetch";

export async function markFeedFetched(feedId: string){
    const timestamp = new Date();
    const result = await db.update(feeds)
        .set({lastFetchedAt: timestamp, updatedAt: timestamp})
        .where(eq(feeds.id, feedId)).returning();
    return firstOrUndefined(result);
}