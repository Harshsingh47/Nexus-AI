import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: '*',
    credentials: true
  });

  // Set global API prefix but exclude root '/' so health check works at https://domain.com/
  app.setGlobalPrefix('api', { exclude: ['/'] });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: false
    })
  );

  const config = new DocumentBuilder()
    .setTitle('NexusMind AI - Enterprise Autonomous Agent Platform API')
    .setDescription('REST & GraphQL API for Multi-Agent Orchestration, Workflow Engine, RAG Knowledge Base, Playwright Automation, and Subscription Credit Metering.')
    .setVersion('1.0.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  const port = process.env.PORT || 4000;
  await app.listen(port);
  console.log(`🚀 NexusMind Enterprise Server running on http://localhost:${port}`);
  console.log(`📚 OpenAPI / Swagger Documentation available on http://localhost:${port}/api/docs`);
}
bootstrap();
