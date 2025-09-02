import OpenAI from 'openai';

import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { ChatMessageDto } from './dto/chat.message.dto';

interface ConversationMessage {
    role: "system" | "user" | "assistant";
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

        // Initialize with system message
        this.conversationHistory = [
            {
                role: "system",
                content: "You are a helpful assistant. Answer shortly, professionaly and respectively."
            }
        ];
    }

    async create(dto: ChatMessageDto) {
        // If isNewChat is true, reset conversation history (keep system message)
        if (dto.isNewChat) {
            this.conversationHistory = [
                {
                    role: "system",
                    content: "You are a helpful assistant. Answer shortly, professionaly and respectively."
                }
            ];
        }

        // Add user message to conversation history
        this.conversationHistory.push({
            role: "user",
            content: dto.message
        });

        // Create streaming chat completion with full conversation context
        const stream = await this.openai.responses.create({
            model: "gpt-5",
            input: this.conversationHistory,
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
