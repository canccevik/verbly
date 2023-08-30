import { ApiProperty } from '@nestjs/swagger'
import { IsISO } from '@common/validators/is-iso.validator'
import { IsFieldTakenOfUser } from '@common/validators/is-field-taken-of-user.validator'
import { Gender } from '@features/user/schemas/user.schema'
import {
  IsEmail,
  IsEnum,
  IsLowercase,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  Matches
} from 'class-validator'

export class RegisterDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @IsLowercase()
  @Length(3, 20)
  @Matches(/^[a-z0-9]+$/, { message: 'username is not valid' })
  @IsFieldTakenOfUser('username')
  public username: string

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Length(6, 60)
  public password: string

  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  @IsFieldTakenOfUser('email')
  public email: string

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @IsISO()
  public nativeLanguage: string

  @ApiProperty()
  @IsOptional()
  @IsEnum(Gender)
  public gender: number
}
