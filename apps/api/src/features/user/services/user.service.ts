import { Injectable } from '@nestjs/common'
import { UserRepository } from '../repositories'
import { UpdateUserDto } from '../dto/update-user.dto'
import { UserDocument } from '../schemas'

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  public async updateUser(dto: UpdateUserDto, userId: string): Promise<UserDocument> {
    return this.userRepository.findByIdAndUpdate(userId, { $set: dto })
  }
}
