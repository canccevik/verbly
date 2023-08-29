import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString, Length } from 'class-validator'

export class UpdatePasswordDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  public oldPassword: string

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Length(6, 60)
  public newPassword: string
}
