import { db } from "..";
import { eq, sql } from "drizzle-orm";
import { users, feeds } from "../schema";
import { PgUUID, uuid } from "drizzle-orm/pg-core";

export async function getNextFeedToFetch() {
  const result = await db
    .select()
    .from(feeds)
    .orderBy(sql`${feeds.lastFetchedAt} desc nulls first`)
    .limit(1);
  return firstOrUndefined(result);
}

export function firstOrUndefined<T>(items: T[]) {
  if (items.length === 0) {
    return;
  }
  return items[0];
}