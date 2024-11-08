# OpenTelemetry-BullMQ-intro
This project is a companion repository for a tutorial that demonstrates how to build a simple newsletter system using BullMQ for background job processing, OpenTelemetry for performance monitoring and tracing, and the BullMQ-otel package for integrating these two powerful tools.

## Motivation
I wanted to create a practical example that shows how to use OpenTelemetry and BullMQ-otel to monitor and trace jobs in a BullMQ queue within a real-world application context.

Many tutorials focus on the basics of BullMQ and OpenTelemetry, but they often lack concrete examples of how to use them together in a real project. This project aims to fill that gap by providing a step-by-step guide on how to integrate these tools into a newsletter system.

## What you'll find in this repository
- A simple newsletter application written in Node.js.
- Implementation of a job queue using BullMQ to send emails.
- Integration of OpenTelemetry for tracing and monitoring jobs.
- Usage of the BullMQ-otel library to connect BullMQ with OpenTelemetry.
- Configuration of Jaeger for visualizing traces.