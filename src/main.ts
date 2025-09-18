import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

let appServer: any;

async function bootstrap() {
  if (!appServer) {
    const app = await NestFactory.create(AppModule);
    app.enableCors({
      origin: '*',
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      allowedHeaders: 'Content-Type, Accept',
    });

    app.setGlobalPrefix('/api/v1');
    app.useGlobalPipes(new ValidationPipe());
    // await app.init();
    appServer = app.getHttpAdapter().getInstance(); // Express instance
  }
  return appServer;
}

// ✅ Vercel yêu cầu default export
export default async function handler(req: any, res: any) {
  const appServer = await bootstrap();
  return appServer(req, res); // Trả về Express app
}
// import { NestFactory } from '@nestjs/core';
// import { AppModule } from './app.module';
// import { ValidationPipe } from '@nestjs/common';

// async function bootstrap() {
//   const app = await NestFactory.create(AppModule);

//   app.enableCors({
//     origin: '*',
//     methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
//     allowedHeaders: 'Content-Type, Accept',
//   });

//   app.setGlobalPrefix('/api/v1');
//   app.useGlobalPipes(new ValidationPipe());

//   await app.listen(3333);
//   console.log(`🚀 Server is running on http://localhost:3333`);
// }
// bootstrap();
