import { Body, Controller, Get, Header, Post } from '@nestjs/common';

import { AppService } from './app.service';
import { ChatMessageDto } from './dto/chat.message.dto';

// import { GeneratePhotoDto } from './dto/generate-photo.dto';

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {}

    @Get("health")
    getHealth() {
        return "Vision Bank backend is running!";
    }

    @Post("/chat")
    @Header("Cache-Control", "no-cache")
    async chat(@Body() dto: ChatMessageDto) {
        return await this.appService.create(dto);
    }
}
