import { Request, Response } from "express";
import RSSSource from "../models/RSSSource";
import { fetchRSSFeed } from "../utils/rssFetcher";

export const createRSSSource = async (req: Request, res: Response) => {
    try {
        const { url } = req.body;
        if (!url) {
            return res.status(400).json({ error: 'URL is required' });
        }

        const feedData = await fetchRSSFeed(url);
        const rssSource = await RSSSource.create({ 
          url: url, 
          title: feedData.title, 
          description: feedData.description 
        });
        res.status(201).json(rssSource);
    } catch(error) {
        res.status(400).json({ error: 'Failed to create RSS source' });
    }
};

export const getRSSSources = async (req: Request, res: Response) => {
    try {
        const rssSources = await RSSSource.findAll();
        res.status(200).json(rssSources)
    } catch(error) {
        res.status(500).json({ error: 'Failed to fetch RSS sources'})
    }
};

export const updateRSSSource = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { name, url, description } = req.body;
      const rssSource = await RSSSource.findByPk(id);
      if (!rssSource) {
        return res.status(404).json({ error: 'RSS source not found' });
      }
      await rssSource.update({ name, url, description });
      res.status(200).json(rssSource);
    } catch (error) {
      res.status(400).json({ error: 'Failed to update RSS source' });
    }
  };

  export const deleteRSSSource = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const rssSource = await RSSSource.findByPk(id);
      if (!rssSource) {
        return res.status(404).json({ error: 'RSS source not found' });
      }
      await rssSource.destroy();
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete RSS source' });
    }
  };