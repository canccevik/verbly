import { IsFieldTakenOfUser } from '@common/validators/is-field-taken-of-user.validator'
import { IsISO } from '@common/validators/is-iso.validator'
import { ApiProperty } from '@nestjs/swagger'
import { IsEnum, IsLowercase, IsOptional, IsString, Length, Matches } from 'class-validator'
import { Gender } from '../schemas'

export class UpdateUserDto {
  @ApiProperty()
  @IsOptional()
  @IsString()
  @IsLowercase()
  @Length(3, 20)
  @Matches(/^[a-z0-9]+$/, { message: 'username is not valid' })
  @IsFieldTakenOfUser('username')
  public username: string

  @ApiProperty()
  @IsOptional()
  @IsString()
  @IsISO()
  public nativeLanguage: string

  @ApiProperty()
  @IsOptional()
  @IsEnum(Gender)
  public gender: number
}
