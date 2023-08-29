import { Config, ENV } from '@config/index'
import { Provider } from '@nestjs/common'
import { v2 } from 'cloudinary'

export const CLOUDINARY = 'Cloudinary'

export const CloudinaryProvider: Provider = {
  provide: CLOUDINARY,
  useFactory: (config: Config) => {
    return v2.config({
      cloud_name: config.CLOUDINARY_CLOUD_NAME,
      api_key: config.CLOUDINARY_API_KEY,
      api_secret: config.CLOUDINARY_API_SECRET
    })
  },
  inject: [ENV]
}
