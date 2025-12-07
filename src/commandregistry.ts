import { CommandHandler } from "./commandhandler";
export type CommandRegistry = Record<string, CommandHandler>;

export function registerCommand(registry: CommandRegistry, cmdName: string, handler: CommandHandler){
    registry[cmdName] = handler;
}

export async function runCommand(registry: CommandRegistry, cmdName: string, ...args: string[]){
    if (!(cmdName in registry)){
        throw new Error("This is not a valid command!");
    }
    try{
        const commandFunction = registry[cmdName];
        await commandFunction(cmdName, ...args);
    }catch(error){
        console.log("Caught an error...");
        throw error;
    }
}