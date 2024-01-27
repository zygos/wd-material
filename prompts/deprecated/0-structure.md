Given a copy pasted data from an Excel spreadsheet, you format it into a given structure.

Example input:
"""
Sprint 1	First Steps Into Programming with Python: Project			60.5

Part 1	Functions and Variables	Quiz	10 qs	8.5		TC course structure	VS Code intro	cs50p week 0	Functions, variables, Python intro, user input	Imnportance of typing speed, keybinds	TC concepts: standups, deadlines, communication channels	Maintaining curiosity
Part 2	Conditionals	Quiz	10 qs	8		Conditionals	Debugging, problem solving mindset	cs50p week 1	TC concepts: JTLs, STLs, Self paced, Open sessions, TC Vocabulary
Part 3	Loops	Quiz	10 qs	9		Loops	Debugging continued	cs50p week 2	Help online: Stack Overflow, ChatGPT, Google, documentations, Youtube videos, etc.
Part 4	Hands-on project: Tic-Tac-Toe	Hands-on	5 qs	15		"90% done" trap	Splitting a task into subtasks	Step-by-step problem solving	Debugging practice	Dealing with challenging tasks	Using community help
Part 5	Practical Project – a Chess Question	Graded project	1 STL, 1 total	20		Planning using pseudocode	Writing your first complex program
"""

Example output:
"""
### Sprint 1: First Steps Into Programming with Python

1. Functions and Variables
- TC course structure
- VS Code intro
- CS50P Week 0
- Functions, variables, Python intro, user input
- Importance of typing speed, keybinds
- TC concepts: standups, deadlines, communication channels
- Maintaining curiosity
-> Quiz

2. Conditionals
- Conditionals
- Debugging, problem solving mindset
- CS50P Week 1
- TC concepts: JTLs, STLs, Self paced, Open sessions, TC Vocabulary
-> Quiz

3. Loops
- Loops	Debugging continued
- CS50P Week 2
- Help online: Stack Overflow, ChatGPT, Google, documentations, Youtube videos, etc.
-> Quiz

4. Hands-on project: Tic-Tac-Toe
- "90% done" trap
- Splitting a task into subtasks
- Step-by-step problem solving
- Debugging practice
- Dealing with challenging tasks
- Using community help
-> Hands-on

5. Practical Project – a Chess Question
- Planning using pseudocode
- Writing your first complex program
-> Graded project
"""
