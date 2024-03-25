## Problem

Your team lead informs you about a bug in image upload logic that caused 1000s of files to be stored without the correct file extension, so now it is unclear which images are JPEGs, PNGs, etc. You need to find a way to identify the file type of each file without the file extension.

Luckily, most non-plain-text files have a header that contains [the file signature](https://en.wikipedia.org/wiki/List_of_file_signatures), which can be used to identify the file type. For example, JPEG images start with the binary signature `111111111101100011111111` (`FF D8 FF` in hex).

Another developer on your team has already written a function that reads the file and checks the first few bytes to determine the file type. However, once this was deployed to production, the script could not keep up with the number and size of files, causing request timeouts and even **server crashes** 😓

The **team lead has asked you to fix the issue ASAP**.

The current solution uses the Node's `fs.readFile` function, which **reads the entire file into memory**. You realize that this might be the reason for the performance issues, as the files are being read into memory all at once, causing the server to run out of available memory or take too long to process the files. You wonder is there a way to read only the first few bytes of the file.

## Task

1. Implement the `identifyFileBuffer` function in `identifyFile.ts` file.
2. Make sure that your implementation passes the tests in `identifyFile.spec.ts` file.

```sh
npm test 1-buffers
```

3. Make sure that your implementation is at least 10x faster than the naive `identifyFile` function. If it is implemented correctly, it likely will be much faster than that.

```sh
npm run bench 1-buffers
```

4. Compare your implementation with the solution in the `solution` folder.
