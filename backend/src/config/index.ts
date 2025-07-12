import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Validate required environment variables
const requiredEnvVars = [
  'JWT_SECRET',
  'DB_HOST',
  'DB_USER',
  'DB_PASSWORD',
  'DB_NAME',
  'LINKEDIN_CLIENT_ID',
  'LINKEDIN_CLIENT_SECRET',
];

const missingEnvVars = requiredEnvVars.filter(envVar => !process.env[envVar]);

if (missingEnvVars.length > 0) {
  console.error('❌ Missing required environment variables:', missingEnvVars);
  process.exit(1);
}

export const config = {
  // Server Configuration
  server: {
    port: parseInt(process.env.PORT || '3001', 10),
    env: process.env.NODE_ENV || 'development',
    frontendUrl: process.env.FRONTEND_URL || 'http://localhost:5173',
  },

  // Database Configuration
  database: {
    host: process.env.DB_HOST!,
    port: parseInt(process.env.DB_PORT || '3306', 10),
    user: process.env.DB_USER!,
    password: process.env.DB_PASSWORD!,
    name: process.env.DB_NAME!,
    url: process.env.DATABASE_URL,
  },

  // JWT Configuration
  jwt: {
    secret: process.env.JWT_SECRET!,
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
    refreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '30d',
  },

  // LinkedIn OAuth Configuration
  linkedin: {
    clientId: process.env.LINKEDIN_CLIENT_ID!,
    clientSecret: process.env.LINKEDIN_CLIENT_SECRET!,
    redirectUri: process.env.LINKEDIN_REDIRECT_URI || 'http://localhost:5173/auth/linkedin/callback',
    scope: 'r_liteprofile r_emailaddress',
  },

  // WhatsApp Configuration
  whatsapp: {
    accessToken: process.env.WHATSAPP_ACCESS_TOKEN || '',
    phoneNumberId: process.env.WHATSAPP_PHONE_NUMBER_ID || '',
    webhookVerifyToken: process.env.WHATSAPP_WEBHOOK_VERIFY_TOKEN || '',
    apiVersion: 'v18.0',
    baseUrl: 'https://graph.facebook.com',
  },

  // Email Configuration
  email: {
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.SMTP_PORT || '587', 10),
    user: process.env.SMTP_USER || '',
    password: process.env.SMTP_PASS || '',
  },

  // Security Configuration
  security: {
    bcryptRounds: parseInt(process.env.BCRYPT_ROUNDS || '12', 10),
    corsOrigin: process.env.CORS_ORIGIN || 'http://localhost:5173',
  },

  // Rate Limiting
  rateLimit: {
    windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000', 10), // 15 minutes
    maxRequests: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '100', 10),
  },

  // Feature Flags
  features: {
    enableWhatsAppNotifications: process.env.ENABLE_WHATSAPP_NOTIFICATIONS === 'true',
    enableEmailNotifications: process.env.ENABLE_EMAIL_NOTIFICATIONS === 'true',
    enableRateLimiting: process.env.ENABLE_RATE_LIMITING === 'true',
    enableRequestLogging: process.env.ENABLE_REQUEST_LOGGING === 'true',
  },

  // Matching Algorithm Configuration
  matching: {
    scoreThreshold: parseInt(process.env.MATCHING_SCORE_THRESHOLD || '70', 10),
    maxMatchesPerUser: parseInt(process.env.MAX_MATCHES_PER_USER || '50', 10),
    notificationBatchSize: parseInt(process.env.NOTIFICATION_BATCH_SIZE || '10', 10),
  },

  // API Configuration
  api: {
    version: process.env.API_VERSION || 'v1',
    prefix: '/api',
  },

  // Logging Configuration
  logging: {
    level: process.env.LOG_LEVEL || 'info',
  },
};

// Validation helper
export const validateConfig = (): boolean => {
  try {
    // Validate port
    if (isNaN(config.server.port) || config.server.port < 1 || config.server.port > 65535) {
      throw new Error('Invalid port number');
    }

    // Validate database port
    if (isNaN(config.database.port) || config.database.port < 1 || config.database.port > 65535) {
      throw new Error('Invalid database port number');
    }

    // Validate JWT secret length
    if (config.jwt.secret.length < 32) {
      throw new Error('JWT secret must be at least 32 characters long');
    }

    console.log('✅ Configuration validation successful');
    return true;
  } catch (error) {
    console.error('❌ Configuration validation failed:', error);
    return false;
  }
};

export default config;