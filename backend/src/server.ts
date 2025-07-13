import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { config } from './config';
import authRoutes from './routes/auth';
import onboardingRoutes from './routes/onboarding';

const app = express();

// --- Middleware Setup ---
app.use(helmet());
app.use(cors({
  origin: config.server.frontendUrl,
  credentials: true,
}));

const limiter = rateLimit({
  windowMs: config.rateLimit.windowMs,
  max: config.rateLimit.maxRequests,
  message: 'Too many requests from this IP, please try again later.',
});
app.use(limiter);

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// --- Health Check ---
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    environment: config.server.env,
  });
});

// --- API Routes ---
app.use('/api/auth', authRoutes);
app.use('/api/onboarding', onboardingRoutes);
// Future routes:
// app.use('/api/matches', matchesRoutes);
// app.use('/api/notifications', notificationsRoutes);

// --- Error Handling ---
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

app.use((err: any, req: express.Request, res: express.Response) => {
  console.error('Global error:', err);
  res.status(500).json({ 
    error: config.server.env === 'production' ? 'Internal server error' : err.message 
  });
});

// --- Server Start ---
app.listen(config.server.port, () => {
  console.log(`🚀 Server running on port ${config.server.port}`);
  console.log(`🌐 Accepting requests from: ${config.server.frontendUrl}`);
});
