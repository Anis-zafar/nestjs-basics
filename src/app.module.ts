import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
// import { ClientsModule, Transport } from '@nestjs/microservices';
import { MailerModule } from '@nestjs-modules/mailer';
import { EmailController } from './users/controllers/users/email.controller';
@Module({
  imports: [
    UsersModule,
    AuthModule,
    MongooseModule.forRoot(
      'mongodb+srv://anis:emQU0pSShON62Mvn@cluster0.lrwwihu.mongodb.net/?retryWrites=true&w=majority',
    ),
    // ClientsModule.register([
    //   {
    //     name: 'Mail',
    //     transport: Transport.TCP,
    //   },
    // ]),
    MailerModule.forRoot({
      transport: {
        host: 'smtp.ethereal.email',
        auth: {
          user: 'cooper.swaniawski95@ethereal.email',
          pass: 'nFNJ1A5f9cfwtsSK5U',
        },
      },
    }),
  ],
  controllers: [EmailController],
  providers: [],
})
export class AppModule {}
