import express from 'express';
import cors from 'cors';
import "dotenv/config";
import connectDb from './configs/db.js';
import { clerkMiddleware } from '@clerk/express';
import clerkWebhooks from './controllers/clerkWebhooks.js';

connectDb()

const app = express();
app.use(cors());

//middleware
app.use(clerkMiddleware());
app.use(express.json());

const PORT = process.env.PORT || 3000;

//APIS
//CLERK WEBHOOK API
app.use('/api/clerk', clerkWebhooks)

app.get('/', (req, res) => {
    res.send('QuickStay server is live!');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});