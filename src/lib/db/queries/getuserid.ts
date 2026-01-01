import { db } from "..";
import { eq } from "drizzle-orm";
import { users } from "../schema";

export async function getUserId(name: string){
    return await db.select({field1: users.id}).from(users).where(eq(users.name, name));
}