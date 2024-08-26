import axios from "axios";
import FeedParser from "feedparser";

export const fetchRSSContent = async (url: string): Promise<void> => {
    try{
        const response = await axios.get(url, {
            responseType: 'stream'
        });

        const feedparser = new FeedParser({});
        response.data.pipe(feedparser);

        feedparser.on('error', (error: Error) => {
            console.error(error);
        });


    } catch (error) {
        console.error(error);
    };
};