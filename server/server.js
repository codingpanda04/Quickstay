// server.js
import express from 'express';
import cors from 'cors';
import "dotenv/config";
import connectDb from './configs/db.js';
import { clerkMiddleware } from '@clerk/express';
import { functions, inngest } from './inngest/index.js';
import {serve} from 'inngest/express'
import userRouter from './routes/userRoutes.js';
import hotelRouter from './routes/hotelRoutes.js';
import connectCloudinary from './configs/cloudinary.js';
import roomRouter from './routes/roomRoutes.js';
import bookingRouter from './routes/bookingRoutes.js';
import { stripeWebhook } from './controllers/stripeWebhooks.js';

await connectDb();
await connectCloudinary();

const app = express();
app.use(cors(/*{
  origin: "https://quickstay-ashy.vercel.app", // Replace with your frontend URL
  credentials: true
}*/));


//Stripe webhook
app.post('/api/stripe', express.raw({type: 'application/json'}), stripeWebhook);


// ✅ After raw middleware, now apply json parsing for other routes
app.use(express.json());

// Clerk middleware
app.use(clerkMiddleware());

// CLERK WEBHOOK API
app.use('/api/clerk', serve({client: inngest, functions}));



// Health check
app.get('/', (req, res) => {
    res.send('QuickStay server is live!');
});
app.use('/api/user', userRouter);
app.use('/api/hotels', hotelRouter);
app.use('/api/rooms', roomRouter);
app.use('/api/bookings', bookingRouter);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
