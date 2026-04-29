import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';
import { Request, Response } from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: ['http://localhost:3000'],
    credentials: true,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  const openApiPath = '/api/openapi.json';

  const config = new DocumentBuilder()
    .setTitle('Concert Ticket API')
    .setDescription('Full-stack developer assignment API')
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        in: 'header',
      },
      'access-token',
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('docs', app, document);

  app.getHttpAdapter().get(openApiPath, (_req: Request, res: Response) => {
    res.json(document);
  });

  const port = process.env.PORT ?? 3005;
  await app.listen(port);

  Logger.log(`🚀 Concert Ticket API is running on: http://localhost:${port}`);
}

void bootstrap();
