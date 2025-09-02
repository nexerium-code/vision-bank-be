import OpenAI from 'openai';

import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { ChatMessageDto } from './dto/chat.message.dto';

// import { TeamColor } from './common/enums';

@Injectable()
export class AppService {
    private readonly openai: OpenAI;

    constructor(private readonly configService: ConfigService) {
        this.openai = new OpenAI({
            apiKey: this.configService.get<string>("OPENAI_API_KEY")
        });
    }

    async create(dto: ChatMessageDto) {
        const response = await this.openai.responses.create({
            model: "gpt-5",
            instructions: "You are a helpful assistant.",
            input: dto.message,
            stream: true
        });

        let fullResponse = "";
        const chunks: string[] = [];

        try {
            // Collect all streaming chunks
            for await (const chunk of response) {
                if (chunk.type === "response.output_text.delta") {
                    fullResponse += chunk.delta;
                    chunks.push(chunk.delta);
                }
            }

            return {
                success: true,
                message: fullResponse,
                chunks: chunks,
                timestamp: new Date().toISOString()
            };
        } catch (error) {
            console.error("OpenAI streaming error:", error);
            throw new Error("Failed to generate response");
        }
    }
}
