import axios from "axios";
import { parseString } from "xml2js";
import { promisify } from "util";

const parseXML = promisify(parseString);

interface RSSChannel {
    title: string[];
    description: string[];
  }

interface RSSFeed {
   rss: {
    channel: RSSChannel[];
   };
}

export const fetchRSSFeed = async (url: string): Promise<{title: string, description: string}> => {
    try {
        const response = await axios.get(url);
        const parsedData = await parseXML(response.data);

        const feed = parsedData as RSSFeed;
        if (!feed.rss || !feed.rss.channel || !Array.isArray(feed.rss.channel) || feed.rss.channel.length === 0) {
            throw new Error('Invalid RSS feed structure');
        }

        const channel = feed.rss.channel[0];

        if (!channel.title 
            || !Array.isArray(channel.title) 
            || channel.title.length === 0 
            || !channel.description 
            || !Array.isArray(channel.description) 
            || channel.description.length === 0) {
            throw new Error('RSS feed is missing title or description');
        }

        return {
            title: channel.title[0],
            description: channel.description[0],
        }
    } catch (error) {
        console.error("Error fetching RSS feed:", error);
        throw error;
    }
};