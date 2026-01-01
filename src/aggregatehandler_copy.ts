import { CommandHandler } from "./commandhandler";
import { fetchFeed } from "./fetchfeed";

export async function aggregateHandler(cmdName: string, ...args: string[]){
    const xmlObject = await fetchFeed("https://www.wagslane.dev/index.xml");
    console.log(xmlObject);
    for (const item of xmlObject.channel.item){
        console.log(item);
    }
}