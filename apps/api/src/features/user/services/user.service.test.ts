import { Test } from '@nestjs/testing'
import { createMock } from '@golevelup/ts-jest'
import { UserRepository } from '@features/user/repositories'
import { UserDocument } from '@features/user/schemas'
import { UserService } from './user.service'
import { UpdateUserDto } from '../dto/update-user.dto'
import { UploadApiResponse } from 'cloudinary'
import { CloudinaryService } from '@modules/cloudinary/cloudinary.service'

describe('UserService', () => {
  let userService: UserService
  let userRepository: UserRepository
  let cloudinaryService: CloudinaryService

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      providers: [UserService]
    })
      .useMocker(createMock)
      .compile()

    userService = module.get<UserService>(UserService)
    userRepository = module.get<UserRepository>(UserRepository)
    cloudinaryService = module.get<CloudinaryService>(CloudinaryService)
  })

  it('should user service to be defined', () => {
    // ASSERT
    expect(userService).toBeDefined()
  })

  it('should user repository to be defined', () => {
    // ASSERT
    expect(userRepository).toBeDefined()
  })

  it('should cloudinary service to be defined', () => {
    // ASSERT
    expect(cloudinaryService).toBeDefined()
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

  describe('updateProfilePhoto', () => {
    it('should update profile photo of user', async () => {
      // ARRANGE
      const userMock = { id: 'id' } as UserDocument
      const fileMock = {} as Express.Multer.File
      const uploadedFileMock = { url: 'url' } as UploadApiResponse

      jest.spyOn(cloudinaryService, 'uploadFile').mockResolvedValue(uploadedFileMock)

      // ACT
      await userService.updateProfilePhoto(userMock.id, fileMock)

      // ASSERT
      expect(cloudinaryService.uploadFile).toHaveBeenCalledWith(fileMock, { folder: 'users' })
      expect(userRepository.updateOne).toHaveBeenCalledWith(
        { _id: userMock.id },
        { $set: { profilePhoto: uploadedFileMock.url } }
      )
    })
  })
})
