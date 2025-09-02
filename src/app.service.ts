import OpenAI from 'openai';

import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { ChatMessageDto } from './dto/chat.message.dto';

@Injectable()
export class AppService {
    private readonly openai: OpenAI;
    private conversationId: string | null = null;

    constructor(private readonly configService: ConfigService) {
        this.openai = new OpenAI({ apiKey: this.configService.get<string>("OPENAI_API_KEY") });
    }

    async create(dto: ChatMessageDto) {
        // If isNewChat is true, create a new conversation
        if (dto.isNewChat) {
            const conversation = await this.openai.conversations.create({
                metadata: { topic: `chat_${new Date().toISOString()}` },
                items: [
                    {
                        type: "message",
                        role: "system",
                        content: "You are a helpful banking assistant for Vision Bank. You help visitors with banking questions and services. Be friendly, professional, and informative."
                    }
                ]
            });
            this.conversationId = conversation.id;
        }

        //  Create streaming response within the conversation context
        const stream = await this.openai.responses.create({
            model: "gpt-5",
            conversation: this.conversationId,
            input: dto.message,
            stream: true
        });

        // Return the stream
        return stream;
    }
}
