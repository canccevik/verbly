import { Test } from '@nestjs/testing'
import { createMock } from '@golevelup/ts-jest'
import { AccountService } from '../services'
import { VerifyAccountDto } from '../dto'
import { AccountController } from './account.controller'

describe('AccountController', () => {
  let accountController: AccountController
  let accountService: AccountService

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      controllers: [AccountController]
    })
      .useMocker(createMock)
      .compile()

    accountController = module.get<AccountController>(AccountController)
    accountService = module.get<AccountService>(AccountService)
  })

  it('should account controller to be defined', () => {
    // ASSERT
    expect(accountController).toBeDefined()
  })

  it('should account service to be defined', () => {
    // ASSERT
    expect(accountService).toBeDefined()
  })

  describe('verifyAccount', () => {
    it('should call verify account method from account service', async () => {
      // ARRANGE
      const verifyAccountDto: VerifyAccountDto = { email: 'johndoe@gmail.com', otpCode: '123456' }

      // ACT
      const result = await accountController.verifyAccount(verifyAccountDto)

      // ASSERT
      expect(result).toEqual(undefined)
      expect(accountService.verifyAccount).toBeCalledWith(verifyAccountDto)
    })
  })
})
