# Exercise 3: Process CSV with Streams

## Task

Your goal in this exercise is to implement the transformation logic within the `csvTransform` Transform stream. This stream should read chunks of data from a CSV file, process each row using the provided `processRow` function, and then compress the processed data using gzip before writing it to a new file.

## Steps

1. Convert the incoming chunk (Buffer) to a string.
2. Split the string by newline characters to process each row individually.
3. Use the `processRow` function to process each row.
4. Combine the processed rows back into a single string.
5. Push the processed string chunk to the next stream in the pipeline.

## Testing & Solution

Continously run the provided test cases to verify your solution. Later, check your implementation against the provided solution in the solution folder.
