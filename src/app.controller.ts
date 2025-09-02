import { Response } from 'express';

import { Body, Controller, Get, Header, Post, Res } from '@nestjs/common';

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
    async chat(@Body() dto: ChatMessageDto, @Res() res: Response) {
        try {
            // Set SSE headers
            res.setHeader("Content-Type", "text/event-stream");
            res.setHeader("Cache-Control", "no-cache");
            res.setHeader("Connection", "keep-alive");

            // Get the OpenAI stream from service
            const stream = await this.appService.create(dto);

            let assistantResponse = "";

            // Handle the streaming response
            for await (const chunk of stream) {
                const content = chunk.choices[0]?.delta?.content || "";
                if (content) {
                    assistantResponse += content;
                    res.write(`data: ${JSON.stringify({ content })}\n\n`);
                }
            }

            // Add the complete assistant response to conversation history
            if (assistantResponse) {
                this.appService.addAssistantMessage(assistantResponse);
            }

            // Send completion signal
            res.write(`data: [DONE]\n\n`);
            res.end();
        } catch (error) {
            console.error("Chat error:", error);
            res.status(500).json({ error: "Internal server error" });
        }
    }
}
