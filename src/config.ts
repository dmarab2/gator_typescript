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
    const stringObject = JSON.parse(configString, function(key, value){
        if (key === "db_url"){
            this.dbUrl = value;
            return undefined;
        }
        if (key === "current_user_name"){
            this.currentUserName = value;
            return undefined;
        }
        return value;
    });
    return stringObject;
}
export function readConfigFile(): ConfigJson{
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
        let currentConfig = readConfigFile();
        currentConfig.currentUserName = username;
        writeConfig(currentConfig);
    }catch(error){
        console.log("Something went wrong!");
        console.log(error);
    }
}