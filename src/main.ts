import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { UsersModule } from './users/users.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('User CRUD')
    .setDescription('The user API')
    .setVersion('1.0.0')
    .addBearerAuth()
    // .addTag('User')
    // .addTag('emp')
    .build();
  const document = SwaggerModule.createDocument(app, config, {
    include: [UsersModule],
  });
  SwaggerModule.setup('api', app, document);

  const port = 3000;
  await app.listen(port, () => {
    Logger.log('application in listening on port ' + port);
  });
}
bootstrap();
