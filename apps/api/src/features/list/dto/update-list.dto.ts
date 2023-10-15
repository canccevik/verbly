import { IsISO } from '@common/validators/is-iso.validator'
import { ApiProperty } from '@nestjs/swagger'
import { IsOptional, IsString, Length } from 'class-validator'

export class UpdateListDto {
  @ApiProperty()
  @IsOptional()
  @IsString()
  @Length(1, 50)
  public name?: string

  @ApiProperty()
  @IsOptional()
  @IsString()
  @IsISO()
  public wordLanguage?: string

  @ApiProperty()
  @IsOptional()
  @IsString()
  @IsISO()
  public meaningLanguage?: string

  @ApiProperty()
  @IsOptional()
  @IsString()
  @Length(1, 25)
  public icon?: string
}
