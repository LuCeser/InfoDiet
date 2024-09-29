import axios from "axios";

export interface ArticleItem {
  title: string;
  link: string;
  content?: string;
  pubDate?: string;
}

export async function fetchArticleContent(item: any): Promise<ArticleItem> {

    const articleItem: ArticleItem = {
        title: item.title,
        link: item.link,
        pubDate: item.pubDate
    };

    try {
        const response = await axios.get(`https://r.jina.ai/${item.link}`);
        articleItem.content = response.data;
    } catch (error) {
        console.error(`Error fetching ${item.link} article content. ${error}`);
    }

    return articleItem;
};

export async function processRssItems(items: any[]): Promise<ArticleItem[]> {
    const articles = await Promise.all(items.map(fetchArticleContent));
    return articles;
}