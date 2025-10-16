"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var MarketService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.MarketService = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = __importDefault(require("axios"));
const speakeasy = __importStar(require("speakeasy"));
let MarketService = MarketService_1 = class MarketService {
    constructor() {
        var _a, _b, _c, _d;
        this.logger = new common_1.Logger(MarketService_1.name);
        this.SMART_API_URL = 'https://apiconnect.angelone.in/rest/secure';
        this.API_KEY = (_a = process.env.ANGEL_API_KEY) !== null && _a !== void 0 ? _a : '';
        this.CLIENT_CODE = (_b = process.env.ANGEL_CLIENT_CODE) !== null && _b !== void 0 ? _b : '';
        this.PASSWORD = (_c = process.env.ANGEL_PASSWORD) !== null && _c !== void 0 ? _c : '';
        this.TOTP_SECRET = (_d = process.env.ANGEL_TOTP_SECRET) !== null && _d !== void 0 ? _d : '';
    }
    async loginSmartAPI() {
        var _a, _b, _c;
        try {
            if (!this.API_KEY || !this.CLIENT_CODE || !this.PASSWORD || !this.TOTP_SECRET) {
                throw new common_1.InternalServerErrorException('Missing AngelOne credentials in environment variables');
            }
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
            const response = await axios_1.default.post(`${this.SMART_API_URL}/angelbroking/user/v1/loginByPassword`, payload, {
                headers: {
                    'X-PrivateKey': this.API_KEY,
                    'Content-Type': 'application/json',
                },
            });
            this.logger.log(`✅ Login Response: ${JSON.stringify(response)}`);
            this.logger.log(`✅ Login Response: ${JSON.stringify(response.data)}`);
            const { jwtToken, feedToken } = (_b = (_a = response.data) === null || _a === void 0 ? void 0 : _a.data) !== null && _b !== void 0 ? _b : {};
            if (!jwtToken || !feedToken) {
                throw new common_1.InternalServerErrorException('SmartAPI login failed: Invalid tokens');
            }
            this.logger.log('✅ SmartAPI login successful');
            return { jwtToken, feedToken, clientCode: this.CLIENT_CODE, apiKey: this.API_KEY };
        }
        catch (err) {
            const details = ((_c = err.response) === null || _c === void 0 ? void 0 : _c.data) || err.message;
            this.logger.error('❌ SmartAPI login failed', details);
            throw new common_1.InternalServerErrorException(`SmartAPI login failed: ${JSON.stringify(details)}`);
        }
    }
    async getWebSocketUrl() {
        const { feedToken, clientCode, apiKey } = await this.loginSmartAPI();
        const wsUrl = `wss://smartapisocket.angelone.in/smart-stream?clientCode=${clientCode}&feedToken=${feedToken}&apiKey=${apiKey}`;
        return { wsUrl, feedToken, clientCode, apiKey };
    }
};
exports.MarketService = MarketService;
exports.MarketService = MarketService = MarketService_1 = __decorate([
    (0, common_1.Injectable)()
], MarketService);
//# sourceMappingURL=market.service.js.map