import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';

@Injectable()
export class ZohoDeskProvider {
  private clientId: string;
  private clientSecret: string;
  private refreshToken: string;
  private departmentId: string;
  private orgId: string;

  private accessToken: string | null = null;
  private accessTokenExpiry: number | null = null;

  constructor(private configService: ConfigService) {
    this.clientId = this.getConfigValue('ZOHO_CLIENT_ID');
    this.clientSecret = this.getConfigValue('ZOHO_CLIENT_SECRET');
    this.refreshToken = this.getConfigValue('ZOHO_REFRESH_TOKEN');
    this.departmentId = this.getConfigValue('ZOHO_DEPARTMENT_ID');
    this.orgId = this.getConfigValue('ZOHO_ORG_ID');
  }

  private getConfigValue(key: string): string {
    const value = this.configService.get<string>(key);
    if (!value) {
      throw new Error(`Missing config value for ${key}`);
    }
    return value;
  }

  private async refreshAccessToken(): Promise<void> {
    const url = 'https://accounts.zoho.com/oauth/v2/token';
    const params = new URLSearchParams({
      refresh_token: this.refreshToken,
      client_id: this.clientId,
      client_secret: this.clientSecret,
      grant_type: 'refresh_token',
    });

    try {
      const response = await axios.post<{ access_token: string; expires_in: number }>(`${url}?${params.toString()}`);
      const data = response.data;
      this.accessToken = data.access_token;
      this.accessTokenExpiry = Date.now() + (data.expires_in - 300) * 1000;
    } catch (error) {
      throw new Error('Failed to refresh Zoho access token');
    }
  }

  private async getAccessToken(): Promise<string> {
    if (!this.accessToken || !this.accessTokenExpiry || Date.now() >= this.accessTokenExpiry) {
      await this.refreshAccessToken();
    }
    return this.accessToken!;
  }


  public async createTicket(ticketData: any): Promise<any> {
    const token = await this.getAccessToken();
    const url = `https://desk.zoho.com/api/v1/tickets`;
    const body = {... ticketData, departmentId : this.departmentId};
    try {
      const response = await axios.post(url, body, {
        headers: {
          Authorization: `Zoho-oauthtoken ${token}`,
          'Content-Type': 'application/json',
          orgId: this.orgId,
        },
      });
      return response.data;
    } catch (error) {
      throw new Error('Failed to create ticket in Zoho Desk');
    }
  }
}
