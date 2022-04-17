import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.listen(3010).then(() => {
    console.log('[Purchase] HTTP server is running.')
  });
}
bootstrap();
