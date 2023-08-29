import { Injectable } from '@nestjs/common'
import { UploadApiErrorResponse, UploadApiOptions, UploadApiResponse, v2 } from 'cloudinary'
import toStream from 'buffer-to-stream'

@Injectable()
export class CloudinaryService {
  public async uploadFile(
    file: Express.Multer.File,
    options?: UploadApiOptions
  ): Promise<UploadApiResponse | UploadApiErrorResponse> {
    return new Promise((resolve, reject) => {
      const upload = v2.uploader.upload_stream(options, (error, result) => {
        if (error) {
          return reject(error)
        }
        resolve(result)
      })
      toStream(file.buffer).pipe(upload)
    })
  }

  public async deleteFile(fileId: string): Promise<void> {
    await v2.uploader.destroy(fileId)
  }
}
