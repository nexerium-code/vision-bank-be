import OpenAI from 'openai';

import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

// import { TeamColor } from './common/enums';
// import { GeneratePhotoDto } from './dto/generate-photo.dto';

@Injectable()
export class AppService {
    private readonly openai: OpenAI;

    constructor(private readonly configService: ConfigService) {
        this.openai = new OpenAI({
            apiKey: this.configService.get<string>("OPENAI_API_KEY")
        });
    }

    // async generatePhoto(dto: GeneratePhotoDto) {
    //     // Make sure the image is a PNG
    //     const pngBuffer = await sharp(image.buffer).png().toBuffer();
    //     // Create a new File object
    //     const file = new File([pngBuffer], `image.png`, { type: "image/png" });

    //     const prompt = [
    //         "CHECKLIST:",
    //         "1. Identify the main person (one person) in the supplied photograph.",
    //         "2. Preserve every facial feature exactly (one-to-one match as real as possible); keep the full head visible.",
    //         "3. Center the character and leave ~15 % canvas height clear above the head.",
    //         "4. Replicate and futurize any headwear/eyewear; if none, leave head uncovered.",
    //         "5. Set background to pure white (#FFFFFF) with full transparency (alpha).",
    //         "6. Costume design:",
    //         "   • Male: respectful and fun futuristic game character attire; be creative.",
    //         "   • Female: strictly modest, abaya-inspired outfit (flowing hooded mantle, high collar, fully opaque, non-form-fitting) with luminous embroidery/tech panels.",
    //         `   • Colour accent: fully solid ${TeamColor[dto.team]} with no gradients.`,
    //         "7. Pose: confident, heroic, respectful; no weapons or aggressive gestures.",
    //         "8. Style: Valorant-grade cinematic cyberpunk, polished AAA concept-art finish.",
    //         "9. Export: waist-up composition only; strictly follow every checkpoint above."
    //     ].join("\n");

    //     // Call OpenAI edit endpoint
    //     const editResponse = await this.openai.images.edit({
    //         model: "gpt-image-1",
    //         image: file,
    //         prompt: prompt,
    //         background: "transparent",
    //         quality: "medium",
    //         size: "1024x1024"
    //     });

    //     // Convert base64 PNG to Buffer
    //     const b64 = editResponse.data[0]?.b64_json;
    //     const generatedBuffer = Buffer.from(b64, "base64");

    //     // Upload to S3 and get URL
    //     const url = await this.s3Service.uploadImage(generatedBuffer, dto.name, dto.team);

    //     const result = {
    //         name: dto.name,
    //         team: dto.team,
    //         image: url
    //     };

    //     // Return result
    //     return result;
    // }
}
