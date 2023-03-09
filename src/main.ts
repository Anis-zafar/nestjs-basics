import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { SwaggerService } from './shared/swagger.service';
import { UsersModule } from './users/users.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('User CRUD')
    .setDescription('The user APIs')
    .setVersion('3.0')
    .addBearerAuth()
    // .addTag('User')
    // .addTag('emp')
    .build();
  // new SwaggerService('api', app, config).init();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const port = 3000;
  await app.listen(port, () => {
    Logger.log('application in listening on port ' + port);
  });
}
bootstrap();
