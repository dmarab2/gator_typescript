import { except } from "drizzle-orm/gel-core";
import { CommandHandler } from "./commandhandler";
import { deleteUserTable } from "./lib/db/queries/deleteusers";

export async function resetHandler(cmdName: string, ...args: string[]){
    console.log("Now truncating database.");
    try{
        await deleteUserTable();
        console.log("Successfully truncated database!")
    }catch(Error){
        throw Error;
    }
}

