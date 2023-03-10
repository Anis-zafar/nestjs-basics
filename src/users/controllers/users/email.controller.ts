import { Controller } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
@Controller('email')
export class EmailController {
  constructor(private readonly emailService: MailerService) {}
}
