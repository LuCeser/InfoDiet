import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import rssSourceRoutes from './routes/rssSourceRoutes';
import sequelize from './config/database';

dotenv.config();

const app = express()
const PORT = process.env.PORT || 3000

app.use(cors())
app.use(express.json())

app.use('/api/rss-sources', rssSourceRoutes)

sequelize.sync().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`)
    });
});