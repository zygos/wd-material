# Exercise 4: Handling Remainders in Stream Processing

## Task

One of the challenges of processing data in chunks is that each chunk might not neatly align with the data you are processing. For example, if you are processing a CSV file, a row might be split across two chunks:

```csv
...
itemA,10
itemB,20
itemC,30
...
```

We could have the following chunks:

```csv
...
itemA,10
itemB
```

```csv
,20
itemC,30
...
```

Now, the itemB row is split across two chunks! This is a common problem when processing data in chunks, and it is important to handle these incomplete rows correctly.

We will add our own buffering mechanism to the `CsvTransform` class to handle these cases. We will call them "remainders" - the last part of a chunk that is not a complete row. We will store the remainder from the last chunk and use it to complete the rows in the next chunk. This will ensure that we process each row correctly, even if it is split across chunks.

As you might have guessed, this is one of the reasons why you should not use streams for all use cases. If you are dealing with small files or files that can not be split into processable chunks, you might not need to use streams at all. However, for large files, or files that can be processed in chunks as CSV files, audio, video, etc., streams are a great tool to have in your toolbox.

## Instructions

1. Add a custom property in the `CsvTransform` class to keep track of a remainder of the last chunk - the last line from the previous chunk. You could call it `remainder` or any other name you prefer.
2. Adapt the `_transform` method to handle these remainders. Ensure that rows split across chunks are correctly reconstructed and processed.

## Testing & Solution

Run the provided test cases to verify your solution. Once completed, compare your implementation with the provided solution in the solution folder.
