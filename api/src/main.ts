import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Active CORS pour le frontend
  app.enableCors({
    origin: "https://hub-simulation.strigidev.fr",
    credentials: true,
  });
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
