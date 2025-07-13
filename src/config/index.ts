// Configuration for VibeNTribe Platform
// All sensitive values should be stored in environment variables

export const config = {
  // API Configuration
  api: {
    baseUrl: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api',
    timeout: 10000,
  },

  // LinkedIn OAuth Configuration
  linkedin: {
    clientId: import.meta.env.VITE_LINKEDIN_CLIENT_ID || '',
    redirectUri: import.meta.env.VITE_LINKEDIN_REDIRECT_URI || `${window.location.origin}/auth/linkedin/callback`,
    scope: 'r_liteprofile r_emailaddress',
    state: 'vibeNtribe_auth_state', // Add random string in production
  },

  // WhatsApp Configuration (for backend)
  whatsapp: {
    accessToken: import.meta.env.VITE_WHATSAPP_ACCESS_TOKEN || '',
    phoneNumberId: import.meta.env.VITE_WHATSAPP_PHONE_NUMBER_ID || '',
    apiVersion: 'v18.0',
  },

  // App Configuration
  app: {
    name: 'VibeNTribe',
    description: 'Discover your perfect travel companions',
    version: '1.0.0',
    supportEmail: 'support@vibentribe.com',
  },

  // Feature Flags
  features: {
    enableWhatsAppNotifications: true,
    enableEmailNotifications: false,
    enablePushNotifications: false,
    enableAdvancedMatching: true,
  },

  // UI Configuration
  ui: {
    maxTravelDates: 5, // Maximum number of date ranges a user can select
    matchingRadius: 50, // km radius for location-based matching (future feature)
    animationDuration: 300, // ms
  },

  // Date Configuration
  dates: {
    minAdvanceBooking: 1, // Minimum days in advance for travel dates
    maxAdvanceBooking: 365, // Maximum days in advance for travel dates
    dateFormat: 'yyyy-MM-dd',
    displayFormat: 'MMM dd, yyyy',
  },
};

// Validation function to check if required config is present
export const validateConfig = () => {
  const requiredFields = [
    'VITE_LINKEDIN_CLIENT_ID',
  ];

  const missing = requiredFields.filter(field => !import.meta.env[field]);
  
  if (missing.length > 0) {
    console.warn('Missing required environment variables:', missing);
    return false;
  }
  
  return true;
};

// Helper to get LinkedIn OAuth URL
export const getLinkedInAuthUrl = () => {
  const params = new URLSearchParams({
    response_type: 'code',
    client_id: config.linkedin.clientId,
    redirect_uri: config.linkedin.redirectUri,
    scope: config.linkedin.scope,
    state: config.linkedin.state,
  });

  return `https://www.linkedin.com/oauth/v2/authorization?${params.toString()}`;
};

export default config;
