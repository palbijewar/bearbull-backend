import { Controller, Get, UseGuards } from '@nestjs/common';
import { MarketService } from './market.service';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('market')
export class MarketController {
  constructor(private readonly marketService: MarketService) {}

  /** 🔒 Protected route: gets fresh SmartAPI tokens */
  @UseGuards(JwtAuthGuard)
  @Get('login')
  async login() {
    return this.marketService.loginSmartAPI();
  }

  /** 🔓 Public route: returns WebSocket URL & feed token */
  @Get('ws-url')
  async getWebSocketUrl() {
    return this.marketService.getWebSocketUrl();
  }
}
