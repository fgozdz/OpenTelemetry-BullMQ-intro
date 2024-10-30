import { NodeSDK } from '@opentelemetry/sdk-node';
import { PeriodicExportingMetricReader, ConsoleMetricExporter } from '@opentelemetry/sdk-metrics';
import { ConsoleSpanExporter } from '@opentelemetry/sdk-trace-node';
import { PgInstrumentation } from '@opentelemetry/instrumentation-pg';
import { ExpressInstrumentation } from '@opentelemetry/instrumentation-express';
import { HttpInstrumentation } from '@opentelemetry/instrumentation-http';
import { IORedisInstrumentation } from '@opentelemetry/instrumentation-ioredis';

const sdk = new NodeSDK({
  serviceName: 'consumer',
  traceExporter: new ConsoleSpanExporter(),
  metricReader: new PeriodicExportingMetricReader({
    exporter: new ConsoleMetricExporter(),
  }),
  instrumentations: [
    new ExpressInstrumentation(),
    new HttpInstrumentation(),
    new PgInstrumentation(),
    new IORedisInstrumentation()
  ],
});

sdk.start();