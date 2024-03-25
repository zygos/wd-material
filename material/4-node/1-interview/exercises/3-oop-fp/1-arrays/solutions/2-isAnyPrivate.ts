import type { Post } from '../types'

// This small problem has plenty of possible solutions.
// We will go through some of them and explain why some are
// better than others.
// Also, we will explore some performance considerations.

// While there are some solutions using filter, map and reduce,
// they are not the best solutions as they iterate over all the
// elements of the array even if the first element is private.
// Ideally, we should stop iterating over the array as soon as
// we find the first post that passes our condition.

// 1. Here is a possible solution using reduce, which is clearly
// not the best due to the reasons mentioned above and limited
// readability - it is not immediately clear what the reduce
// function is doing. We have to trust that it is doing what
// its name suggests.
export function isAnyPrivateReduce(posts: Post[]): boolean {
  return posts.reduce((isPrivate, post) => isPrivate || !post.isPublic, false)
}

// 2. Here is a solution using map and includes.
// While this is a better solution than the previous one for its
// readability, it is not the best solution as it iterates over
// all the elements of the array twice and it creates an additional
// array.
export function isAnyPrivateMap(posts: Post[]): boolean {
  return posts.map((post) => post.isPublic).includes(false)
}

// 3. Solution using filter.
// This is a fine for its readability and it is more readable
// than the previous two solutions.
// However it still iterates over all the elements of the array
// even if the first element is private. Also, it creates an
// intermediate array, which is not ideal.
// For this problem, we do not particularly care how many private
// posts there are, we just want to know if there is at least one.
export function isAnyPrivateFilter(posts: Post[]): boolean {
  return posts.filter((post) => !post.isPublic).length > 0
}

// 4. Solution using find.
// This is a better solution than the previous one as "find"
// checks each element for a condition, similarly to "filter",
// but it stops once it finds the first element that satisfies
// the condition.
// It returns the element that satisfies the condition, or
// undefined if it does not find any.
// This can then be used to cast the result to a boolean using
// 2 negations (!!), because:
// !!Post === true
// !!undefined === false
export function isAnyPrivateFind(posts: Post[]): boolean {
  return !!posts.find((post) => !post.isPublic)
}

// 5A. Solution using some, it can be considered as "the best"
// solution as it is clear, concise and it stops iterating over
// the array as soon as it finds the first private post.
export function isAnyPrivateSome(posts: Post[]) {
  return posts.some((post: Post) => !post.isPublic)
}

// 5B. For completeness, there is an alternative solution using
// the opposite of "some" - "every". The only difference is
// that we would have to negate the result of "every" with "!""
// to get the correct result.
// It would suit us better if it matched the problem statement
// more closely. For example, if our function was called "areAllPublic"
// instead of "isAnyPrivate", then "every" might be a better choice
// just because it more intuitively matches the expressed intent.
// Otherwise, "some" and "every" are interchangeable if we negate
// the result. "some" returns false for an empty array, while
// "every" returns true for an empty array.
export function isAnyPrivateEvery(posts: Post[]): boolean {
  return !posts.every((post) => post.isPublic)
}

// For comparison, here is the original version using a for loop.
export function isAnyPrivateImperative(posts: Post[]) {
  for (let i = 0; i < posts.length; i++) {
    if (!posts[i].isPublic) {
      return true
    }
  }

  return false
}

// If we would run `npm run bench isAnyPrivate`, we would see something similar to this:

;`
✓ arraySmall (100 items, 10th is private)
    name                    ops/second
  · isAnyPrivateImperative  13,547,539   fastest <- good
  · isAnyPrivateFind        12,525,779           <- good
  · isAnyPrivateSome        12,018,876           <- good
  · isAnyPrivateEvery       11,432,913           <- good
  · isAnyPrivateReduce       6,327,124           <- good
  · isAnyPrivateMap          2,196,871           <- good
  · isAnyPrivateFilter       1,843,523   slowest <- still fine

  ✓ arrayLargeWorst (1_000_000 items, none are private)
    name                    ops/second
  · isAnyPrivateImperative  11,509,857   fastest <- good
  · isAnyPrivateSome        11,132,564           <- good
  · isAnyPrivateFind        10,776,089           <- good
  · isAnyPrivateEvery        8,766,678           <- good
  · isAnyPrivateReduce             129           <- too slow
  · isAnyPrivateMap                 79           <- too slow
  · isAnyPrivateFilter              42   slowest <- too slow
`

// The exact results would vary depending on your machine and the
// current background load. In general, al top 4 solutions are
// equivalent in performance and are all good choices.
// However, for loops are not as readable, especially when we end up
// with nested loops.
//
// Unless performance is an actual limiting factor in your application,
// causing issues relevant to the business, you can ignore any
// performance difference that does not exceed 10x or even 100x.

// We see that for small arrays, the performance difference is negligible
// and you can ignore the performance difference between the solutions
// altogether.
// If in your application this function is always called with small arrays,
// then ignore the performance difference and choose the most readable
// solution every time.
// This means that if you are working on a problem that has a limited
// set of elements (categories, statuses, possibly tags, etc.) then
// the performance is not an issue at all.
// Also, realistically, most of the time you will be working with small
// subsets of data and you will leave some data processing to the database.
// In those cases, you should choose a solution that most clearly
// communicates the intent of the function.

// For large arrays, the performance difference is more pronounced.
// Should you then reach for the fastest solution?
// Still no. As long as this function is not a bottleneck in your application
// (for example, it takes more than 20% of the entire processing time),
// you should not optimize for performance.
// You should only avoid slowest solutions, which are generally based
// on inefficient algorithms for that particular problem.
// For example, in this problem, using "filter" is not a good choice
// because it iterates over all the elements of the array even if the
// first element is private. Also, it creates an intermediate array,
// which is not great for large arrays.

// Any of the top 4 solutions are good choices for large arrays.
// In both cases, using "some" is a great choice as it is fast and it
// clearly communicates the intent of the function.

// Here is a general rule of thumb.
// If performance optimization:
// - does not come at a cost of readability (win/win case)
//      -> choose a performant and readable solution
// - comes at a cost of readability AND performance is an observable issue
//   that we have identified and measured in a real-world scenario
//     -> choose a performant solution
// - in every other case (default case)
//     -> choose a readable solution
