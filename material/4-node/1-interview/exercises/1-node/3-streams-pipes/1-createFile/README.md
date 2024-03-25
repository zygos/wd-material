# Exercise 1: Create File Stream

## Objective

In this exercise, you will learn how to create and use file streams in Node.js. You'll work with two main types of streams: readable and writable streams. Your task is to read data from a source file and write it to a destination file using these streams.

Your solution likely will end up being ~10 lines of code.

## Instructions

1. **Create Read and Write Streams**: You will start by creating a readable stream from the source file and a writable stream to the destination file. This is the foundation of working with file streams in Node.js.

2. **Pipe Data**: Once you have both streams set up, you will use the `.pipe()` method to transfer data from the readable stream to the writable stream. This method allows for efficient data transfer in chunks without loading the entire file into memory.

3. **Handle Stream Events**: To properly manage the stream lifecycle, you need to handle two critical events: `finish` and `error`. The `finish` event signifies that all data has been flushed to the destination file, while the `error` event indicates that an error occurred during the streaming process.

## Task

Complete the provided `processCsvStreams` function by following the instructions in the comments.

## Testing

Make sure your code passes the test cases (`npm test 1-createFile`).

## Solution

The solution file is provided in the `solution` folder. It also introduces a more concise way to create and use streaming pipelines using the `pipeline` method.
