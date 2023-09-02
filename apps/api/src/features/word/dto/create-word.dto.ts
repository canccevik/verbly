import { ApiProperty } from '@nestjs/swagger'
import { IsEnum, IsNotEmpty, IsOptional, IsString, Length, Matches } from 'class-validator'
import { WordStatus } from '../schemas'

export class CreateWordDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Length(1, 50)
  @Matches(/^[\p{L}\s]+$/u, { message: 'only letters are allowed in the word' })
  public word: string

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Length(1, 50)
  @Matches(/^[\p{L}\s]+$/u, { message: 'only letters are allowed in the meaning' })
  public meaning: string

  @ApiProperty()
  @IsOptional()
  @IsString()
  @Length(1, 50)
  @Matches(/^[\p{L}\s]+$/u, { message: 'only letters are allowed in the pronunciation' })
  public pronunciation?: string

  @ApiProperty()
  @IsOptional()
  @IsEnum(WordStatus)
  public status?: number
}
