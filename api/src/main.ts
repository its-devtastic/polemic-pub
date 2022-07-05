import { NestFactory } from "@nestjs/core";
import { ValidationPipe } from "@nestjs/common";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import helmet from "helmet";

import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {});

  app.enableCors({ origin: "*", credentials: true });
  app.use(helmet());
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    })
  );

  const config = new DocumentBuilder()
    .setTitle("PolemicPub API")
    .setDescription(
      "<a href='https://github.com/its-devtastic/polemic-pub' target='_blank' rel='noreferrer noopener nofollow'>GitHub</a>"
    )
    .setVersion("1.0")
    .build();

  const document = SwaggerModule.createDocument(app, config, {
    include: [],
  });

  const options = {
    customSiteTitle: "PolemicPub API reference",
  };
  SwaggerModule.setup("doc", app, document, options);

  await app.listen(8000);
}

bootstrap();
