import { CommandHandler } from "./commandhandler"
import { getUser } from "./lib/db/queries/getuser";
import { setUser } from "./config";

export async function loginHandler(cmdName: string, ...args: string[]): Promise<void>{
    if(args.length === 0){
        throw new Error("You need a login name!")
    }
    const username = args[0];
    const usernameQuery = await getUser(username);
    if (usernameQuery.length < 1){
        throw new Error ("This user isn't in the database!");
    }
    setUser(username);
    console.log(`${username} has been set as the user.`);
}