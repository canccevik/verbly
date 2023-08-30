import { Test } from '@nestjs/testing'
import { createMock } from '@golevelup/ts-jest'
import { UserController } from './user.controller'
import { UserService } from '../services'
import { UpdateUserDto } from '../dto/update-user.dto'
import { UserDocument } from '../schemas'

describe('UserController', () => {
  let userController: UserController
  let userService: UserService

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      controllers: [UserController]
    })
      .useMocker(createMock)
      .compile()

    userController = module.get<UserController>(UserController)
    userService = module.get<UserService>(UserService)
  })

  it('should user controller to be defined', () => {
    // ASSERT
    expect(userController).toBeDefined()
  })

  it('should user service to be defined', () => {
    // ASSERT
    expect(userService).toBeDefined()
  })

  describe('updateUser', () => {
    it('should call update user method from user service', async () => {
      // ARRANGE
      const updateUserDto = { username: 'johndoe' } as UpdateUserDto
      const userMock = { id: 'id' } as UserDocument

      jest.spyOn(userService, 'updateUser').mockResolvedValue(userMock)

      // ACT
      const result = await userController.updateUser(updateUserDto, userMock.id)

      // ASSERT
      expect(result).toEqual(userMock)
      expect(userService.updateUser).toBeCalledWith(updateUserDto, userMock.id)
    })
  })

  describe('updateProfilePhoto', () => {
    it('should call update profile photo method from user service', async () => {
      // ARRANGE
      const userMock = { id: 'id' } as UserDocument
      const fileMock = {} as Express.Multer.File

      // ACT
      const result = await userController.updateProfilePhoto(userMock.id, fileMock)

      // ASSERT
      expect(result).toBeUndefined()
      expect(userService.updateProfilePhoto).toBeCalledWith(userMock.id, fileMock)
    })
  })
})
