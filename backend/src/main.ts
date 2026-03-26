import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { readFileSync } from 'fs';
import { join } from 'path';
import { AppModule } from './app.module';

import { apiReference } from '@scalar/nestjs-api-reference';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );

  const openapiPath = join(
    __dirname,
    '../../shared/tsp-output/@typespec/openapi3/openapi.json',
  );

  const fileContent = readFileSync(openapiPath, 'utf8');
  const openapiDocument = JSON.parse(fileContent) as Record<string, unknown>;

  app.use(
    '/api',
    apiReference({
      theme: 'default',
      // @ts-expect-error: The official Scalar types for NestJS do not yet include the 'spec' property
      spec: {
        content: openapiDocument,
      },
      withFastify: true,
    }),
  );

  await app.listen(3000, '0.0.0.0');
  console.log(`Application is running on: http://localhost:3000/api`);
}

void bootstrap();
