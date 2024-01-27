I work in a tech education startup. I am a senior web developer who has been tasked with creating a web development course for new students.

One of the tasks is preparing a coding task for a given topic that tests students.

Template for a coding task:
"""
Part 5: { name }

{ part description }

## Project description

{ project description }

## The requirements you are given to implement are as follows:
- { list requirements }

{ additional comments }

## Reviewer role
Different projects may require you to structure your presentation in different ways based on the imagined role of the reviewer. The goal is to practice interacting with different stakeholders that a developer will likely encounter in their careers.

{ description of role }

## Project evaluation criteria
- { list criteria }

During a task review, you may get asked questions that test your understanding of covered topics.

**Sample questions for a reviewer to ask (a reviewer is encouraged and expected to think of more, however!)**

- { list questions }

# Submission

To submit the project and allow the reviewer to view your work beforehand, go to your GitHub repository by clicking on the GitHub icon above. Next, select "Add File"->"Upload Files". Choose the files you worked on to upload them, then click the green "Commit changes" button.
Note: the repository for this project is different from the one you used in the last project! Make sure you are using the correct one by clicking on the GitHub icon in this project’s page.
Once you have completed all the steps of the project and uploaded your work, go to the Turing Platform and click the "Submit Project" button to complete it. The platform then allows you to see the times when reviewers are available to have a call with you and review the project. Simply book a time that suits you. If there are no times available, feel free to write a message in the #wd_correction_scheduling channel on Discord.
Read an in-depth guide about corrections here: https://turingcollege.atlassian.net/wiki/spaces/DLG/pages/537395951/Peer+expert+reviews+corrections

**Estimate average time to complete: xx hours**
"""

Example of an already existing coding task:
"""
Module 1: Fundamentals of Programming & Computer Science
Sprint 3: Intermediate Programming with Python II
Part 4: Interactive Learning Tool

You will design and implement an interactive learning tool that allows users to create, practice, and test their knowledge using multiple-choice and freeform text questions. The program will track user statistics and provide options to manage the questions. It will be a program that you might even want to use yourself for learning!

Similarly to the hands-on exercise of this sprint, you will be given a bit more freedom regarding the exact way how your program will work – the requirements will deliberately leave the finer details for you to decide. This will allow you to practice thinking about the design of programs, not just the technical implementation.

## The requirements you are given to implement are as follows:

When the program starts, user should be able to choose between the following modes:
- **Adding questions**.
- **Statistics viewing**.
- **Disable/enable questions**.
- **Practice mode**.
- **Test mode**.
- (Bonus) **Profile Select**

## Adding questions mode:
In this mode, users should be able to add two types of questions - quiz questions or free-form text questions. A quiz question requires the user to choose one of the given answer options. A free-form question requires the user to enter some text and compare it with the expected answer to determine whether it is correct (it can be as simple as directly comparing the string saved as the answer and the answer given by the user).

The questions should be saved in a file so that once the program is closed and opened again, the questions remain.

The user should not be able to enter practice or test modes until at least 5 questions have been added.

## Statistics viewing mode:
The program should print out all the questions currently in the system. As a minimum, each question should list: its unique ID number; whether the question is active or not; the question text; the number of times it was shown during practice or tests; the percentage of times it was answered correctly.

## Disable/Enable Questions mode:
Users should be able to write the ID of the question they want to disable or enable. The question information (question text, answer) should be shown and the user should be asked to confirm whether they want to disable/enable it. Disabled questions should not appear in practice and test modes. The enabled/disabled status should be stored in a file, just like the questions.

## Practice mode:
A mode in which questions are given non-stop so that the user can practice. However, the questions are chosen in such a way that the questions that are answered correctly become less likely to appear, while questions that are answered incorrectly become more likely to appear. *Hint: you may want to look into weighted random choices*. The probabilities should not be reset when the program restarts.

## Test mode:
A mode for testing your knowledge. Users should first select the number of questions for the test which is not larger than the total number of questions added. The questions get chosen fully randomly and each question can only appear once at most in the test. At the end of the questions, the user is shown the score. The list of scores should be saved in a separate results.txt file – the date and time should be added next to the score as well.

## (Bonus) Profile Select:
*This will not affect your final score, but you may attempt it if you feel the main challenge was easy enough. Completing this may increase your chances of becoming a JTL if you decide to apply to be one later*.
Make it so that users can select a profile. Each profile should have individual statistics of how many times a question was answered correctly and thus individual probabilities of getting those questions in the practice mode. In the test mode, saved scores should also say which profile achieved each of the scores there. The questions should be shared between all profiles, however.

**You are free to make any further improvements to the program that you think could make it even more useful for the user. E.g. you could implement a “full reset” option that deletes all the questions.**

## Technical requirements:
- Use Object-Oriented Programming
- Use Regular expressions in at least one function
- Use file input/output
- Write at least 3 unit tests
- Submit the generated output files (for storing questions, test scores, etc.) to the GitHub repository too (not only the code).


- **At the end of the file, add a link to the public GitHub repository that contains your work from Part 4 so far.** If you are ahead in your batch, we expect that you might not yet have it fully done – however, the initial repository should still be there. Hopefully you should also have at least one session of peer programming done by the time you finish this sprint.

## Reviewer role
First, present the program as if you were presenting it to a potential user. Explain the code as if you are explaining it to a technical team lead. Try to go rather quickly through parts that are easy and focus more on explaining the most complicated parts of the code.

## Project evaluation criteria
- User is able to add questions of “quiz” and “free-form text” types
- Program uses OOP reasonably well. E.g. classes are chosen reasonably, features like getter/setter decorators may be used.
- User is able to see statistics of the questions
- User is able to disable/enable questions
- Practice mode works correctly
- Test mode works correctly
- Code quality. How readable and tidy is the code?
- Usability of the program – is the program easy to use for the user?

During a task review, you may get asked questions that test your understanding of covered topics.

**Sample questions for a reviewer to ask (a reviewer is encouraged and expected to think of more, however!)**

- What are the potential benefits of using Object Oriented Programming?
- What is a .csv file?
- How would you go about writing a more complex regular expression?
- What are the most common Git commands?
- When does a merge conflict happen in Git?

# Submission

This project will require 1 STL and 1 Peer review.

For the sake of practicing Git, you are advised to use the command line to submit the project to the Turing GitHub repository.

Note: the repository for this project is different from the one you used in the last project! Make sure you are using the correct one by clicking on the GitHub icon in this project’s page.
Read an in-depth guide about corrections here: https://turingcollege.atlassian.net/wiki/spaces/DLG/pages/537395951/Peer+expert+reviews+corrections

**Estimate average time to complete: 25 hours**
"""

Write a coding task for the first vanilla JS app. The task should cover the following topics:
- Arrays, Objects and Functions
- Error Handling
- Interacting with DOM elements
- Event listeners
- Promises & Async functions
- Higher Order Functions
- Module Imports (and exports)

Follow the structure from the template and the given example of an already existing coding task.