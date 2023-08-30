import { Injectable } from '@nestjs/common'
import { UserRepository } from '../repositories'
import { UpdateUserDto } from '../dto/update-user.dto'
import { UserDocument } from '../schemas'
import { CloudinaryService } from '@modules/cloudinary/cloudinary.service'

@Injectable()
export class UserService {
  constructor(
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
}
