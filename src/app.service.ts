import { AccessToken } from 'livekit-server-sdk';
import OpenAI from 'openai';

import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { modelInstructions } from './common/model.instructions';
import { ChatMessageDto } from './dto/chat.message.dto';

@Injectable()
export class AppService {
    private readonly openai: OpenAI;
    private conversationOneId: string | null = null;
    private conversationTwoId: string | null = null;

    constructor(private readonly configService: ConfigService) {
        this.openai = new OpenAI({ apiKey: this.configService.get<string>("OPENAI_API_KEY") });
    }

    async chatOne(dto: ChatMessageDto) {
        // If isNewChat is true, create a new conversation
        if (dto.isNewChat) {
            const conversation = await this.openai.conversations.create({
                metadata: { topic: `chat_${new Date().toISOString()}` },
                items: [
                    {
                        type: "message",
                        role: "system",
                        content: modelInstructions
                    }
                ]
            });
            this.conversationOneId = conversation.id;
        }

        //  Create streaming response and attach create conversationId to maintain context
        const stream = await this.openai.responses.create({
            model: "gpt-5",
            conversation: this.conversationOneId,
            instructions: modelInstructions,
            input: dto.message,
            stream: true
        });

        // Return the stream
        return stream;
    }

    async chatTwo(dto: ChatMessageDto) {
        // If isNewChat is true, create a new conversation
        if (dto.isNewChat) {
            const conversation = await this.openai.conversations.create({
                metadata: { topic: `chat_${new Date().toISOString()}` },
                items: [
                    {
                        type: "message",
                        role: "system",
                        content: modelInstructions
                    }
                ]
            });
            this.conversationTwoId = conversation.id;
        }

        //  Create streaming response and attach create conversationId to maintain context
        const stream = await this.openai.responses.create({
            model: "gpt-5",
            conversation: this.conversationTwoId,
            instructions: modelInstructions,
            input: dto.message,
            stream: true
        });

        // Return the stream
        return stream;
    }

    async generateLivekitToken() {
        const participantIdentity = `user-${Math.random().toString(36).slice(2, 10)}`;

        // Create access token
        const accessToken = new AccessToken(this.configService.get<string>("LIVEKIT_API_KEY"), this.configService.get<string>("LIVEKIT_API_SECRET"));

        // Set access token configuration
        accessToken.identity = participantIdentity;
        accessToken.name = participantIdentity;
        accessToken.ttl = 5 * 60; // 5 minutes
        accessToken.addGrant({
            room: "vision-bank-money20",
            roomJoin: true,
            canPublish: true,
            canSubscribe: true
        });

        // Return the token
        const token = accessToken.toJwt();
        return token;
    }
}
