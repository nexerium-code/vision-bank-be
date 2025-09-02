import OpenAI from 'openai';

import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { ChatMessageDto } from './dto/chat.message.dto';

interface ConversationMessage {
    role: "user" | "assistant";
    content: string;
}

@Injectable()
export class AppService {
    private readonly openai: OpenAI;
    private conversationHistory: ConversationMessage[] = [];

    constructor(private readonly configService: ConfigService) {
        this.openai = new OpenAI({
            apiKey: this.configService.get<string>("OPENAI_API_KEY")
        });
    }

    async create(dto: ChatMessageDto) {
        // If isNewChat is true, start fresh conversation
        if (dto.isNewChat) {
            this.conversationHistory = [];
        }

        // Add user message to conversation history
        this.conversationHistory.push({
            role: "user",
            content: dto.message
        });

        // Create streaming chat completion with full conversation context
        const stream = await this.openai.chat.completions.create({
            model: "gpt-4",
            messages: [
                {
                    role: "system",
                    content: "You are a helpful banking assistant for Vision Bank. You help visitors with banking questions and services. Be friendly, professional, and informative."
                },
                ...this.conversationHistory
            ],
            stream: true
        });

        return stream;
    }

    addAssistantMessage(content: string) {
        this.conversationHistory.push({
            role: "assistant",
            content: content
        });
    }
}
