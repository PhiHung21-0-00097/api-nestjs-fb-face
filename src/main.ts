import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import serverlessExpress from '@vendia/serverless-express';

let server: any;

async function bootstrap() {
  if (!server) {
    const app = await NestFactory.create(AppModule);
    app.enableCors({
      origin: '*',
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      allowedHeaders: 'Content-Type, Accept',
    });
    app.useGlobalPipes(new ValidationPipe());
    await app.init();

    const expressApp = app.getHttpAdapter().getInstance();
    server = serverlessExpress({ app: expressApp });
  }
  return server;
}

// 👇 Vercel yêu cầu default export phải là 1 function
export default async function handler(req: any, res: any) {
  const server = await bootstrap();
  return server(req, res);
}
