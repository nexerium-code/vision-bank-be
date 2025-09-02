import { IsNotEmpty, IsString, IsUrl } from 'class-validator';

export class PublishImageDto {
    @IsString({ message: "invalid-image-url" })
    @IsNotEmpty({ message: "invalid-image-url" })
    @IsUrl({ protocols: ["https"], require_tld: false }, { message: "invalid-image-url" })
    imageUrl: string;
}
