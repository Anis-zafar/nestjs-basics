import { DynamicModule, Module, Options } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ClientsModule, Transport } from '@nestjs/microservices';
@Module({
  imports: [
    UsersModule,
    AuthModule,
    MongooseModule.forRoot(
      'mongodb+srv://anis:emQU0pSShON62Mvn@cluster0.lrwwihu.mongodb.net/?retryWrites=true&w=majority',
    ),
    ClientsModule.register([
      {
        name: 'Mail',
        transport: Transport.TCP,
      },
    ]),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
