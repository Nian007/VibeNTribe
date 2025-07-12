# VibeNTribe - Travel Matchmaking Platform

A premium travel matchmaking web platform that helps people discover compatible co-travelers based on dates and preferences.

## 🌟 Features

- **LinkedIn OAuth Authentication** - Secure login with professional profiles
- **Smart Date Matching** - Find travelers with overlapping travel dates
- **Group Preferences** - Match based on travel group types (mixed, couples, girls-only)
- **WhatsApp Notifications** - Instant alerts when matches are found
- **Premium UI/UX** - Modern, responsive design with smooth animations
- **Real-time Matching** - Dynamic matching algorithm based on preferences

## 🚀 Tech Stack

### Frontend
- **React 18** with TypeScript
- **Vite** for fast development and building
- **Tailwind CSS** for styling
- **Framer Motion** for animations
- **React Query** for state management
- **React Router** for navigation

### Backend
- **Node.js** with Express
- **TypeScript** for type safety
- **MySQL** database
- **JWT** authentication
- **LinkedIn OAuth** integration
- **WhatsApp Cloud API** for notifications

## 📦 Project Structure

```
vibeNtribe/
├── src/                    # Frontend React application
│   ├── components/         # Reusable UI components
│   ├── hooks/             # Custom React hooks
│   ├── services/          # API services
│   ├── types/             # TypeScript type definitions
│   ├── utils/             # Utility functions
│   └── config/            # Configuration files
├── backend/               # Backend Node.js application
│   ├── src/
│   │   ├── routes/        # API route handlers
│   │   ├── services/      # Business logic services
│   │   ├── middleware/    # Express middleware
│   │   ├── database/      # Database schema and migrations
│   │   └── config/        # Backend configuration
└── README.md
```

## 🛠️ Setup Instructions

### Prerequisites
- Node.js 18+ 
- MySQL 8.0+
- LinkedIn Developer Account
- WhatsApp Business Account (for notifications)

### 1. Clone and Install Dependencies

```bash
# Install frontend dependencies
npm install

# Install backend dependencies
cd backend
npm install
```

### 2. Database Setup

```bash
# Create MySQL database
mysql -u root -p
CREATE DATABASE vibeNtribe;

# Run database migrations
cd backend
npm run migrate
```

### 3. Environment Configuration

Create `.env` files based on the examples:

**Frontend (.env):**
```env
VITE_LINKEDIN_CLIENT_ID=your-linkedin-client-id
VITE_LINKEDIN_CLIENT_SECRET=your-linkedin-client-secret
VITE_LINKEDIN_REDIRECT_URI=http://localhost:5173/auth/linkedin/callback
VITE_WHATSAPP_ACCESS_TOKEN=your-whatsapp-access-token
VITE_WHATSAPP_PHONE_NUMBER_ID=your-phone-number-id
VITE_API_BASE_URL=http://localhost:3001/api
```

**Backend (backend/.env):**
```env
PORT=3001
NODE_ENV=development
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=your-password
DB_NAME=vibeNtribe
JWT_SECRET=your-super-secret-jwt-key
LINKEDIN_CLIENT_ID=your-linkedin-client-id
LINKEDIN_CLIENT_SECRET=your-linkedin-client-secret
WHATSAPP_ACCESS_TOKEN=your-whatsapp-access-token
WHATSAPP_PHONE_NUMBER_ID=your-phone-number-id
FRONTEND_URL=http://localhost:5173
```

### 4. LinkedIn OAuth Setup

1. Go to [LinkedIn Developer Portal](https://developer.linkedin.com/)
2. Create a new app
3. Add redirect URI: `http://localhost:5173/auth/linkedin/callback`
4. Copy Client ID and Client Secret to your `.env` files

### 5. WhatsApp Cloud API Setup

1. Go to [Meta for Developers](https://developers.facebook.com/)
2. Create a WhatsApp Business app
3. Get your Access Token and Phone Number ID
4. Add them to your `.env` files

## 🚀 Running the Application

### Development Mode

```bash
# Start backend server (from backend directory)
cd backend
npm run dev

# Start frontend development server (from root directory)
npm run dev
```

The application will be available at:
- Frontend: http://localhost:5173
- Backend API: http://localhost:3001
- Health Check: http://localhost:3001/health

### Production Build

```bash
# Build frontend
npm run build

# Build backend
cd backend
npm run build

# Start production server
npm start
```

## 🌐 Deployment Options

### Frontend Deployment (Vercel - Recommended)

1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Backend Deployment Options

**Railway (Recommended):**
1. Connect GitHub repository to Railway
2. Add environment variables
3. Deploy with automatic scaling

**Render:**
1. Create new Web Service on Render
2. Connect GitHub repository
3. Set environment variables
4. Deploy with free tier available

### Database Options

**PlanetScale (Recommended):**
- MySQL-compatible
- Generous free tier
- Automatic scaling

**Neon:**
- PostgreSQL (requires schema updates)
- Serverless architecture
- Free tier available

## 🔧 Configuration Guide

### Modular Integration Design

The platform is designed with plug-and-play integrations:

**LinkedIn OAuth:**
- Configuration in `src/config/index.ts`
- Service layer in `src/services/linkedin.ts`
- Easy to swap credentials without code changes

**WhatsApp Notifications:**
- Configuration in `backend/src/config/index.ts`
- Service layer in `backend/src/services/whatsappService.ts`
- Message templates easily customizable

### Environment Variables

All external service credentials are configurable via environment variables, making it easy to:
- Switch between development and production
- Update API keys without code changes
- Deploy to different environments

## 🎨 Design System

### Color Palette
- **Primary:** Blue gradient (#0ea5e9 to #0284c7)
- **Accent:** Purple gradient (#d946ef to #c026d3)
- **Success:** Green (#22c55e)
- **Background:** Subtle gradient from slate to blue

### Typography
- **Display Font:** Poppins (headings)
- **Body Font:** Inter (content)
- **Weights:** 300, 400, 500, 600, 700, 800

### Components
- Glassmorphism cards with backdrop blur
- Smooth hover animations and micro-interactions
- Responsive design with mobile-first approach
- Consistent 8px spacing system

## 📱 API Documentation

### Authentication Endpoints
- `POST /api/auth/linkedin` - LinkedIn OAuth callback
- `GET /api/auth/me` - Get current user

### Onboarding Endpoints
- `POST /api/onboarding` - Save user preferences

### Matching Endpoints
- `GET /api/matches` - Get user matches

### Notification Endpoints
- `POST /api/notifications/whatsapp` - Send WhatsApp notification

## 🔒 Security Features

- JWT token authentication
- Rate limiting (100 requests per 15 minutes)
- CORS protection
- Helmet security headers
- Input validation and sanitization
- SQL injection prevention with parameterized queries

## 🚀 Future Enhancements

- Real-time chat between matched users
- Advanced filtering options
- Travel destination preferences
- Group trip planning tools
- Integration with travel booking platforms
- Mobile app development
- AI-powered matching algorithm improvements

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and questions:
- Create an issue on GitHub
- Check the documentation
- Review the configuration examples

---

**Built with ❤️ for the travel community**