import axios from "axios";
import { parseString } from "xml2js";
import { promisify } from "util";

const parseXML = promisify(parseString);

interface FeedItem {
    title: string;
    link: string;
    description: string;
    pubDate?: string;
}

interface FeedData {
    title: string;
    description: string;
    items: FeedItem[];
}

// Define possible feed structures
interface RSSFeed {
    rss: {
        channel: {
            title: string[];
            description: string[];
            item?: any[];
        }[];
    };
}

interface AtomFeed {
    feed: {
        title: string[];
        subtitle?: string[];
        entry?: any[];
    }[];
}

type ParsedFeed = RSSFeed | AtomFeed | any[];


export const fetchRSSFeed = async (url: string): Promise<FeedData> => {
    try {
        const response = await axios.get(url);
        const parsedData = await parseXML(response.data);

        const parsedFeed = parsedData as ParsedFeed;
        let feedData: FeedData = {
            title: '',
            description: '',
            items: [],
        };

        if(isRSSFeed(parsedFeed)) {
            const channel = parsedFeed.rss.channel[0];
            feedData.title = channel.title[0] || '';
            feedData.description = channel.description[0] || '';
            feedData.items = channel.item?.map(parseRSSItem) || [];
        } else if(isAtomFeed(parsedFeed)) {
            feedData.title = parsedFeed.feed[0].title[0] || '';
            feedData.description = parsedFeed.feed[0].subtitle ? parsedFeed.feed[0].subtitle[0] : '';
            feedData.items = parsedFeed.feed[0].entry?.map(parseAtomItem) || [];
        } else if (Array.isArray(parsedFeed)) {
            feedData.title = 'Article Feed';
            feedData.description = 'A list of articles';
            feedData.items = parsedFeed.map(parseDirectItem);
        } else {
            throw new Error('Unrecognized feed format');
        }

        return feedData;
    } catch (error) {
        console.error("Error fetching RSS feed:", error);
        throw error;
    }
};

function isRSSFeed(feed: ParsedFeed): feed is RSSFeed {
    return (feed as RSSFeed).rss?.channel !== undefined;
};

function isAtomFeed(feed: ParsedFeed): feed is AtomFeed {
    return (feed as AtomFeed).feed !== undefined;
};

const parseRSSItem = (item: any): FeedItem => ({
    title: item.title?.[0] || '',
    link: item.link?.[0] || '',
    description: item.description?.[0] || '',
    pubDate: item.pubDate ? item.pubDate[0] : undefined,
});

const parseAtomItem = (item: any): FeedItem => ({
    title: item.title?.[0] || '',
    link: item.link?.[0] || '',
    description: item.summary?.[0] || '',
    pubDate: item.published ? item.published[0] : undefined,
});

const parseDirectItem = (item: any): FeedItem => ({
    title: item.title || '',
    link: item.link || '',
    description: item.description || '',
    pubDate: item.pubDate ? item.pubDate : undefined,
});