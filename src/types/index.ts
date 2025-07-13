// Core type definitions for VibeNTribe platform

export interface User {
  id: string;
  linkedinId: string;
  email: string;
  firstName: string;
  lastName: string;
  profilePicture?: string;
  headline?: string;
  location?: string;
  isOnboarded: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface TravelDate {
  id: string;
  userId: string;
  startDate: Date;
  endDate: Date;
  destination?: string;
  isFlexible: boolean;
  createdAt: Date;
}

export interface GroupPreference {
  id: string;
  userId: string;
  preferenceType: 'mixed' | 'couples' | 'girls_only';
  isActive: boolean;
  createdAt: Date;
}

export interface Match {
  id: string;
  userId: string;
  matchedUserId: string;
  commonDates: TravelDate[];
  compatibilityScore: number;
  status: 'pending' | 'accepted' | 'declined';
  createdAt: Date;
  updatedAt: Date;
}

export interface Notification {
  id: string;
  userId: string;
  type: 'match_found' | 'match_accepted' | 'new_message';
  title: string;
  message: string;
  isRead: boolean;
  metadata?: Record<string, any>;
  createdAt: Date;
}

// API Response types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface LoginResponse {
  user: User;
  token: string;
  expiresIn: string;
}

export interface MatchResponse {
  matches: Match[];
  totalCount: number;
  hasMore: boolean;
}

// Form types
export interface OnboardingData {
  travelDates: Array<{
    startDate: Date;
    endDate: Date;
    destination?: string;
    isFlexible: boolean;
  }>;
  groupPreferences: Array<'mixed' | 'couples' | 'girls_only'>;
  interests?: string[];
  bio?: string;
}

export interface DateRange {
  startDate: Date;
  endDate: Date;
  destination?: string;
  isFlexible: boolean;
}

// LinkedIn OAuth types
export interface LinkedInProfile {
  id: string;
  firstName: {
    localized: Record<string, string>;
    preferredLocale: {
      country: string;
      language: string;
    };
  };
  lastName: {
    localized: Record<string, string>;
    preferredLocale: {
      country: string;
      language: string;
    };
  };
  profilePicture?: {
    displayImage: string;
  };
  headline?: {
    localized: Record<string, string>;
  };
}

export interface LinkedInEmailResponse {
  elements: Array<{
    'handle~': {
      emailAddress: string;
    };
  }>;
}

// WhatsApp types
export interface WhatsAppMessage {
  to: string;
  type: 'text';
  text: {
    body: string;
  };
}

export interface WhatsAppResponse {
  messaging_product: string;
  contacts: Array<{
    input: string;
    wa_id: string;
  }>;
  messages: Array<{
    id: string;
  }>;
}

// UI Component types
export interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
}

export interface CardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'glass' | 'gradient';
  padding?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
}

// Error types
export interface AppError {
  code: string;
  message: string;
  details?: any;
}

// Auth context types
export interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (code: string) => Promise<void>;
  logout: () => void;
  updateUser: (userData: Partial<User>) => void;
}

// Route types
export type RouteParams = {
  code?: string;
  state?: string;
  error?: string;
  error_description?: string;
};
