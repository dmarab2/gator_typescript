import { CommandHandler } from "./commandhandler"
import { createUser } from "./lib/db/queries/createuser";
import { getUser } from "./lib/db/queries/getuser";
import { setUser } from "./config";
import { create } from "domain";

export async function registerHandler(cmdName: string, ...args: string[]): Promise<void>{
    if(args.length === 0){
        throw new Error("You need a login name!")
    }
    const username = args[0];
    const usernameQuery = await getUser(username);
    if (usernameQuery.length > 0){
        throw new Error ("This user already exists in the database!");
    }
    console.log(usernameQuery);
    const insertResult = await createUser(username);
    setUser(username);
    console.log(`${username} was created!`);
    const [printUsername] = await getUser(username);
    console.log(`Info is ${printUsername}`);
}