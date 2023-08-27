import { Test } from '@nestjs/testing'
import { createMock } from '@golevelup/ts-jest'
import { AuthService } from '../services'
import { UserRepository } from '@features/user/repositories'
import { OTPRepository } from '../repositories'
import { Queue } from 'bull'
import { getQueueToken } from '@nestjs/bull'
import { MAIL_QUEUE, VERIFICATION } from '@modules/mail/mail.constant'
import { RegisterDto, VerifyAccountDto } from '../dto'
import { UserDocument } from '@features/user/schemas'
import otpGenerator from 'otp-generator'
import { OTPDocument } from '../schemas'
import { BadRequestException } from '@nestjs/common'

describe('AuthService', () => {
  let authService: AuthService
  let userRepository: UserRepository
  let otpRepository: OTPRepository
  let mailQueue: Queue

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: getQueueToken(MAIL_QUEUE), useValue: createMock<Queue>() }
      ]
    })
      .useMocker(createMock)
      .compile()

    authService = module.get<AuthService>(AuthService)
    userRepository = module.get<UserRepository>(UserRepository)
    otpRepository = module.get<OTPRepository>(OTPRepository)
    mailQueue = module.get<Queue>(getQueueToken(MAIL_QUEUE))
  })

  it('should auth service to be defined', () => {
    // ASSERT
    expect(authService).toBeDefined()
  })

  it('should user repository to be defined', () => {
    // ASSERT
    expect(userRepository).toBeDefined()
  })

  it('should otp repository to be defined', () => {
    // ASSERT
    expect(otpRepository).toBeDefined()
  })

  it('should mail queue to be defined', () => {
    // ASSERT
    expect(mailQueue).toBeDefined()
  })

  describe('register', () => {
    it('should create otp and user then call mail queue', async () => {
      // ARRANGE
      const userMock = {
        username: 'johndoe',
        email: 'johndoe@gmail.com',
        password: 'john123'
      } as UserDocument

      const otpCode = '123456'
      jest.spyOn(otpGenerator, 'generate').mockReturnValue(otpCode)
      jest.spyOn(userRepository, 'create').mockResolvedValue(userMock)

      // ACT
      const result = await authService.register(userMock as RegisterDto)

      // ASSERT
      expect(userRepository.create).toHaveBeenCalledWith(userMock)
      expect(result.password).toBeUndefined()
      expect(result).toEqual(userMock)
      expect(mailQueue.add).toHaveBeenCalledWith(VERIFICATION, { email: userMock.email, otpCode })
    })
  })

  describe('verifyAccount', () => {
    it('should verify user when otp found', async () => {
      // ARRANGE
      const verifyAccountDto: VerifyAccountDto = {
        email: 'johndoe@gmail.com',
        otpCode: '123456'
      }
      const otpMock = { id: 'id', ...verifyAccountDto } as OTPDocument

      jest.spyOn(otpRepository, 'findOne').mockResolvedValue(otpMock)

      // ACT
      const result = await authService.verifyAccount(verifyAccountDto)

      // ASSERT
      expect(result).toBeUndefined()
      expect(otpRepository.findOne).toHaveBeenCalledWith({
        email: otpMock.email,
        otpCode: otpMock.otpCode
      })
      expect(otpRepository.findByIdAndDelete).toHaveBeenCalledWith(otpMock.id)
      expect(userRepository.updateOne).toHaveBeenCalledWith(
        { email: verifyAccountDto.email },
        { $set: { isEmailConfirmed: true } }
      )
    })

    it('should throw bad request error when otp not found', async () => {
      // ARRANGE
      const verifyAccountDto: VerifyAccountDto = {
        email: 'johndoe@gmail.com',
        otpCode: '123456'
      }

      jest.spyOn(otpRepository, 'findOne').mockResolvedValue(null)

      // ACT & ASSERT
      expect(authService.verifyAccount(verifyAccountDto)).rejects.toThrowError(
        new BadRequestException('Email or OTP code is not correct.')
      )
    })
  })

  describe('validateUser', () => {
    it('should validate and return user when credentials are correct', async () => {
      // ARRANGE
      const userMock = {
        username: 'johndoe',
        email: 'johndoe@gmail.com',
        password: 'johndoe123'
      } as UserDocument

      jest.spyOn(userRepository, 'findOne').mockResolvedValue(userMock)
      jest.spyOn(userRepository, 'comparePasswords').mockResolvedValue(true)

      // ACT
      const result = await authService.validateUser(userMock.username, userMock.password)

      // ASSERT
      expect(result).toEqual(userMock)
      expect(userRepository.findOne).toHaveBeenCalledWith({ username: userMock.username })
      expect(userRepository.comparePasswords).toHaveBeenCalledWith(
        userMock.username,
        userMock.password
      )
    })

    it('should return null when credentials are not correct', async () => {
      // ARRANGE
      const userMock = {
        username: 'johndoe',
        email: 'johndoe@gmail.com',
        password: 'johndoe123'
      } as UserDocument

      jest.spyOn(userRepository, 'findOne').mockResolvedValue(null)
      jest.spyOn(userRepository, 'comparePasswords').mockResolvedValue(false)

      // ACT
      const result = await authService.validateUser(userMock.username, userMock.password)

      // ASSERT
      expect(result).toBe(null)
      expect(userRepository.findOne).toHaveBeenCalledWith({ username: userMock.username })
      expect(userRepository.comparePasswords).toHaveBeenCalledWith(
        userMock.username,
        userMock.password
      )
    })
  })
})
