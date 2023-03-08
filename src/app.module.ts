import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
// import { AuthModule } from './auth/auth.module';
import { JwtService } from '@nestjs/jwt';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    UsersModule,
    AuthModule,
    MongooseModule.forRoot(
      'mongodb+srv://anis:emQU0pSShON62Mvn@cluster0.lrwwihu.mongodb.net/?retryWrites=true&w=majority',
    ),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
