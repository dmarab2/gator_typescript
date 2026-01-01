import { readConfig } from "./config";
import { getUser } from "./lib/db/queries/getuser";
import { User } from "./lib/db/schema";

export type CommandHandler = (cmdName: string, ...args: string[]) => Promise<void>;

type UserCommandHandler = (
  cmdName: string,
  user: User,
  ...args: string[]
) => Promise<void>;

type middlewareLoggedIn = (handler: UserCommandHandler) => CommandHandler;

export const middlewareLoggedInFunc: middlewareLoggedIn =
  (handler) =>
  async (cmdName: string, ...args: string[]): Promise<void> => {
    const configObject = readConfig();
    const currentUserName = configObject.currentUserName;
    const [currentUser] = await getUser(currentUserName);

    if (!currentUser) {
      throw new Error("You must be logged in to use this command.");
      // or: console.log("...") and return;
    }

    return handler(cmdName, currentUser, ...args);
  };
