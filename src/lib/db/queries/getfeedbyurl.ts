import { db } from "..";
import { eq } from "drizzle-orm";
import { users, feeds } from "../schema";

export async function getFeedByUrl(url: string){
    const [results] = await db.select().from(feeds).where(eq(feeds.url, url));
    console.log(results)
    return results;
}