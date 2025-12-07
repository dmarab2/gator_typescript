import { CommandHandler } from "./commandhandler";
import { except } from "drizzle-orm/gel-core";
import { listUsers } from "./lib/db/queries/listusers";
import { readConfig } from "./config";


export async function listUsersHandler(cmdName: string, ...args: string[]){
    console.log("Now printing all users...");
    try{
        const configObject = readConfig();
        const loggedInUser = configObject.currentUserName;
        const userArray = await listUsers();
        for (const user of userArray){
            if (user.field1 === loggedInUser){
                console.log(`* ${user.field1} (current)`);
            }else{
                console.log(`* ${user.field1}`);
            }
        }
        console.log("Finished printing all users!");
    }catch(Error){
        throw Error;
    }
}