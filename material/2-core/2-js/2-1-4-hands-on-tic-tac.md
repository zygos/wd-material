Part 4: Hands-on Exercise - Tic Tac Toe web page

You have already familiarized yourself with this problem in Python. Now, it is time to implement it with JavaScript and a web UI.

# Task Description

Develop a 4x4 Tic Tac Toe game using JavaScript, HTML and CSS with multiple player options.

## Requirements

1. 4x4, 4 in a row/column/diagonal to win
2. Human vs. Human (on the same machine, taking turns)
3. Display the winner (or draw)
4. Highlight the winning cells
5. Do not allow placing a symbol when the game has ended
6. Allow to restart the game by clicking a button
7. At least minimally style the game board
8. The game should work on mobile devices
9. Human vs. "AI" (random guessing)
10. AI player should make moves with a 500ms delay
11. Display who's turn it is
12. There are no external JS dependencies (no JS libraries)

How you decide to implement these features is up to you. There is a lot of room left to choose different UI and JS approaches.

## Recommended Step-by-Step Approach

1. Build a basic 3x3 game UI with HTML and CSS
2. Allow adding an X with an event listener and then add an O with to a random cell
3. Handle the end of the game
4. Implement the remaining features of the needed to play a 3x3 game
5. Upgrade the board to 4x4
6. Add a delay before AI makes a move
7. Add a Human vs Human mode
8. Split the code into modules
9. Migrate player logic into separate objects/classes
10. (Bonus) Implement player and symbol selection
11. (Bonus) Implement the remaining core features
12. (Bonus) Consider the ease of change
13. (Bonus) Improve the UX and address possible issues
14. (Bonus) Refactor the code

If you are already familiar with JavaScript, try to start off by designing the game with separate modules by thinking what type of logic you can encapsulate. This will save you some time on the bonus challenges. Since many of you are just introduced to JavaScript, we recommend starting with a simpler approach and then refactoring the code into multiple files. Later on, you will be expected to design your code with modules at an earlier stage than what is recommended here.

## Hints

- Recommended approach is structured in a way that allows you to write a working solution without thinking about design patterns and just focus on stringing JavaScript code together. Once you have a working solution, you can refactor it to use classes and modules.
- Consider debugging with [VS Code and a browser](https://www.syncfusion.com/blogs/post/javascript-debugging-with-vs-code-and-chrome.aspx).
- Try to create a minimal UI first and then add the logic. Add bells and whistles later.
- Do not use `document` apart from the your main script file, ideally only in a single function. Try passing specific DOM elements to functions instead.
- You can use `event.target.closest('.my-selector')` to find the closest parent element (including current element) matching the selector.

It is OK to struggle implementing some of the requirements. In fact, this task should expose you to some of the challenges of building a web application.

## Bonus challenges

1. The game should work with every combination of player types (Human vs. Human, Human vs. AI, AI vs. AI)
2. An additional AI player option - GPT AI using fetch
3. Allow players to choose their symbols
4. Configurable list of player symbols
5. Configurable number of consecutive symbols (X, O) required to win
6. Configurable number of players as a variable
7. Configurable board size

Configurable here means that it can be changed through a variable or a function parameter, preferrably in a configuration object or file.

For modules, try using an approach that you are less familiar with - functions with closures or classes.

The final version of the provided solution implements all of the bonus challenges.

## Approach to Solving the Task

Follow this approach to tackle the hands-on exercise:

- Spend up to 10 hours attempting to solve the task on your own.
- If you struggle during the first hours and find it too difficult, try seeking help from your peers or JTLs for an additional 10 hours. Spend half of this time working with someone else, whether it's a study buddy, a peer who has completed the exercise, or a JTL in an open session.
- When you are no longer making any progress on your own, take a look at the suggested solution and walk through it step-by-step. Expect to spend up to 10 more hours on the walkthrough while experimenting and learning from the provided solution. The first 7 steps in the solution are built with a very straightforward approach without any design patterns. The remaining steps introduce modules, classes and other abstraction that make the code more flexible and easier to maintain.
- Try to go back to your own solution once the suggested solution clears up any obstacles you encountered.
- Note: The suggested solution presents a single possible way of solving the task. There are many other ways to solve it with their own pros and cons.
- We recommend checking the final suggested solution even if you have completed the task on your own.
