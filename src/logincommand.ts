import { CommandHandler } from "./commandhandler"
import { setUser } from "./config";

export const loginHandler: CommandHandler = (cmdName: string, ...args: string[]): void => {
    if(args.length === 0){
        throw new Error("You need a login name!")
    }
    const username = args[0];
    setUser(username);
    console.log(`${username} has been set as the user.`);
}