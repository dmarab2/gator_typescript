import { argv } from 'node:process';
import { CommandRegistry } from "./commandregistry";
import { loginHandler } from "./logincommand";
import { registerCommand, runCommand } from "./commandregistry";
import { readConfigFile, setUser } from "./config";
import { exit } from "process";

function main() {
  let registry: CommandRegistry = {};
  registerCommand(registry, "login", loginHandler);
  const argvSlice = argv.slice(2);
  if (argvSlice.length < 1){
    console.log("You need at least one argument for this program!")
    exit(1);
  }
const [commandName, ...commandList] = argvSlice;
try{
  runCommand(registry, commandName, ...commandList);
}catch(error){
  console.log(error);
  exit(1);
}
}

main();