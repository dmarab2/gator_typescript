import { db } from "..";
import { users } from "../schema";

export async function createUser(name: string) {
    console.log(`About to insert user ${name}`);
    const [result] = await db.insert(users).values({ name: name }).returning();
    console.log(`Inserted user ${name}`);
    console.log(`Got result ${result}`);
    return result;
}