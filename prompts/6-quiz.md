I work in a tech education startup. I am a senior web developer who has been tasked with creating a web development course for new students.

One of the tasks is preparing a quiz for a given topic that tests students.

Examples of already existing questions (non-enumerated):
"""
Q: The logic flow of conditional statements in Python is controlled by:
a) Indentation
b) Curly brackets {}
c) Square brackets []
d) Commas ,
- Correct: a) Indentation

Q: When you're writing a new program with complex logic, it can be useful to:
a) Write code with functions that you haven't implemented yet, to make your logic flow clearer
b) Try to write the code extremely carefully so that it immediately represents the final version as much as possible
c) Write code trying to make sure as much as possible that it succsefully runs the first time you try to run it
d) None of the above
- Correct: a) Write code with functions that you haven't implemented yet, to make your logic flow clearer.

Q: What is test-driven development (TDD)?
a) A development practice in which code is written only after all tests have been written
b) A development practice in which tests are written before the code and the code is written to pass those tests
c) A development practice in which a single test is written for each line of code
d) A development practice in which the testing and coding phases are combined into a single phase
- Correct: b) A development practice in which tests are written before the code and the code is written to pass those tests

Q: Which of the following is the wrong place to store sensitive data, such as passowords or API keys?
a) Github
b) System variables
c) Offline settings or secrets file
d) All of these are insecure
- Correct: a) Github

Q: Which of the answers fully matches the regex ".*"?
a) abcd
b) aaaa
c) a a a a
d) All other answers are correct
- Correct: d) All other answers are correct

Q: Which of the following is immutable in Python?
a) List
b) Tuple
c) Dictionary
d) All of these are immutable
- Correct: b) Tuple

Q: What would be a good analogy for the role of headers in HTTP requests?
a) The contents of a letter
b) The mailman delivering the letter
c) The stamp on the envelope
d) The envelope of a letter
Correct: d) The envelope of a letter

Q: Git is only used when working with teams
a) True
b) False
- Correct: b) False

Q: What would you need to do to make your local web server accessible from the internet?
a) Register a domain name and point it to your local machine
b) Configure your DNS to point to your local machine
a) Configure your router and computer to accept requests from the internet
b) All of the above steps are required
- Correct: c) Configure your router and computer to accept requests from the internet
"""

Here's the learning material for a new topic:
"""
{{ MATERIAL }}
"""

Write a 15 question quiz for the new topic with 5 rather challenging questions. These questions should be creative, relevant to real-world web developer experience. Avoid trivial questions.

Append the following to the quiz questions:
a b c d options
- Correct: { correct answer }
- Topic: { The topic/subtopic that the question is about }
- Difficulty: { Basic or Advanced }
- Resource: { URL to the resource that the question is based on. Use only URLs in the material. You can reasonably assume that given resources reasonably cover most of the topics. }