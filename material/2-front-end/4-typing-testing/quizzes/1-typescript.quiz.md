Q1: What is type inference in TypeScript?
a) The process of automatically determining the type of an expression
b) The process of explicitly declaring the type of an expression
c) The process of checking the type of an expression at runtime
d) The process of converting an expression to a different type
- Correct: a) The process of automatically determining the type of an expression
- Topic: TypeScript Fundamentals
- Difficulty: Basic
- Resource: https://www.youtube.com/watch?v=d56mG7DezGs

Q2: What is the main benefit of using TypeScript in a large codebase?
a) It makes the code run faster
b) It helps catch errors at compile-time rather than runtime
c) It allows you to use new JavaScript features before they are officially released
d) It simplifies the code
- Correct: b) It helps catch errors at compile-time rather than runtime
- Topic: TypeScript Fundamentals
- Difficulty: Basic
- Resource: N/A

Q3: What does `void` mean in the context of a function return type?
a) function always returns undefined
b) function has no return type
c) function throws an error
d) function never finishes its execution
- Correct: b) function's return value should not be used
- Topic: TypeScript Fundamentals
- Difficulty: Basic
- Resource: https://www.youtube.com/watch?v=d56mG7DezGs

Q4: What does the `strict` option in the TypeScript configuration file do?
a) It enables 'use strict' mode in JavaScript
b) It enables strict type-checking in TypeScript
c) It enables the special TypeScript strict syntax
d) It enables strict error handling in TypeScript
- Correct: b) It enables strict type-checking in TypeScript
- Topic: TypeScript Fundamentals
- Difficulty: Basic
- Resource: https://www.youtube.com/watch?v=d56mG7DezGs

Q5: What is the difference between `any` and `unknown` types in TypeScript?
a) `any` can be any value, `unknown` is undefined at compile-time
b) `any` is undefined at compile-time, `unknown` can be any value
c) `any` allows all operations, `unknown` forbid operations without type-checking
d) `any` forbids operations without type-checking, `unknown` allows all operations
- Correct: c) `any` is a type that allows any operations, `unknown` is a type that does not allow any operations without type-checking
- Topic: TypeScript Fundamentals
- Difficulty: Advanced
- Resource: https://www.youtube.com/watch?v=d56mG7DezGs

Q6: What is the purpose of type assertions in TypeScript?
a) To check the type of a variable at runtime
b) To force a value to be of a specific type
c) To specify the type of a variable when it cannot be inferred
d) To convert a variable to a different type
- Correct: c) To specify the type of a variable when it cannot be inferred
- Topic: TypeScript Fundamentals
- Difficulty: Basic
- Resource: https://www.youtube.com/watch?v=d56mG7DezGs

Q7: What TypeScript type would you use to represent a function that always throws an error?
a) Error
b) never
c) void
d) throw
- Correct: b) never
- Topic: Exercise: List built-in types
- Difficulty: Basic
- Resource: https://www.youtube.com/watch?v=d56mG7DezGs

Q8: Which of the following is NOT a valid TypeScript type?
a) void
b) never
c) always
d) any
- Correct: c) always
- Topic: Exercise: List built-in types
- Difficulty: Basic
- Resource: https://www.youtube.com/watch?v=d56mG7DezGs

Q9: What is the primary purpose of using JSDoc in JavaScript?
a) To add static types to JavaScript
b) To document the purpose of classes, functions, and their parameters
c) To declare variable types in JavaScript
d) To add comments to JavaScript code
- Correct: b) To document the purpose of functions and their parameters
- Topic: Typing in JavaScript, JSDoc
- Difficulty: Basic
- Resource: N/A

Q10: Can you run TypeScript files directly in the browser?
a) Yes, TypeScript files are compiled by the browser
b) Yes, if the TypeScript file is included as an ES module
c) No, TypeScript files must be compiled to JavaScript first
d) No, only Node.js can run TypeScript files
- Correct: c) No, TypeScript files must be compiled to JavaScript first
- Topic: TypeScript Fundamentals
- Difficulty: Basic
- Resource: https://www.youtube.com/watch?v=d56mG7DezGs

Q11: If you want strict type safety, which type should you prefer when you can not know the variable type in advance?
a) any
b) unknown
- Correct: b) unknown
- Topic: TypeScript Fundamentals
- Difficulty: Basic
- Resource: https://www.youtube.com/watch?v=d56mG7DezGs

Q12: If you want to disallow a variable or a key in an object to be modified, which type should you use?
a) never
b) readonly
c) static
d) unwritable
- Correct: b) readonly
- Topic: TypeScript Fundamentals
- Difficulty: Basic
- Resource: https://www.youtube.com/watch?v=d56mG7DezGs

Q13: What TypeScript type should you use to accept strings and numbers as a function parameter?
a) string || number
b) string ?? number
c) string & number
d) string | number
- Correct: d) string | number
- Topic: TypeScript Fundamentals
- Difficulty: Basic
- Resource: https://www.youtube.com/watch?v=d56mG7DezGs

Q14. What is type narrowing?
a) The process of converting a variable to a different type
b) The process of checking the type of a variable at runtime
c) The process of limiting possible types of a variable
d) The process of automatically determining the type of a variable
Correct: c) The process of limiting possible types of a variable
Topic: TypeScript Fundamentals
Difficulty: Advanced
Resource: https://www.youtube.com/watch?v=d56mG7DezGs

Q15. In Vue, which option would be a valid way to declare a type definition for a ref of an array of todos?
a) const todos: Todo[] = ref([])
b) const todos: Ref<Todo> = ref([])
c) const todos: ref<Todo[]> = ref([])
d) const todos: Ref<Todo[]> = ref([])
Correct: d) const todos: Ref<Todo[]> = ref([])
Topic: Vue 3
Difficulty: Advanced
Resource: https://vuejs.org/guide/typescript/composition-api.html
