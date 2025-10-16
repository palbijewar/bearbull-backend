export declare class MarketService {
    private readonly logger;
    private readonly SMART_API_URL;
    private readonly API_KEY;
    private readonly CLIENT_CODE;
    private readonly PASSWORD;
    private readonly TOTP_SECRET;
    loginSmartAPI(): Promise<{
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
