import * as cookieParser from 'cookie-parser';
import helmet from 'helmet';

import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';

import { AppModule } from './app.module';

async function bootstrap() {
    // HTTP Server
    const app = await NestFactory.create<NestExpressApplication>(AppModule);
    const configService = app.get(ConfigService);
    app.enableCors({ origin: configService.get<string>("FRONTEND_ORIGIN"), credentials: true });
    app.use(helmet());
    app.use(cookieParser(configService.get<string>("COOKIE_NAME_MAIN")));
    app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true, forbidNonWhitelisted: true }));
    app.set("query parser", "extended");
    await app.listen(configService.get<number>("PORT"));
}
bootstrap();
