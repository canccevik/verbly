import { FileTypeValidator, MaxFileSizeValidator, ParseFilePipe } from '@nestjs/common'

export const UserPhotoPipe = new ParseFilePipe({
  validators: [
    new MaxFileSizeValidator({ maxSize: 20000 }),
    new FileTypeValidator({ fileType: /^image\/(png|jpeg|jpg)$/ })
  ]
})
