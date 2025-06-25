// server.js
import express from 'express';
import cors from 'cors';
import "dotenv/config";
import connectDb from './configs/db.js';
import { clerkMiddleware } from '@clerk/express';
import clerkWebhooks from './controllers/clerkWebhooks.js';

connectDb()

const app = express();
app.use(cors());

// 🛑 Middleware to save raw body for Clerk webhook verification
app.use('/api/clerk', express.raw({ type: 'application/json' }));

// ✅ After raw middleware, now apply json parsing for other routes
app.use(express.json());

// Clerk middleware
app.use(clerkMiddleware());

// CLERK WEBHOOK API
app.use('/api/clerk', clerkWebhooks);

// Health check
app.get('/', (req, res) => {
    res.send('QuickStay server is live!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
