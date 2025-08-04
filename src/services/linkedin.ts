// Mock LinkedIn OAuth Service

export class LinkedInService {
  private static readonly CLIENT_ID = import.meta.env.VITE_LINKEDIN_CLIENT_ID || 'mock_client_id';
  private static readonly REDIRECT_URI = `${window.location.origin}/auth/linkedin/callback`;
  
  static validateConfig(): boolean {
    // In a real implementation, this would check if the CLIENT_ID is properly set
    return true;
  }
  
  static initiateLogin(): void {
    // In a real implementation, this would redirect to LinkedIn OAuth page
    // For our mock, we'll just simulate the redirect and callback
    console.log('Initiating LinkedIn login...');
    
    // Store the state in localStorage to verify when we return
    const state = Math.random().toString(36).substring(2, 15);
    localStorage.setItem('linkedin_oauth_state', state);
    
    // Mock the redirect by changing window location
    // In our mock, we'll just redirect to our own callback page
    window.location.href = `/auth/linkedin/callback?code=mock_auth_code&state=${state}`;
  }
  
  static async handleCallback(code: string, state: string): Promise<{ success: boolean; error?: string }> {
    // In a real implementation, this would exchange the code for an access token
    // and then fetch the user profile
    
    // Verify state matches what we stored (CSRF protection)
    const storedState = localStorage.getItem('linkedin_oauth_state');
    if (state !== storedState) {
      return { success: false, error: 'Invalid state parameter' };
    }
    
    // Clean up
    localStorage.removeItem('linkedin_oauth_state');
    
    // Mock successful authentication
    return { success: true };
  }
}
