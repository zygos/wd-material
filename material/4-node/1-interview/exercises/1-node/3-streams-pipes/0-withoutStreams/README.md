# Processing a CSV File Without Streams

## Overview

This example demonstrates the processing of a CSV file without using Node.js streams. We will try to replicate the same functionality using streams in a set of exercises.

## Business Problem

The primary goal here is to read a CSV file, apply transformations to its data:

- Uppercase the first column (which contains product names).
- Add a new column with 20% added to the price.
- Make sure each price has two digits after the decimal point.

Then the resulting CSV data is compressed using gzip compression. The current approach of reading the entire file into memory, processing it and then writing it back can be memory-intensive and could crash your application if the file is larger than the available system memory.

## Task

1. Investigate the code in the `processCsv.ts` file and its test file.
2. Run the tests (`npm test 0-withoutStreams`).
