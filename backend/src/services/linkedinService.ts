import axios from 'axios';
import { config } from '../config';
import { LinkedInProfile, LinkedInEmail } from '../types';

export class LinkedInService {
  private static async getAccessToken(code: string): Promise<string> {
    try {
      const response = await axios.post('https://www.linkedin.com/oauth/v2/accessToken', {
        grant_type: 'authorization_code',
        code,
        client_id: config.linkedin.clientId,
        client_secret: config.linkedin.clientSecret,
        redirect_uri: config.linkedin.redirectUri,
      }, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });

      return response.data.access_token;
    } catch (error) {
      console.error('LinkedIn access token error:', error);
      throw new Error('Failed to get LinkedIn access token');
    }
  }

  private static async getProfile(accessToken: string): Promise<LinkedInProfile> {
    try {
      const response = await axios.get('https://api.linkedin.com/v2/people/~:(id,firstName,lastName,profilePicture(displayImage~:playableStreams))', {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
      });

      return response.data;
    } catch (error) {
      console.error('LinkedIn profile error:', error);
      throw new Error('Failed to get LinkedIn profile');
    }
  }

  private static async getEmail(accessToken: string): Promise<string> {
    try {
      const response = await axios.get('https://api.linkedin.com/v2/emailAddress?q=members&projection=(elements*(handle~))', {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
      });

      const emailData: LinkedInEmail = response.data;
      return emailData.elements[0]['handle~'].emailAddress;
    } catch (error) {
      console.error('LinkedIn email error:', error);
      throw new Error('Failed to get LinkedIn email');
    }
  }

  public static async getUserData(code: string) {
    const accessToken = await this.getAccessToken(code);
    const [profile, email] = await Promise.all([
      this.getProfile(accessToken),
      this.getEmail(accessToken),
    ]);

    let profilePicture = null;
    if (profile.profilePicture && profile.profilePicture['displayImage~']) {
      const elements = profile.profilePicture['displayImage~'].elements;
      if (elements && elements.length > 0) {
        profilePicture = elements[0].identifiers[0].identifier;
      }
    }

    return {
      linkedinId: profile.id,
      email,
      firstName: profile.firstName.localized.en_US,
      lastName: profile.lastName.localized.en_US,
      profilePicture,
    };
  }
}
