import { MarketService } from './market.service';
export declare class MarketController {
    private readonly marketService;
    constructor(marketService: MarketService);
    login(): Promise<{
        jwtToken: any;
        feedToken: any;
        clientCode: string;
        apiKey: string;
    }>;
    getWebSocketUrl(): Promise<{
        wsUrl: string;
        feedToken: any;
        clientCode: string;
        apiKey: string;
    }>;
}
