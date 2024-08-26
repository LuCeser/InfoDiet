import axios from "axios";
import FeedParser from "feedparser";
import { Stream } from "stream";

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

export const fetchAndParseFeed = (url: string): Promise<FeedData> => {
    return new Promise((resolve, reject) => {
        const feedparser = new FeedParser({});
        const feedData: FeedData = {
            title: '',
            description: '',
            items: []
        };

        console.log(`try to get ${url}`)

        axios.get(url, {
            responseType: 'arraybuffer',
            headers: {
                'Accept': 'application/rss+xml, application/xml, application/atom+xml, text/xml',
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'        
            }
        }).then(response => {
            if (response.status !== 200) {
                throw new Error('Bad status code')
            }

            const buffer = Buffer.from(response.data);
            const stream = new Stream.PassThrough();
            stream.end(buffer);
            stream.pipe(feedparser);
        }).catch(error => {
            console.log(`get ${url} failed, ${error.message}`)
            reject(new Error(`Request failed: ${error.message}`));
        });

        feedparser.on('error', (error: Error) => {
            console.log(`get ${url} failed, ${error.message}`)
            reject(new Error(`FeedParser error: ${error.message}`));
        });

        feedparser.on('meta', (meta: any) => {
            feedData.title = meta.title || '';
            feedData.description = meta.description || '';
        });

        feedparser.on('readable', function(this: FeedParser) {
            let item: any;
            while(item = this.read()) {
                feedData.items.push({
                    title: item.title || '',
                    link: item.link || '',
                    description: item.description || '',
                    pubDate: item.pubDate
                });
            }
        });

        feedparser.on('end', () => {
            resolve(feedData);
        });
    });
};