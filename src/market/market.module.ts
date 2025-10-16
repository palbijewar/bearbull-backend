import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { UsersModule } from "../users/users.module";
import { MarketService } from "./market.service";
import { MarketController } from "./market.controller";
import { JwtStrategy } from "./jwt.strategy";

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.registerAsync({
      useFactory: () => ({
        secret: process.env.JWT_SECRET || "dev_secret_change_me",
        signOptions: { expiresIn: "7d" },
      }),
    }),
  ],
  controllers: [MarketController],
  providers: [MarketService, JwtStrategy],
})
export class MarketModule {}
