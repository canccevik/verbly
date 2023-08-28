import { ApiProperty } from '@nestjs/swagger'
import { IsJWT, IsNotEmpty, IsString } from 'class-validator'

export class ResetPasswordDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsJWT()
  public token: string

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  public password: string
}
