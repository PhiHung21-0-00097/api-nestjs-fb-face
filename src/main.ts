import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { Callback, Context, Handler } from 'aws-lambda';
import serverlessExpress from '@vendia/serverless-express';

let server: Handler;

async function bootstrap(): Promise<Handler> {
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

const handler: Handler = async (
  event: any,
  context: Context,
  callback: Callback,
) => {
  const server = await bootstrap();
  return server(event, context, callback);
};

// ✅ Xuất default cho Vercel
export default handler;
