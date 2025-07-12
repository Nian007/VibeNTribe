import { Request } from 'express';

// User types
export interface User {
  id: string;
  linkedin_id: string;
  email: string;
  first_name: string;
  last_name: string;
  profile_picture?: string;
  headline?: string;
  location?: string;
  is_onboarded: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface CreateUserData {
  linkedin_id: string;
  email: string;
  first_name: string;
  last_name: string;
  profile_picture?: string;
  headline?: string;
  location?: string;
}

// Travel date types
export interface TravelDate {
  id: string;
  user_id: string;
  start_date: Date;
  end_date: Date;
  destination?: string;
  is_flexible: boolean;
  created_at: Date;
}

export interface CreateTravelDateData {
  user_id: string;
  start_date: Date;
  end_date: Date;
  destination?: string;
  is_flexible: boolean;
}

// Group preference types
export interface GroupPreference {
  id: string;
  user_id: string;
  preference_type: 'mixed' | 'couples' | 'girls_only';
  is_active: boolean;
  created_at: Date;
}

export interface CreateGroupPreferenceData {
  user_id: string;
  preference_type: 'mixed' | 'couples' | 'girls_only';
  is_active: boolean;
}

// Match types
export interface Match {
  id: string;
  user_id: string;
  matched_user_id: string;
  compatibility_score: number;
  status: 'pending' | 'accepted' | 'declined';
  created_at: Date;
  updated_at: Date;
}

export interface CreateMatchData {
  user_id: string;
  matched_user_id: string;
  compatibility_score: number;
}

// Notification types
export interface Notification {
  id: string;
  user_id: string;
  type: 'match_found' | 'match_accepted' | 'new_message';
  title: string;
  message: string;
  is_read: boolean;
  metadata?: string; // JSON string
  created_at: Date;
}

export interface CreateNotificationData {
  user_id: string;
  type: 'match_found' | 'match_accepted' | 'new_message';
  title: string;
  message: string;
  metadata?: Record<string, any>;
}

// API Response types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
  timestamp: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}

// Authentication types
export interface JwtPayload {
  userId: string;
  email: string;
  iat?: number;
  exp?: number;
}

export interface AuthenticatedRequest extends Request {
  user?: User;
  userId?: string;
}

// LinkedIn API types
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

export interface LinkedInTokenResponse {
  access_token: string;
  expires_in: number;
  scope: string;
  token_type: string;
}

// WhatsApp types
export interface WhatsAppMessage {
  messaging_product: 'whatsapp';
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

// Onboarding types
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

// Matching algorithm types
export interface MatchingCriteria {
  userId: string;
  travelDates: TravelDate[];
  groupPreferences: GroupPreference[];
}

export interface MatchResult {
  userId: string;
  matchedUserId: string;
  compatibilityScore: number;
  commonDates: TravelDate[];
  sharedPreferences: string[];
}

// Error types
export interface AppError extends Error {
  statusCode: number;
  isOperational: boolean;
}

// Database query types
export interface QueryOptions {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'ASC' | 'DESC';
  filters?: Record<string, any>;
}

// Validation types
export interface ValidationError {
  field: string;
  message: string;
  value?: any;
}

// Request types
export interface LoginRequest {
  code: string;
  state: string;
}

export interface OnboardingRequest {
  travelDates: Array<{
    startDate: string;
    endDate: string;
    destination?: string;
    isFlexible: boolean;
  }>;
  groupPreferences: Array<'mixed' | 'couples' | 'girls_only'>;
}

export interface UpdateUserRequest {
  firstName?: string;
  lastName?: string;
  headline?: string;
  location?: string;
}

// Response types
export interface LoginResponse {
  user: Omit<User, 'created_at' | 'updated_at'> & {
    createdAt: string;
    updatedAt: string;
  };
  token: string;
  expiresIn: string;
}

export interface MatchResponse {
  matches: Array<Match & {
    matchedUser: Omit<User, 'email' | 'linkedin_id'>;
    commonDates: TravelDate[];
  }>;
  totalCount: number;
  hasMore: boolean;
}