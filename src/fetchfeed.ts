import { XMLParser } from "fast-xml-parser";

export type RSSFeed = {
  channel: {
    title: string;
    link: string;
    description: string;
    item: RSSItem[];
  };
};

type RSSItem = {
  title: string;
  link: string;
  description: string;
  pubDate: string;
};

export async function fetchFeed(fetchURL: string): Promise<RSSFeed>{
    try{
        const rawResponse = await fetch(fetchURL, {
            "headers":{
                "User-Agent": "gator",
            },
        });
        const response = await rawResponse.text();
        const parser = new XMLParser();
        const responseObjectBefore = parser.parse(response);
        const responseObject = responseObjectBefore.rss;
        if (!("channel" in responseObject)){
            throw new Error("Channel field is missing!");
        }
        if (!("title" in responseObject.channel ||
            "link" in responseObject.channel ||
            "description" in responseObject.channel)){
                throw new Error ("Channel is missing necessary fields!");
            }
        let rssFeedObject: RSSFeed = {
            channel: {
                title: "",
                link: "",
                description: "",
                item: [],
            }
        }
        rssFeedObject.channel.title = responseObject.channel.title;
        rssFeedObject.channel.link = responseObject.channel.link;
        rssFeedObject.channel.description = responseObject.channel.description;
        if (!(Array.isArray(responseObject.channel.item))){
            responseObject.channel.item = [];
        }

        for(const responseItem of responseObject.channel.item){
            if (
                "title" in responseItem && typeof responseItem.title === "string" &&
                "link" in responseItem && typeof responseItem.link === "string" &&
                "description" in responseItem && typeof responseItem.description === "string" &&
                "pubDate" in responseItem && typeof responseItem.pubDate === "string" 
            ){
                rssFeedObject.channel.item.push({
                    title: responseItem.title,
                    link: responseItem.link,
                    description: responseItem.description,
                    pubDate: responseItem.pubDate
                });

            }
        }
        return rssFeedObject;
    }catch(Error){
        throw Error;
    }
}