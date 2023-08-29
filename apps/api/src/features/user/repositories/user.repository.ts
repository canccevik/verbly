import { BaseRepository } from '@core/repositories'
import { User } from '../schemas/user.schema'
import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { FilterQuery, Model } from 'mongoose'
import bcrypt from 'bcrypt'

@Injectable()
export class UserRepository extends BaseRepository<User> {
  constructor(@InjectModel(User.name) private readonly userModel: Model<User>) {
    super(userModel)
  }

  public async comparePasswords(username: string, password: string): Promise<boolean> {
    const user = await this.userModel.findOne({ username }).select('+password')

    if (!user) {
      return false
    }
    return bcrypt.compareSync(password, user.password)
  }

  public async updatePassword(filter: FilterQuery<User>, password: string): Promise<void> {
    const hashedPassword = bcrypt.hashSync(password, 10)
    await this.userModel.updateOne(filter, { $set: { password: hashedPassword } })
  }
}
