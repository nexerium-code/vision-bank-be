import OpenAI from 'openai';

import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { ChatMessageDto } from './dto/chat.message.dto';

@Injectable()
export class AppService {
    private readonly openai: OpenAI;

    constructor(private readonly configService: ConfigService) {
        this.openai = new OpenAI({
            apiKey: this.configService.get<string>("OPENAI_API_KEY")
        });
    }

    async create(dto: ChatMessageDto) {
        return await this.openai.responses.create({
            model: "gpt-5",
            instructions: "You are a helpful assistant.",
            input: dto.message,
            stream: true
        });
    }
}
