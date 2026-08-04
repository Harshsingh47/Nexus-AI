import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const allowedOrigins = process.env.FRONTEND_URL 
    ? [process.env.FRONTEND_URL, 'http://localhost:3000', 'https://nexus-ai-web.vercel.app']
    : '*';

  app.enableCors({
    origin: allowedOrigins,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
  });

  app.setGlobalPrefix('api', { exclude: ['/'] });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true
    })
  );

  const config = new DocumentBuilder()
    .setTitle('NexusMind AI - Enterprise Autonomous Agent Platform API')
    .setDescription('REST & WebSocket API for Multi-Agent Orchestration, Workflow Engine, RAG Knowledge Base, Playwright Automation, and Credit Metering.')
    .setVersion('1.0.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  const port = process.env.PORT || 4000;
  await app.listen(port);
  console.log(`🚀 NexusMind Server running on port ${port}`);
}
bootstrap();
