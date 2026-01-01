import { addFeedHandler } from './addfeedhandler';
import { aggregateHandler } from './aggregatehandler';
import { argv } from 'node:process';
import { CommandRegistry } from "./commandregistry";
import { listFeedsHandler } from './listfeedshandler';
import { listUsersHandler } from './listusershandler';
import { loginHandler } from "./loginhandler";
import { registerCommand, runCommand } from "./commandregistry";
import { readConfig, setUser } from "./config";
import { exit } from "process";
import { register } from 'node:module';
import { registerHandler } from './registerhandler';
import { resetHandler } from './resethandler';
import { addFollowHandler } from './followhandler';
import { getFollowingHandler } from './getfollowinghandler';
import { middlewareLoggedInFunc } from './commandhandler';
import { deleteFollowHandler } from './deletefeedfollowhandler';

async function main() {
  let registry: CommandRegistry = {};
  registerCommand(registry, "login", loginHandler);
  registerCommand(registry, "register", registerHandler);
  registerCommand(registry, "reset", resetHandler);
  registerCommand(registry, "users", listUsersHandler);
  registerCommand(registry, "agg", aggregateHandler);
  registerCommand(registry, "addfeed", middlewareLoggedInFunc(addFeedHandler));
  registerCommand(registry, "feeds", listFeedsHandler);
  registerCommand(registry, "follow", middlewareLoggedInFunc(addFollowHandler));
  registerCommand(registry, "following", middlewareLoggedInFunc(getFollowingHandler));
  registerCommand(registry, "unfollow", middlewareLoggedInFunc(deleteFollowHandler));
  const argvSlice = argv.slice(2);
  if (argvSlice.length < 1) {
    console.log("You need at least one argument for this program!")
    exit(1);
  }
  const [commandName, ...commandList] = argvSlice;
  try {
    await runCommand(registry, commandName, ...commandList);
  } catch (error) {
    console.log(error);
    exit(1);
  }
  process.exit(0);
}

main();