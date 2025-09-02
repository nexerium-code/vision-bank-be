import { Transform } from 'class-transformer';
import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class ChatMessageDto {
    @Transform(({ value }) => (typeof value === "string" ? value.trim() : value))
    @IsString()
    @IsNotEmpty({ message: "message-is-required" })
    @MinLength(1, { message: "message-is-required" }) // catches whitespace-only after trim
    @MaxLength(4000, { message: "message-too-long" })
    message: string;
}
