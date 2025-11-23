import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import authRoutes from './api/routes/auth.routes.js';
import tokohRoutes from './api/routes/tokoh.routes.js';
import tujuanRoutes from './api/routes/tujuan.routes.js';
import perjalananRoutes from './api/routes/perjalanan.routes.js';
import rintanganRoutes from './api/routes/rintangan.routes.js';
import emosiRoutes from './api/routes/emosi.routes.js';
import dashboardRoutes from './api/routes/dashboard.routes.js';
import errorHandler from './middlewares/errorHandler.middleware.js';

// Load environment variables
dotenv.config();

const app = express();

// Security Middlewares
app.use(express.json()); // Body parser for JSON
app.use(express.urlencoded({ extended: true })); // Body parser for URL-encoded data
app.use(cors()); // Enable CORS for all routes
app.use(helmet()); // Set various HTTP headers for security

// Define API Routes
app.use('/auth', authRoutes);
app.use('/tokoh', tokohRoutes);
app.use('/tujuan', tujuanRoutes);
// Mount perjalanan and rintangan routes correctly, handling nested IDs
// Perjalanan routes are mounted where :tujuanId is expected
// Rintangan routes are mounted where :perjalananId is expected
// Emosi routes are mounted where :rintanganId is expected
// Since they have their own routers with their specific paths, we can mount them
// directly, assuming the route definitions handle the params correctly.
app.use('/', perjalananRoutes); // Contains /tujuan/:tujuanId/perjalanan & /perjalanan/:id
app.use('/', rintanganRoutes); // Contains /perjalanan/:perjalananId/rintangan & /rintangan/:id
app.use('/', emosiRoutes);     // Contains /rintangan/:rintanganId/emosi & /emosi/:id
app.use('/dashboard', dashboardRoutes);


// Basic route for checking API status
app.get('/', (req, res) => {
  res.status(200).json({ message: 'Life Journey API is running!' });
});

// Error handling middleware
app.use(errorHandler);

export default app;