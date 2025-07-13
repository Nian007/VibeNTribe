import { config, getLinkedInAuthUrl } from '../config';
import { LinkedInProfile, LinkedInEmailResponse } from '../types';

/**
 * LinkedIn OAuth service for handling authentication flow
 */
export class LinkedInService {
  /**
   * Redirect user to LinkedIn OAuth authorization page
   */
  static initiateLogin(): void {
    const authUrl = getLinkedInAuthUrl();
    window.location.href = authUrl;
  }

  /**
   * Extract authorization code from URL parameters
   */
  static getAuthCodeFromUrl(): { code: string; state: string } | null {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    const state = urlParams.get('state');
    const error = urlParams.get('error');

    if (error) {
      throw new Error(`LinkedIn OAuth error: ${error}`);
    }

    if (!code || !state) {
      return null;
    }

    // Verify state parameter to prevent CSRF attacks
    if (state !== config.linkedin.state) {
      throw new Error('Invalid state parameter');
    }

    return { code, state };
  }

  /**
   * Exchange authorization code for access token (handled by backend)
   * This method would typically be called by the backend
   */
  static async exchangeCodeForToken(code: string): Promise<string> {
    const response = await fetch('https://www.linkedin.com/oauth/v2/accessToken', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        code,
        client_id: config.linkedin.clientId,
        client_secret: process.env.LINKEDIN_CLIENT_SECRET || '', // This should be in backend only
        redirect_uri: config.linkedin.redirectUri,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to exchange code for token');
    }

    const data = await response.json();
    return data.access_token;
  }

  /**
   * Fetch user profile from LinkedIn API (handled by backend)
   */
  static async getUserProfile(accessToken: string): Promise<LinkedInProfile> {
    const response = await fetch('https://api.linkedin.com/v2/people/~', {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'cache-control': 'no-cache',
        'X-Restli-Protocol-Version': '2.0.0',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch LinkedIn profile');
    }

    return response.json();
  }

  /**
   * Fetch user email from LinkedIn API (handled by backend)
   */
  static async getUserEmail(accessToken: string): Promise<string> {
    const response = await fetch('https://api.linkedin.com/v2/emailAddress?q=members&projection=(elements*(handle~))', {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'cache-control': 'no-cache',
        'X-Restli-Protocol-Version': '2.0.0',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch LinkedIn email');
    }

    const data: LinkedInEmailResponse = await response.json();
    
    if (!data.elements || data.elements.length === 0) {
      throw new Error('No email found in LinkedIn profile');
    }

    return data.elements[0]['handle~'].emailAddress;
  }

  /**
   * Clear any LinkedIn-related data from localStorage
   */
  static clearAuthData(): void {
    // Remove any LinkedIn-specific data if stored locally
    localStorage.removeItem('linkedin_auth_state');
    localStorage.removeItem('linkedin_access_token');
  }

  /**
   * Generate a random state parameter for CSRF protection
   */
  static generateState(): string {
    return Math.random().toString(36).substring(2, 15) + 
           Math.random().toString(36).substring(2, 15);
  }

  /**
   * Validate LinkedIn configuration
   */
  static validateConfig(): boolean {
    if (!config.linkedin.clientId) {
      console.error('LinkedIn Client ID is not configured');
      return false;
    }

    if (!config.linkedin.redirectUri) {
      console.error('LinkedIn Redirect URI is not configured');
      return false;
    }

    return true;
  }

  /**
   * Check if we're currently in the LinkedIn callback flow
   */
  static isCallbackUrl(): boolean {
    return window.location.pathname === '/auth/linkedin/callback';
  }

  /**
   * Handle LinkedIn callback and extract user data
   */
  static handleCallback(): { code: string; state: string } | null {
    if (!this.isCallbackUrl()) {
      return null;
    }

    try {
      return this.getAuthCodeFromUrl();
    } catch (error) {
      console.error('LinkedIn callback error:', error);
      throw error;
    }
  }
}

export default LinkedInService;
