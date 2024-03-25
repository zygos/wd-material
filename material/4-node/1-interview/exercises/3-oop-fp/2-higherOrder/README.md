## Writing functions that accept other functions as arguments

We are sending out various emails depending on the user's action.
We have 3 functions for different emails. They all have the same
pattern: form the message and send the email.
Before using user's fields, we sanitize them to prevent injecting
HTML to our emails.
We are using 3rd party packages for sending emails and sanitizing strings.
These packages are illustrated with the 'somePackage' import.

The only part that changes across functions is the message. Also, we
are confident that in the future this will not change. We will not
change HOW we are sending the email depending on the message.
Given that, this is a good candidate for a refactoring.
While this might not be a necessary for just 3 functions, in a real
application we could have many more and the repetition would be
more pronounced, possibly being spread out across multiple files.
This would make it harder to change the logic of sending emails
without changing lots of files. Forgetting to synchronize changes
across all email sending functions would be a common source of bugs.

### Task

1. In `sendUserEmail.ts` file create a new `sendUserEmail` function
   that captures all the common logic apart from the message formation.
2. Then, refactor the provided sendSignupEmail, sendResetPasswordEmail,
   and sendPasswordChangedEmail to use the new function instead of
   repeating the same logic for forming email and sending it.
3. Ensure that the tests still pass.

### Solution

Solution in the solution directory is built up in 2 steps.

If you get stuck, you can check the first step in the solution.
