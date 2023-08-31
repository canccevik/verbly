import { IsISO } from '@common/validators/is-iso.validator'
import { ApiProperty } from '@nestjs/swagger'
import { IsHexColor, IsNotEmpty, IsString, Length } from 'class-validator'

export class CreateListDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Length(1, 50)
  public name: string

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @IsISO()
  public wordLanguage: string

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @IsISO()
  public meaningLanguage: string

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Length(1, 25)
  public icon: string

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @IsHexColor()
  public color: string
}
