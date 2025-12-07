import { db } from "..";
import { eq } from "drizzle-orm";
import { users } from "../schema";

export async function getUser(name: string){
    return await db.select().from(users).where(eq(users.name, name));
}