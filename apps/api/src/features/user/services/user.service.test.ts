import { Test } from '@nestjs/testing'
import { createMock } from '@golevelup/ts-jest'
import { UserRepository } from '@features/user/repositories'
import { UserDocument } from '@features/user/schemas'
import { UserService } from './user.service'
import { UpdateUserDto } from '../dto/update-user.dto'

describe('UserService', () => {
  let userService: UserService
  let userRepository: UserRepository

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      providers: [UserService]
    })
      .useMocker(createMock)
      .compile()

    userService = module.get<UserService>(UserService)
    userRepository = module.get<UserRepository>(UserRepository)
  })

  it('should user service to be defined', () => {
    // ASSERT
    expect(userService).toBeDefined()
  })

  it('should user repository to be defined', () => {
    // ASSERT
    expect(userRepository).toBeDefined()
  })

  describe('updateUser', () => {
    it('should update user', async () => {
      // ARRANGE
      const updateUserDto = { username: 'johndoe' } as UpdateUserDto
      const userMock = { id: 'id' } as UserDocument

      jest.spyOn(userRepository, 'findByIdAndUpdate').mockResolvedValue(userMock)

      // ACT
      const result = await userService.updateUser(updateUserDto, userMock.id)

      // ASSERT
      expect(result).toEqual(userMock)
      expect(userRepository.findByIdAndUpdate).toHaveBeenCalledWith(userMock.id, {
        $set: updateUserDto
      })
    })
  })
})
