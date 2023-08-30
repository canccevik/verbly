import { Module } from '@nestjs/common'
import { UserService } from './services/user.service'
import { UserController } from './controllers/user.controller'
import { UserRepository } from './repositories/user.repository'
import { MongooseModule } from '@nestjs/mongoose'
import { User, UserSchema } from './schemas/user.schema'
import { CloudinaryModule } from '@modules/cloudinary/cloudinary.module'

@Module({
  imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]), CloudinaryModule],
  controllers: [UserController],
  providers: [UserService, UserRepository],
  exports: [UserRepository]
})
export class UserModule {}
