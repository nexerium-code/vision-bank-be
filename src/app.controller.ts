import { Response } from 'express';

import { Body, Controller, Get, Post, Res } from '@nestjs/common';

import { AppService } from './app.service';
import { ChatMessageDto } from './dto/chat.message.dto';

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {}

    @Get("health")
    getHealth() {
        return "Vision Bank backend is running!";
    }

    @Post("/chat-one")
    async chatOne(@Body() dto: ChatMessageDto, @Res() res: Response) {
        try {
            // Set SSE headers
            res.setHeader("Content-Type", "text/event-stream");
            res.setHeader("Cache-Control", "no-cache");
            res.setHeader("Connection", "keep-alive");

            // Get the OpenAI stream from service
            const stream = await this.appService.chatOne(dto);

            // Handle the streaming response
            for await (const chunk of stream) {
                if (chunk.type === "response.output_text.delta") {
                    res.write(`data: ${JSON.stringify({ content: chunk.delta })}\n\n`);
                }
            }

            // Send completion signal
            res.write(`data: [DONE]\n\n`);
            res.end();
        } catch (error) {
            console.error("Chat error:", error);
            res.status(500).json({ error: "Internal server error" });
        }
    }

    @Post("/chat-two")
    async chatTwo(@Body() dto: ChatMessageDto, @Res() res: Response) {
        try {
            // Set SSE headers
            res.setHeader("Content-Type", "text/event-stream");
            res.setHeader("Cache-Control", "no-cache");
            res.setHeader("Connection", "keep-alive");

            // Get the OpenAI stream from service
            const stream = await this.appService.chatTwo(dto);

            // Handle the streaming response
            for await (const chunk of stream) {
                if (chunk.type === "response.output_text.delta") {
                    res.write(`data: ${JSON.stringify({ content: chunk.delta })}\n\n`);
                }
            }

            // Send completion signal
            res.write(`data: [DONE]\n\n`);
            res.end();
        } catch (error) {
            console.error("Chat error:", error);
            res.status(500).json({ error: "Internal server error" });
        }
    }

    @Post("/livekit-token")
    async livekitToken() {
        return await this.appService.livekitToken();
    }
}
