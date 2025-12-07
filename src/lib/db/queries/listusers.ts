import { db } from "..";
import { users } from "../schema";

export async function listUsers(){
    const result = await db.select({
        field1: users.name
    }).from(users);
    return result;
}