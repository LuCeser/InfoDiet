import express from 'express'
import {
    createRSSSource,
    getRSSSources,
    updateRSSSource,
    deleteRSSSource,
} from '../controllers/rssSourceController';

const router = express.Router();

router.post('/', createRSSSource)
router.get('/', getRSSSources)
router.put('/:id', updateRSSSource)
router.delete('/:id', deleteRSSSource)

export default router;