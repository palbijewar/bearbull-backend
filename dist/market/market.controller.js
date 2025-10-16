"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MarketController = void 0;
const common_1 = require("@nestjs/common");
const market_service_1 = require("./market.service");
const jwt_auth_guard_1 = require("./jwt-auth.guard");
let MarketController = class MarketController {
    constructor(marketService) {
        this.marketService = marketService;
    }
    async login() {
        return this.marketService.loginSmartAPI();
    }
    async getWebSocketUrl() {
        return this.marketService.getWebSocketUrl();
    }
};
exports.MarketController = MarketController;
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)('login'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], MarketController.prototype, "login", null);
__decorate([
    (0, common_1.Get)('ws-url'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], MarketController.prototype, "getWebSocketUrl", null);
exports.MarketController = MarketController = __decorate([
    (0, common_1.Controller)('market'),
    __metadata("design:paramtypes", [market_service_1.MarketService])
], MarketController);
//# sourceMappingURL=market.controller.js.map