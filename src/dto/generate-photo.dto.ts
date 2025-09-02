import { IsEnum, IsNotEmpty, IsString, MaxLength } from "class-validator";

import { Team } from "../common/enums";

export class GeneratePhotoDto {
    @IsString()
    @IsNotEmpty({ message: "name-is-required" })
    @MaxLength(12, { message: "name-must-be-less-than-12-characters" })
    name: string;

    @IsEnum(Team, { message: "invalid-team-selected" })
    team: Team;
}
