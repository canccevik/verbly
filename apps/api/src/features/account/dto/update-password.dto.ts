import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsOptional, IsString, Length } from 'class-validator'

export class UpdatePasswordDto {
  @ApiProperty()
  @IsOptional()
  @IsString()
  public oldPassword: string

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Length(6, 60)
  public newPassword: string
}
