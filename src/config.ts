import { homedir } from "os";
import { readFileSync, writeFileSync } from "fs";

export type ConfigJson = {
    dbUrl: string,
    currentUserName: string
};

function getConfigPath(): string{
    const homeLocation = homedir();
    return `${homeLocation}/.gatorconfig.json`
}

function validateConfig(rawConfig: any): ConfigJson{
    if(typeof rawConfig.dbUrl === "string" && typeof rawConfig.currentUserName === "string"){
        return rawConfig as ConfigJson;
    }
    throw Error("This isn't a valid config JSON!");
}

function writeConfig(config: ConfigJson){
    const configString = JSON.stringify(config);
    writeFileSync(getConfigPath(), configString);
}

function parseConfigObject(configString: string){
    const stringObject = JSON.parse(configString);
    const finalObject = {
        dbUrl: stringObject.db_url ?? stringObject.dbUrl,
        currentUserName: stringObject.current_user_name ?? stringObject.currentUserName,
    };
    return finalObject;
}

export function readConfig(): ConfigJson{
    const configFilePath = getConfigPath();
    const configString = readFileSync(configFilePath, "utf-8");
    const rawConfigObject = parseConfigObject(configString);
    try{
        const configObject = validateConfig(rawConfigObject);
        return configObject;
    }catch(Error){
        throw Error;
    }
}

export function setUser(username: string){
    try{
        let currentConfig = readConfig();
        currentConfig.currentUserName = username;
        writeConfig(currentConfig);
    }catch(error){
        console.log("Something went wrong!");
        console.log(error);
    }
}