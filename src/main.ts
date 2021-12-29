import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
const PORT = process.env.PORT || 3000
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors(
    {origin: [
      'http://localhost:4200', 'http://localhost:4201','https://fenixsms.herokuapp.com'
    ]}
  );
  await app.listen(PORT).then(() => {
    console.log(`Fenix SMS chat server is running on port ${PORT}`)
  })
  .catch((error: any) => console.log(error))
}
bootstrap();