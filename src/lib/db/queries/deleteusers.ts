import { db } from "..";
import { users } from "../schema";

export async function deleteUserTable(){
    await db.delete(users);
}