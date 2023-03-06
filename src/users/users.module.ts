import { Module, NestModule, RequestMethod } from '@nestjs/common';
import { MiddlewareConsumer } from '@nestjs/common/interfaces/middleware';
import { UsersController } from './controllers/users/users.controller';
import { AnotherMiddleware } from './middleware/example/another.middleware';
import { ExampleMiddleware } from './middleware/example/example.middleware';
import { UsersService } from './services/users/users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './users.models';
@Module({
  imports: [MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AnotherMiddleware).forRoutes(UsersController);
  }
}
