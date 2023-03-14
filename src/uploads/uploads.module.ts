import { Module } from '@nestjs/common';
import { uploadController } from './upload.controller';
import { uploadService } from './upload.service';

@Module({
  imports: [],
  controllers: [uploadController],
  providers: [uploadService],
})
export class UploadsModule {}
