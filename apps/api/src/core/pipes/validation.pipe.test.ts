import { IsString } from 'class-validator'
import { ValidationPipe } from './validation.pipe'
import { ArgumentMetadata, BadRequestException } from '@nestjs/common'

class RegisterDto {
  @IsString()
  public username: unknown

  @IsString()
  public password: unknown
}

describe('ValidationPipe', () => {
  let validationPipe: ValidationPipe<RegisterDto>

  const metatype: ArgumentMetadata = { metatype: RegisterDto, type: 'custom' }

  beforeEach(() => {
    validationPipe = new ValidationPipe()
  })

  it('should return the value when dto is valid', async () => {
    // ARRANGE
    const value: RegisterDto = {
      username: 'johndoe',
      password: 'johndoe123'
    }

    // ACT
    const result = await validationPipe.transform(value, metatype)

    // ASSERT
    expect(result).toEqual(value)
  })

  it('should return the value when value is a primitive type', async () => {
    // ARRANGE
    const value = 'test'

    // ACT
    const result = await validationPipe.transform(value as unknown as RegisterDto, metatype)

    // ASSERT
    expect(result).toEqual(value)
  })

  it('should throw error when dto is not valid', async () => {
    // ARRANGE
    const value: RegisterDto = {
      username: 1,
      password: {}
    }

    // ACT
    const validate = async (): Promise<RegisterDto> => {
      return validationPipe.transform(value, metatype)
    }

    // ASSERT
    expect(validate).rejects.toThrow(BadRequestException)
  })
})
