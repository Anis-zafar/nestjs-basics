import { Module, NestModule } from '@nestjs/common';
import { MiddlewareConsumer } from '@nestjs/common/interfaces/middleware';
import { UsersController } from './controllers/users/users.controller';
import { AnotherMiddleware } from './middleware/example/another.middleware';
import { ConfigService } from '@nestjs/config';
// import { ExampleMiddleware } from './middleware/example/example.middleware';
import { UsersService } from './services/users/users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './users.models';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { AuthModule } from 'src/auth/auth.module';
import { RequestMethod } from '@nestjs/common/enums';
// import { jwtConstants } from '../constants/constant';
// import { AuthService } from 'src/auth/auth.service';
@Module({
  imports: [MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])],
  controllers: [UsersController],
  providers: [UsersService, JwtService],
  exports: [UsersService],
})
export class UsersModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AnotherMiddleware)
      .forRoutes(
        { path: 'users', method: RequestMethod.GET },
        { path: 'users/delete/:id', method: RequestMethod.DELETE },
        { path: 'users/update/:id', method: RequestMethod.PATCH },
        { path: 'users/create', method: RequestMethod.POST },
      );
  }
}
