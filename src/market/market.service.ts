import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import axios from 'axios';
import * as speakeasy from 'speakeasy';

@Injectable()
export class MarketService {
  private readonly logger = new Logger(MarketService.name);

  private readonly SMART_API_URL = 'https://apiconnect.angelone.in/rest/secure';
  private readonly API_KEY: string = process.env.ANGEL_API_KEY ?? '';
  private readonly CLIENT_CODE: string = process.env.ANGEL_CLIENT_CODE ?? '';
  private readonly PASSWORD: string = process.env.ANGEL_PASSWORD ?? '';
  private readonly TOTP_SECRET: string = process.env.ANGEL_TOTP_SECRET ?? '';

  /** ✅ Login and return tokens */
  async loginSmartAPI() {
    try {
      if (!this.API_KEY || !this.CLIENT_CODE || !this.PASSWORD || !this.TOTP_SECRET) {
        throw new InternalServerErrorException('Missing AngelOne credentials in environment variables');
      }

      // ✅ Generate dynamic TOTP code
      const totp = speakeasy.totp({
        secret: this.TOTP_SECRET,
        encoding: 'base32',
      });

      const payload = {
        clientcode: this.CLIENT_CODE,
        password: this.PASSWORD,
        totp,
      };

      this.logger.log(`📩 Login payload: ${JSON.stringify(payload)}`);

      const response = await axios.post(
        `${this.SMART_API_URL}/angelbroking/user/v1/loginByPassword`,
        payload,
        {
          headers: {
            'X-PrivateKey': this.API_KEY,
            'Content-Type': 'application/json',
          },
        },
      );
 this.logger.log(`✅ Login Response: ${JSON.stringify(response)}`);
      this.logger.log(`✅ Login Response: ${JSON.stringify(response.data)}`);

      const { jwtToken, feedToken } = response.data?.data ?? {};
      if (!jwtToken || !feedToken) {
        throw new InternalServerErrorException('SmartAPI login failed: Invalid tokens');
      }

      this.logger.log('✅ SmartAPI login successful');
      return { jwtToken, feedToken, clientCode: this.CLIENT_CODE, apiKey: this.API_KEY };
    } catch (err: any) {
      const details = err.response?.data || err.message;
      this.logger.error('❌ SmartAPI login failed', details);
      throw new InternalServerErrorException(`SmartAPI login failed: ${JSON.stringify(details)}`);
    }
  }

  /** ✅ Get WebSocket URL dynamically */
  async getWebSocketUrl() {
    const { feedToken, clientCode, apiKey } = await this.loginSmartAPI();
    const wsUrl = `wss://smartapisocket.angelone.in/smart-stream?clientCode=${clientCode}&feedToken=${feedToken}&apiKey=${apiKey}`;
    return { wsUrl, feedToken, clientCode, apiKey };
  }
}
