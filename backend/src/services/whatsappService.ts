import axios from 'axios';
import { config } from '../config';

export class WhatsAppService {
  private static baseUrl = `https://graph.facebook.com/${config.whatsapp.apiVersion}/${config.whatsapp.phoneNumberId}/messages`;

  public static async sendMessage(to: string, message: string): Promise<void> {
    try {
      const payload = {
        messaging_product: 'whatsapp',
        to: to.replace(/\D/g, ''), // Remove non-digits
        type: 'text',
        text: {
          body: message,
        },
      };

      await axios.post(this.baseUrl, payload, {
        headers: {
          'Authorization': `Bearer ${config.whatsapp.accessToken}`,
          'Content-Type': 'application/json',
        },
      });

      console.log(`✅ WhatsApp message sent to ${to}`);
    } catch (error) {
      console.error('WhatsApp send error:', error);
      throw new Error('Failed to send WhatsApp message');
    }
  }

  public static generateMatchMessage(userName: string, matchCount: number, commonDates: string[]): string {
    const datesList = commonDates.slice(0, 3).join(', '); // Show max 3 dates
    const moreText = commonDates.length > 3 ? ` and ${commonDates.length - 3} more` : '';
    
    return `🎉 Hey ${userName}! You're not alone! ${matchCount} other traveler${matchCount > 1 ? 's' : ''} ${matchCount > 1 ? 'are' : 'is'} free during ${datesList}${moreText} and match${matchCount === 1 ? 'es' : ''} your vibe! Check your VibeNTribe dashboard to connect: ${config.frontend.url}/dashboard`;
  }
}
