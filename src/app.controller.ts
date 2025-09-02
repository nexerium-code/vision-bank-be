import { Controller, Get } from '@nestjs/common';

import { AppService } from './app.service';

// import { GeneratePhotoDto } from './dto/generate-photo.dto';

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {}

    @Get("health")
    getHealth() {
        return "Vision Bank backend is running!";
    }

    // @Post("/chat")
    // async generatePhoto(@Body() dto: GeneratePhotoDto) {
    //     return await this.appService.generatePhoto(dto);
    // }
}
