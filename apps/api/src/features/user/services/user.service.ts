import { Inject, Injectable } from '@nestjs/common'
import { UserRepository } from '../repositories'
import { UpdateUserDto } from '../dto/update-user.dto'
import { UserDocument } from '../schemas'
import { CloudinaryService } from '@modules/cloudinary/cloudinary.service'
import { Config, ENV } from '@config/index'

@Injectable()
export class UserService {
  constructor(
    @Inject(ENV) private readonly config: Config,
    private readonly userRepository: UserRepository,
    private readonly cloudinaryService: CloudinaryService
  ) {}

  public async updateUser(dto: UpdateUserDto, userId: string): Promise<UserDocument> {
    return this.userRepository.findByIdAndUpdate(userId, { $set: dto })
  }

  public async updateProfilePhoto(userId: string, file: Express.Multer.File): Promise<void> {
    const uploadedPhoto = await this.cloudinaryService.uploadFile(file, { folder: 'users' })
    await this.userRepository.updateOne(
      { _id: userId },
      { $set: { profilePhoto: uploadedPhoto.url } }
    )
  }

  public async removeProfilePhoto(user: UserDocument): Promise<void> {
    const fileId = user.profilePhoto.match(/\/([^/]+)\.[^/]+$/)[1]
    await this.cloudinaryService.deleteFile(`users/${fileId}`)

    await this.userRepository.updateOne(
      { _id: user.id },
      { $set: { profilePhoto: this.config.DEFAULT_PROFILE_PHOTO } }
    )
  }
}
