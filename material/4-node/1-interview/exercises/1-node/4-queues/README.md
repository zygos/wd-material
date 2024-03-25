# Queue Implementation Exercise in Node.js with TypeScript

## Overview

In this exercise, you will implement your own queue to manage document generation requests efficiently. This exercise is divided into three files, plus a solution file.

## Files

- `0-issue.ts`: Demonstrates the problem with handling multiple requests simultaneously without a queue.
- `1-queueUsage.ts`: Introduces the usage of a queue and a worker to process document generation requests one at a time.
- `1-queue.ts`: Where you will implement the `Queue` and `Worker` classes to solve the problem.
- `shared.ts`: Contains shared types and functions used across the exercise.

## Problem (0-issue.ts)

Our system needs to generate documents based on requests. However, it uses an underlying lower-level pacakge that can handle one document generation at a time. When multiple requests are made simultaneously, the system crashes. This file demonstrates the issue by making three document generation requests at the same time.

You can run this file with `npx tsx 4-queues/0-issue.ts` (or other relative path) to see the problem in action.

## Introduction to Queues (1-queueUsage.ts)

To solve the problem, we introduce the concept of queues. A queue is a data structure that follows the First In, First Out (FIFO) principle. It allows us to manage tasks efficiently by processing them one at a time. This file shows how to interact with the `Queue` and `Worker` classes to manage document generation requests.

- Queue - Manages the document generation requests.
- Worker - Processes the document generation requests one at a time.

Right now, the queue and worker methods are not sufficient to handle these requests. You can run this file with `npx tsx 4-queues/0-queueUsage.ts` and you will see no output.

## Implementation (1-queue.ts)

In this file, you will implement the `Queue` and `Worker` classes. The `Queue` class will manage the document generation requests, and the `Worker` class will process these requests one at a time. You will need to complete the `enqueue`, `dequeue`, and `process` methods based on the TODO comments in the file.

### Objective

Your task is to implement the `Queue` and `Worker` classes in `1-queue.ts` to efficiently manage document generation requests without overloading the system.

### Instructions

1. Start by examining the `0-issue.ts` file to understand the problem.
2. Read through `1-queueUsage.ts` to see how queues and workers are intended to be used.
3. Implement the `Queue` and `Worker` classes in `1-queue.ts` by following the TODO comments.
4. Test your implementation by running `1-queueUsage.ts` (`npx tsx 4-queues/1-queueUsage.ts`) and ensuring that all document generation requests are processed successfully without crashing the system.

If you have successfully implemented the `Queue` and `Worker` classes, you should see the following output when running `1-queueUsage.ts`:

```
Document 1 has been generated!
Document 2 has been generated!
Document 3 has been generated!
```
