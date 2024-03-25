We will cover a single possible implementation of the Tic Tac Toe game. We will begin with a rather naive approach and then we will refactor the code to complete the bonus challenges.

## Step 1: Build basic a minimal 3x3 game UI with HTML and CSS

With web development, we have the luxury of being able to see our progress a lot more quickly than with other types of development. This allows us to start with the UI and build the game logic around it.

Let's create a basic HTML layout using simple `div` elements. We can use the following structure:

```html
<div class="container">
  <h1>Tic Tac Toe</h1>
  <div class="board">
    <div class="cell"></div>
    <div class="cell"></div>
    <div class="cell"></div>
    <!-- ...more cells -->
  </div>
</div>
```

Then, let's use a basic CSS grid to display the board:

```css
.board {
  /* 3x3 grid */
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* same as 1fr 1fr 1fr */
  grid-template-rows: repeat(3, 1fr);
  gap: 1rem;
}

.cell {
  aspect-ratio: 1;
  background-color: darkgray;
  border-radius: 5px;
  transition: background-color 0.2s ease-in-out; /* a smooth transition */
  font-size: 2.5rem; /* just something large enough */

  /* center the content */
  display: flex;
  align-items: center;
  justify-content: center;
}

.cell:hover {
  background-color: lightgray;
}
```

Nothing fancy, but it gets the job done.

## Step 2: Allow adding an X with an event listener and then add an O with to a random cell

Let's try to speedrun to the first working version of the game, even if it does not work according to all the requirements.

```js
// once the page is loaded
document.addEventListener('DOMContentLoaded', () => {
  // we could create a click handler for each cell
  // but a single handler on the board is more efficient
  document.querySelector('.board').addEventListener('click', handleBoardClick)
})

// function that handles board clicks
function handleBoardClick(event) {
  const cell = event.target

  cell.innerText = 'X'
}
```

Now, if we click on a cell, it should display an `X` in it. Though, clicking outside of a cell wipes the entire board. This can be easily fixed with:

```js
function handleBoardClick(event) {
  const cell = event.target

  if (cell.classList.contains('cell')) {
    cell.innerText = 'X'
  }
}

// an even more robust solution
function handleBoardClick(event) {
  // go up the DOM tree until we find a cell
  // this allows us to have other elements inside the cell
  const cell = event.target.closest('.cell')

  // if the click was not on a cell - return undefined and stop the execution
  if (!cell) return

  cell.innerText = 'X'
}
```

What about the **AI player**? We can create a simple function that will randomly select a cell and place an `O` in it.

```js
function handleBoardClick(event) {
  const cell = event.target.closest('.cell')

  if (!cell) return

  cell.innerText = 'X'

  // CSS :empty selector comes in handy here
  const cellsEmpty = document.querySelectorAll('.cell:empty')

  // we can search online on how to get a random element from an array
  const cellRandom = cellsEmpty[Math.floor(Math.random() * cellsEmpty.length)]

  cellRandom.innerText = 'O'
}
```

That should be enough to get the game working.

## Step 3: Handle the end of the game

We will need to know when the game is over. Once it is over, we will need to display a message somewhere on the screen and highlight the winning combination of cells.

We can create a function to get a winning combination of cells. It is quite similar to the function that was provided in the Python version of this game, except we are using DOM elements and higher-order functions instead of loops.

```js
function getWinningCells(boardElement, symbol) {
  const winningCombinations = [
    // horizontal
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],

    // vertical
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],

    // diagonal
    [0, 4, 8],
    [2, 4, 6],
  ]

  const cells = boardElement.querySelectorAll('.cell')

  // map each cell index to the cell element in DOM, so instead
  // of [0, 1, 2] we have [<div>, <div>, <div>] which we can
  // use to check if every cell in the possible winning combination
  // has the same symbol
  const cellsCombinations = winningCombinations
    .map(combination => combination.map(index => cells[index]))

  // find a combination where every cell is either X or O
  return cellsCombinations
    .find(combination => combination
      .every(cell => cell.innerText === symbol))
}
```

Now, we can use this function to check if someone has won and display that they won.

```js
function handleBoardClick(event) {
  const cell = event.target.closest('.cell')

  if (!cell) return

  cell.innerText = 'X'

  const boardElement = event.currentTarget
  const winningCellsX = getWinningCells(boardElement, 'X')

  if (winningCellsX) {
    alert('X won!')
    return
  }

  const cellsEmpty = document.querySelectorAll('.cell:empty')
  const cellRandom = cellsEmpty[Math.floor(Math.random() * cellsEmpty.length)]

  cellRandom.innerText = 'O'

  const winningCellsO = getWinningCells(boardElement, 'O')

  if (winningCellsO) {
    alert('O won!')
  }
}
```

We can also add some additional logic that check if there is a draw and a function that highlights the winning cells.

```js
function handleBoardClick(event) {
  const cell = event.target.closest('.cell')

  if (!cell) return

  cell.innerText = 'X'

  const boardElement = event.currentTarget
  const winningCellsX = getWinningCells(boardElement, 'X')

  if (winningCellsX) {
    highlightCells(winningCellsX)
    alert('X won!')
    return
  }

  const cellsEmpty = document.querySelectorAll('.cell:empty')

  if (cellsEmpty.length === 0) {
    alert('Draw!')
    return
  }

  const cellRandom = cellsEmpty[Math.floor(Math.random() * cellsEmpty.length)]

  cellRandom.innerText = 'O'

  const winningCellsO = getWinningCells(boardElement, 'O')

  if (winningCellsO) {
    highlightCells(winningCellsO)
    alert('O won!')
  }
}

function highlightCells(cells) {
  cells.forEach(cell => cell.classList.add('winning'))
}
```

Then, if we add some CSS, we can highlight the winning cells.

```css
.cell.winning {
  background-color: red;
}
```

Finally, we should move away from using alerts to display the game result.

We could display the result in a plain `div` element above the board with some descriptive class name, such as `game-status`.

```html
<div class="game-status"></div>
```

Then, we can get this element in our code and use it to display the game status.

```js
function handleBoardClick(event) {
  const cell = event.target.closest('.cell')

  if (!cell) return

  cell.innerText = 'X'

  const boardElement = event.currentTarget
  const statusElement = document.querySelector('.game-status')
  const winningCellsX = getWinningCells(boardElement, 'X')

  if (winningCellsX) {
    highlightCells(winningCellsX)
    statusElement.innerText = 'X won!'
    return
  }


  const cellsEmpty = document.querySelectorAll('.cell:empty')

  if (cellsEmpty.length === 0) {
    statusElement.innerText = 'Draw!'
    return
  }

  const cellRandom = cellsEmpty[Math.floor(Math.random() * cellsEmpty.length)]

  cellRandom.innerText = 'O'

  const winningCellsO = getWinningCells(boardElement, 'O')

  if (winningCellsO) {
    highlightCells(winningCellsO)
    statusElement.innerText = 'O won!'
    return
  }
}
```

## Step 4: Implement the remaining features of the needed to play a 3x3 game

We still need to implement:
- Do not allow placing a symbol when the game has ended
- Allow to restart the game by clicking a button

Displaying player turn is quite simple, just add an appropriate text to the `game-status` element.

```js
statusElement.innerText = 'It is "X" turn.'
```

Now, let's disable the game when it has ended. We can do this by adding a `game-over` class to the game element and then checking if the game element has this class before allowing to make a new move.

```js
function handleBoardClick(event) {
  const cell = event.target.closest('.cell')

  // ignore clicks outside of cells and if the cell is already occupied
  if (!cell || cell.innerText) return

  const boardElement = event.currentTarget
  const gameElement = boardElement.closest('.game')

  if (gameElement.classList.contains('game-over')) return

  cell.innerText = 'X'

  const statusElement = document.querySelector('.game-status')
  const winningCellsX = getWinningCells(boardElement, 'X')

  if (winningCellsX) {
    highlightCells(winningCellsX)
    statusElement.innerText = 'X won!'
    gameElement.classList.add('game-over')
    return
  }

  const cellsEmpty = document.querySelectorAll('.cell:empty')

  if (cellsEmpty.length === 0) {
    statusElement.innerText = 'Draw!'
    gameElement.classList.add('game-over')
    return
  }

  const cellRandom = cellsEmpty[Math.floor(Math.random() * cellsEmpty.length)]

  cellRandom.innerText = 'O'

  const winningCellsO = getWinningCells(boardElement, 'O')

  if (winningCellsO) {
    highlightCells(winningCellsO)
    statusElement.innerText = 'O won!'
    gameElement.classList.add('game-over')
    return
  }
}
```

We can add some additional CSS styling to all cells in `.game.game-over` to make it more obvious that the game has ended.

```css
.game.game-over .cell {
  cursor: not-allowed;
}
```

Finally, let's **add a button to restart the game**. We can add it below the `.game-status` element.

```html
<button class="restart">
  Restart
</button>
```

Then, some styling to display it only when the game is over.

```css
.restart {
  /* do not display the button by default */
  display: none;
}

.game.game-over .restart {
  /*  display only when the game is over */
  display: block;
}
```

And to finish it off, we can add a click handler to the button that will clear the game.

```js
document.querySelector('.restart').addEventListener('click', event => {
  const gameElement = event.target.closest('.game')

  // remove game-over class
  gameElement.classList.remove('game-over')

  // clear game status message
  gameElement.querySelector('.game-status').innerText = ''

  // clear all cells and their 'winning' CSS class
  gameElement
    .querySelectorAll('.board .cell')
    .forEach((cell) => {
      cell.innerText = ''
      cell.classList.remove('winning')
    })
})
```

At this point we still can work on some UI improvements but it should be enough for a minimal implementation.

## Step 5: Upgrade the board to 4x4

Upgrading the board from 3x3 to 4x4 consists of three parts:
- updating the HTML (adding more cells)
- updating the CSS (grid styling)
- updating the JS winning condition logic
- updating the JS end-of-the-game logic as now the game can reach a draw after 'O' makes a move

This should raise some concerns about the current implementation. We have a lot of hardcoded values in our code. We will need to update the code in multiple places to make it work with a 4x4 board and many possible solutions will make it no longer compatible with a 3x3 board. That's far from ideal. This is an example of **coupling**.

We will need to make changes in multiple places to make a single conceptual change. An ideal solution would be to make a single change in a single place and have it propagate to all other places.

We will leave addressing these general issues later on. For now, we will just make the necessary changes to make the game work with a 4x4 board.

Adding additional HTML cells and changing the CSS grid classes is straightforward. What is a bit more tricky is getting the right winning condition. We will need to update the `getWinningCells` function to check for 4 in a row instead of 3 in a row.

Here is the updated function which we for convenience put in a separate file `getWinningCells.js`:

```js
export default (boardElement, symbol) => {
  const winningCombinations = [
    // horizontal
    [0, 1, 2, 3],
    [4, 5, 6, 7],
    [8, 9, 10, 11],
    [12, 13, 14, 15],

    // vertical
    [0, 4, 8, 12],
    [1, 5, 9, 13],
    [2, 6, 10, 14],
    [3, 7, 11, 15],

    // diagonal
    [0, 5, 10, 15],
    [3, 6, 9, 12],
  ]

  const cells = boardElement.querySelectorAll('.cell')

  const cellsCombinations = winningCombinations
    .map(combination => combination.map(index => cells[index]))

  return cellsCombinations
    .find(combination => combination
      .every(cell => cell.innerText === symbol))
}
```

It is then imported in `index.js` with `import getWinningCells from './getWinningCells.js'`.

Finally, we need to update the end-of-the-game logic to account for the possibility of a draw after 'O' makes a move. We can do this by checking if there are any empty cells left after 'O' makes a move.

```js
function handleBoardClick(event) {
  const cell = event.target.closest('.cell')

  // ignore clicks outside of cells and if the cell is already occupied
  if (!cell || cell.innerText) return

  const boardElement = event.currentTarget
  const gameElement = boardElement.closest('.game')

  if (gameElement.classList.contains('game-over')) return

  cell.innerText = 'X'

  const statusElement = document.querySelector('.game-status')
  const winningCellsX = getWinningCells(boardElement, 'X')

  if (winningCellsX) {
    highlightCells(winningCellsX)
    statusElement.innerText = 'X won!'
    gameElement.classList.add('game-over')
    return
  }

  const cellsEmpty = document.querySelectorAll('.cell:empty')
  const cellRandom = cellsEmpty[Math.floor(Math.random() * cellsEmpty.length)]

  cellRandom.innerText = 'O'

  const winningCellsO = getWinningCells(boardElement, 'O')

  if (winningCellsO) {
    highlightCells(winningCellsO)
    statusElement.innerText = 'O won!'
    gameElement.classList.add('game-over')
    return
  }

  // moved the draw logic here, we are querying for empty cells again, because 'O' made a move
  // we could also check for the length being 1, but this is more explicit
  const cellsEmptyRemaining = document.querySelectorAll('.cell:empty')

  if (cellsEmptyRemaining.length === 0) {
    statusElement.innerText = 'Draw!'
    gameElement.classList.add('game-over')
    return
  }
}
```

## Step 6: Add a delay before AI makes a move

Now, let's work on the 500ms delay before AI makes a move. We will need to update the `handleBoardClick` function to start a timer after 'X' makes a move and then make a move for 'O' when the timer expires.

```js
function handleBoardClick(event) {
  /* ... */

  setTimeout(() => {
    const cellsEmpty = document.querySelectorAll('.cell:empty')
    const cellRandom = cellsEmpty[Math.floor(Math.random() * cellsEmpty.length)]

    cellRandom.innerText = 'O'

    const winningCellsO = getWinningCells(boardElement, 'O')

    if (winningCellsO) {
      highlightCells(winningCellsO)
      statusElement.innerText = 'O won!'
      gameElement.classList.add('game-over')
      return
    }

    // moved the draw logic here
    if (cellsEmpty.length === 0) {
      statusElement.innerText = 'Draw!'
      gameElement.classList.add('game-over')
      return
    }
  }, 500)
}
```

This has a few issues:
- our code is getting more and more nested
- the 'X' player can make a move while the timer is running

We will solve these issues one-by-one.

Ideally, we would like to have:
```js
// X makes a move
await pause(500)
// Y makes a move
```

To use that we need to convert our function to an `async` function and we need a new function `pause` which returns a `Promise` which resolves after a given number of milliseconds.

```js
function pause(ms) {
  return new Promise((resolve) => {
    // resolve after ms milliseconds
  })
}
```

How can we do that?

We can use the `setTimeout` function which accepts a callback and a number of milliseconds. We can pass the `resolve` function as the callback and the `ms` as the number of milliseconds.

```js
function pause(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms)
    // this is the same as:
    // setTimeout(() => resolve(), ms)
  })
}
```

Now, we can use it just like we wanted:

```js
// NOTE: we added the async keyword
async function handleBoardClick(event) {
  /* X makes a move */

  await pause(500)

  const cellsEmpty = document.querySelectorAll('.cell:empty')
  const cellRandom = cellsEmpty[Math.floor(Math.random() * cellsEmpty.length)]

  cellRandom.innerText = 'O'

  const winningCellsO = getWinningCells(boardElement, 'O')

  if (winningCellsO) {
    highlightCells(winningCellsO)
    statusElement.innerText = 'O won!'
    gameElement.classList.add('game-over')
    return
  }

  // moved the draw logic here
  if (cellsEmpty.length === 0) {
    statusElement.innerText = 'Draw!'
    gameElement.classList.add('game-over')
    return
  }
}
```

Finally, let's prevent the 'X' player from making a move while the timer is running. We can do this by having a variable that will keep track of whether the timer is running or not.

```js
let isWaiting = false

async function handleBoardClick(event) {
  if (isWaiting) return

  /* X makes a move */

  isWaiting = true

  await pause(500)

  const cellsEmpty = document.querySelectorAll('.cell:empty')
  const cellRandom = cellsEmpty[Math.floor(Math.random() * cellsEmpty.length)]

  cellRandom.innerText = 'O'

  // move is done, we can set isWaiting to false
  isWaiting = false

  const winningCellsO = getWinningCells(boardElement, 'O')

  if (winningCellsO) {
    highlightCells(winningCellsO)
    statusElement.innerText = 'O won!'
    gameElement.classList.add('game-over')
    return
  }

  // moved the draw logic here
  if (cellsEmpty.length === 0) {
    statusElement.innerText = 'Draw!'
    gameElement.classList.add('game-over')
    return
  }
}
```

## Step 7: Add a Human vs Human mode

Finally, let's add a new mode - `Human vs. Human`.

Right now, we have worked with an assumption that we are always playing against a simulated opponent. This will make it a bit more tricky to add a new mode.

We could have a variable which tracks the game mode. This variable could be changed using a button.

We could also have a variable which tracks the current player. This variable could be changed after each move. Then, when a click happens, we know which player is making a move.

```js
let currentSymbol = 'X' // variable which tracks the current player
let gameMode = 'HA' // variable which tracks the game mode, let's use 'HA' for Human vs. AI and 'HH' for Human vs. Human
```

How should we set the value of `gameMode`?

We could use a pair of buttons. Each button sets to a different value of `gameMode`.

We could use different classes for the buttons:

```html
<button class="game-mode-hh"></button>
<button class="game-mode-ha"></button>
```

But if we think about it, they are really just two different values of the same underlying concept. What is we will need to add more modes in the future? We would need to add more classes and more event listeners. We could instead use a single class, which will be used for the general styling of these buttons and then we could use a data attribute to clearly indicate what is the value they are setting.

```html
<button class="game-mode" data-mode="HH"></button>
<button class="game-mode" data-mode="HA"></button>
```

We can then search online for how to get the value of a data attribute in JavaScript. We will find that we can use the `dataset` property of the element.

```js
document.addEventListener('DOMContentLoaded', () => {
  /* ... */
  document.querySelector('.game-mode').addEventListener('click', (event) => {
    gameMode = event.target.dataset.mode
  })
})
```

Now, all we need to do is:
- prevent the AI from making a move when the game mode is `HH`
- switch the current player after each move

```js
async function handleBoardClick(event) {
  if (isWaiting) return

  const cell = event.target.closest('.cell')

  if (!cell || cell.innerText) return

  const boardElement = event.currentTarget
  const gameElement = boardElement.closest('.game')

  if (gameElement.classList.contains('game-over')) return

  cell.innerText = currentSymbol

  const statusElement = gameElement.querySelector('.game-status')
  const winningCells = getWinningCells(boardElement, currentSymbol)

  if (winningCells) {
    highlightCells(winningCells)
    statusElement.innerText = `${currentSymbol} won!`
    gameElement.classList.add('game-over')
    return
  }

  if (gameMode === 'HH') {
    currentSymbol = currentSymbol === 'X' ? 'O' : 'X'
  } else if (gameMode === 'HA') {
    isWaiting = true

    await pause(500)

    const cellsEmpty = gameElement.querySelectorAll('.cell:empty')
    const cellRandom = cellsEmpty[Math.floor(Math.random() * cellsEmpty.length)]

    cellRandom.innerText = 'O'

    // move is done, we can set isWaiting to false
    isWaiting = false

    const winningCellsO = getWinningCells(boardElement, 'O')

    if (winningCellsO) {
      highlightCells(winningCellsO)
      statusElement.innerText = 'O won!'
      gameElement.classList.add('game-over')
      return
    }
  }

  // moved the draw logic here, we are querying for empty cells again, because 'O' made a move
  // we could also check for the length being 1, but this is more explicit
  const cellsEmptyRemaining = gameElement.querySelectorAll('.cell:empty')

  if (cellsEmptyRemaining.length === 0) {
    statusElement.innerText = 'Draw!'
    gameElement.classList.add('game-over')
    return
  }
}
```

That should be enough for a basic 4x4 game. However, we have reached this solution with quite a few naive assumptions. For example, we are assuming that the game must have 2 players and at least one of them is a human player. What if we will want to add a new mode in the future? What if we want to change player symbols? We would need to change the code in multiple places. This is not a sign of good code.

## Step 8: Split the code into modules

The previous requirements were relatively simple. We could have easily implemented them in a few functions. However, the third part is designed to expose our code to the shortcomings of our current approach. Our assumptions on player types, move order, player count, their symbols, board size and the way moves are made by each player allowed us to quickly develop a working solution without much of thinking ahead. However, this has left us with a code that is not very flexible and is hard to extend.

This is a common situation in software development. We can cut corners based around the idea that some requirements will not change. However, this is rarely the case. Requirements change all the time. We need to be able to adapt to these changes. This is why we need to write code that is flexible and easy to extend.

A good design anticipates possible changes and makes it easy to implement them. At the same time, trying to anticipate these changes does not mean that we should try to implement them [before they are needed](https://en.wikipedia.org/wiki/You_aren%27t_gonna_need_it). There is a fine balance between nearsighted approach of implementing what is needed right now and [overengineering](https://en.wikipedia.org/wiki/Overengineering) a solution.

In this third part of this exercise, we will assume that our game now needs to support a lot more features. This will be a good time to work on the design of our code.

We need to condsider a few things:
- the human player might be not the first one to make a move, so we will need to handle the game logic outside of our click handler
- we can not make direct references to particular player types, symbols, board size, etc. in our game logic as it needs to support different types of players, symbols, board sizes, etc. We should be able to interact with these concepts without knowing the details of their implementation. So we will be using `player` instead of `humanPlayer` or `aiPlayer`, `symbol` instead of `X` or `O`, `board` instead of clearly defined array of 4x4 board size etc.

Ideally, we would like to have a game loop that would look something like this:

```js
// while there are no winning cells and the board is not full
while (!board.winningCells && !board.isFull) {
  // player is any type of player - human or AI
  const cell = player.getMoveCell()

  board.markCell(cell, player.symbol)
}

// once outside the game loop, handle the game result
```

This seems to be on the right path, but we need:
- a shared player interface across all player types - a list of methods and properties that we can expect from any player
- board, which encapsulates the current state of the board - the cells
- game, which encapsulates the role of the person tracking whose turn it is and whether the game is over

Let's create an appropriate file structure for these concepts:

  ```
  src/
    index.js
    game.js
    board.js
    players/
      humanPlayer.js
      randomPlayer.js
      index.js // contains a list of all player types
  ```

Now, what will we use to represent these concepts? We will consider two approaches:
- functions and plain objects
- classes with methods

At their core, both do the same thing - they encapsulate state and methods that operate on that state. The difference is in how the code is structured.

Right now, we'll use classes as you should be aware of their structure from Python. But it is entirely possible to achieve the same result with plain objects and closures.

```js
// index.js
document.querySelect('.start-game').addEventListener('click', () => {
  const gameElement = event.target.closest('.game')
  const boardElement = gameElement.querySelector('.board')

  // form an array of players using <select> fields inside the game container
  const players = getPlayers(gameElement)

  const board = new Board(boardElement)
  const game = new Game(gameElement, players)

  await play(game, board, players)
})

async function play(gameElement, players) {
  const game = new Game(/* ... */) // or createGame() if you prefer a classless approach
  const board = new Board(/* ... */)

  while (!board.getWinningCells() && !board.isFull()) {
    const player = game.nextPlayer()

    // let player to see the board in order to make a move
    const cell = await player.getMoveCell(boardElement)

    board.markCell(cell, player.symbol)
  }

  // handle end of the game
}
```

After refactoring our code into separate modules, we can end up with something like this:

`index.js`:

```js
import RandomPlayer from './players/randomPlayer.js'
import Game from './game.js'
import Board from './board.js'

document.addEventListener('DOMContentLoaded', () => {
  const gameElement = document.querySelector('#game')

  // let's have a list of players, which right now includes 2 random players
  const players = [
    // we will pass each player their symbol
    new RandomPlayer('X'),
    new RandomPlayer('O'),
  ]

  play(gameElement, players)
})

async function play(gameElement, players) {
  const boardElement = gameElement.querySelector('#board')

  const game = new Game(players)
  const board = new Board(boardElement)

  while (!board.getWinningCells() && !board.isFull()) {
    const player = game.nextPlayer()
    const cell = await player.getMoveCell(boardElement)

    board.markCell(cell, player.symbol)
  }

  // we will handle the end of the game later
}
```

`players/randomPlayer.js`:

```js
// same as function(symbol) { return { getMoveCell() { ... } } }
export default class RandomPlayer {
  symbol

  constructor(symbol) {
    this.symbol = symbol
  }

  // we will allow the player to see the current state of the board to make a move
  getMoveCell(boardElement) {
    const cellsEmpty = boardElement.querySelectorAll('.cell:empty')

    // a way to get a random cell from a list of cells
    const cellRandom = cellsEmpty[Math.floor(Math.random() * cellsEmpty.length)]

    return cellRandom
  }
}
```

`game.js`:

```js
export default class Game {
  gameElement
  players = []

  // we could use 0, but having an initial value of -1
  // allows us to select the player before their move starts, which
  // means that once the game ends, the playerCurrent will be the winning player,
  // which is quite handy
  playerIndex = -1

  constructor(gameElement, players) {
    this.gameElement = gameElement
    this.players = players
  }

  getPlayerCurrent() {
    return this.players[this.playerIndex]
  },

  // we should not use a getter here, as we are changing the state of the game
  // and it is not a good idea to change the state of an object through a getter
  nextPlayer() {
    this.playerIndex = (this.playerIndex + 1) % this.players.length

    return this.getPlayerCurrent()
  },
}
```

`board.js`:

```js
export default class Board {
  boardElement

  constructor(boardElement) {
    this.boardElement = boardElement
  }

  markCell(cell, symbol) {
    cell.innerText = symbol
  },

  isFull() {
    return boardElement.querySelectorAll('.cell:empty').length === 0
  },

  getWinningCells() {
    /* a long implementation, which can be generated through ChatGPT */
  },
}
```

The code for the end of the game is rather simple, so we will not cover it here. Instead, we will focus on implementing asynchronous players.

## Step 9: Migrate player logic into separate objects/classes

First, let's make our **random player** asynchronous. We can do this by returning a Promise from `getMoveCell`:

```js
export default class RandomPlayer {
  /* ... */

  // pseudo-code
  async getMoveCell(boardElement) {
    // wait 500ms
    await waitFor(500)

    // get the empty cells
    const cellsEmpty = getEmptyCells(boardElement)

    return getRandomItem(cellsEmpty)
  }
}

const waitFor = ms =>
  new Promise(resolve => setTimeout(resolve, ms))

const getEmptyCells = boardElement =>
  boardElement.querySelectorAll('.cell:empty')

const getRandomItem = array =>
  array[Math.floor(Math.random() * array.length)]
```

What about a **human player** who used to be the core of our game? This one is a bit more tricky.

We want to listen for the user clicking on a cell. We could create a single event listener in the constructor, but that would require passing the board element to the constructor. Ideally, we would like the `getMoveCell` to contain all the necessary logic for making a move.

While there are multiple ways how to achieve this, let's attempt using a Promise in the `getMoveCell`.

We can use a promise to represent the human player's move as well. We can resolve the Promise when the user clicks on a cell.

`humanPlayer.js`:

```js
export default class HumanPlayer {
  /* ... */

  async getMoveCell(boardElement) {
    return new Promise((resolve) => {
      // pseudo code
      resolve(userClickedCell)
    })
  }
}
```

How can we make it so we resolve with the clicked cell? We can add an event listener to the board element and resolve the Promise when the user clicks on a cell:

```js
export default class HumanPlayer {
  /* ... */

  async getMoveCell(boardElement) {
    return new Promise((resolve) => {
      boardElement.addEventListener('click', (event) => {
        // select the cell
        const cell = event.target.closest('.cell')

        // resolve only if it is a cell and it is empty
        if (cell && cell.innerText) {
          resolve(cell)
        }
      })
    })
  }
}
```

This should work. However, there is one technical issue with this event listener. Every time we call `getMoveCell`, a new `click` event listener is added. This is not a good practice as we create unnecessary listeners and we could end up experiencing some hard-to-track bugs. We should remove the event listener when the promise is resolved. If we search for this online, we find multiple ways how to do this:
- ~~`once: true` - does not work as the event listener is removed if user clicks on a cell that is already taken~~
- `removeEventListener` - we would need to keep a reference to the event listener
- creating a shared event listener when the player is created, though this require some logic outside the `getMoveCell` method
- using an `AbortController` - this is a bit more advanced, but it is the cleanest solution

If we implement the `AbortController` solution, we should have something like this.

```js
export default class HumanPlayer {
  /* ... */

  async getMoveCell(boardElement) {
    return new Promise((resolve) => {
      const abortController = new AbortController()

      boardElement.addEventListener('click', (event) => {
        const cell = event.target.closest('.cell')

        if (cell && cell.innerText) {
          // stop listening for clicks
          abortController.abort()

          resolve({ cell })
        }
      }, { signal: abortController.signal })
    })
  }
}
```

Now we should be able to play a game against a random AI:

```js
import HumanPlayer from './players/humanPlayer.js'
import RandomPlayer from './players/randomPlayer.js'
/* ... */

document.addEventListener('DOMContentLoaded', () => {
  const gameElement = document.querySelector('#game')

  const players = [
    new RandomPlayer('X'),
    new HumanPlayer('O'),
  ]

  play(gameElement, players)
})

/* ... */
```

What about the **GPT player**?

`gptPlayer.js`:

```js
export default class GptPlayer {
  symbol

  constructor(symbol) {
    this.symbol = symbol
  }

  async getMoveCell(boardElement) {
    const boardState = stringifyBoard(boardElement, columns) // convert the board to a string representation
    const response = await getAiResponse(boardState) // use a fetch request here
    const coordinates = toCellCoordinates(response) // convert the response to a cell coordinates
    const cell = getCell(boardElement, coordinates) // use coordinates to get the cell in the board

    return cell
  }
}
```

A possible implementation of each of these functions is presented in the solution code. It includes some more advanced techniques, such as a request timeout, retrying the request and the AI providing commentary on its moves.

## Step 10: (Bonus) Implement player and symbol selection

- Allow the user to select the opponent
- Allow the user to select their preferred symbol

Right now we have a hardcoded list of players in `index.js`. Instead of a static array, we can create a few select fields that will allow the user to select the players. There are multiple ways how to do this. We could use the simple approach of adding everything to the HTML file, or we could generate the HTML dynamically.

In contrast to the previous steps, we will demonstrate a different approach - dynamic HTML generation. This approach is more complex, but it is more flexible as it allows to easily add more players and symbols without changing the HTML file.

We can use a `<select>` element which lists all of the available players. We would need to add a label property to our players, so that we can display the player name in the select field. We would like to keep the player instance logic and the player label in a single object. This is a good use case for migrating our player objects to classes as it allows us to store the player name in a `static` property.

`RandomPlayer.js`:

```js
export default class RandomPlayer {
  // property accessable without creating an instance of the class
  static label = 'Random AI'

  // instance properties
  symbol = null

  constructor(symbol) {
    this.symbol = symbol
  }

  async getMoveCell(boardElement) {
    /* ... */
  }
}
```

Now we can map each of our Player classes to an `<option>` element:

```js
const playerOptionsHtml = playerOptions
  // we are tracking selected option value by index
  .map((playerOption, index) => option(index, playerOption.label))
  .join('\n')

const option = (value, label) =>
  `<option value="${value}">${label}</option>`
```

Then we need to wrap these options in a `<select>` element:

```js
const selectHtml = `<select name="player">${playerOptionsHtml}</select>`
```

We would need to repeat this for symbols and then for each player slot. It is possible to do this by copy pasting code, but it is not a good practice. Instead, we could map an array of player slots to an array of `<select>` elements:

```js
function formPlayerSelects(playerOptions, playerCount) {
  return new Array(playerCount)
    .fill() // [undefined, undefined]
    .map((_, selectIndex) => { // we ignore the first argument and use only the second one - index
      const playerSelectHtml = /* ... */
      const symbolSelectHtml = /* ... */

      // wrap both selects in a div
      return `<div class="player">${symbolSelect} ${playerSelect}</div>`
    })
    .join('vs.')
}
```

We will then need a function which will extract the selected player and symbol from the `<select>` elements:

```js
function getPlayers(playerSelects, playersOptions) {
  return [...playerSelects.querySelectorAll('.player')]
    .map(playerElement => {
      const playerIndex = playerElement.querySelector('[name="player"]').value
      const symbol = playerElement.querySelector('[name="symbol"]').value

      return {
        Player: playersOptions[Number(playerIndex)],
        symbol,
      }
    })
    .map(({ Player, symbol }) => new Player(symbol))
}
```

## Step 11: (Bonus) Implement the remaining core features

By this point, the game should be playble. However, there are still a few features missing. In order to keep this tutorial short, we will not cover them here, but we will list all of functions that were used to implement these features in the provided solution:

- Clean up after every game (`game.reset`, `board.reset`)
- Error handling - display an error message when something goes wrong, e.g. when the AI does not respond (`displayError`)

## Step 12: (Bonus) Consider the ease of change

Think about how simple it would be to modify the game. For instance:
- Having more than 2 players
- Ability to configure the board size
- Ability to configure the required number of cells in a row to win
- Ability to add more symbols

These are potential enhancements to the game. A well-designed solution should make it relatively easy to implement these features, even without full knowledge of the codebase.

Ideally, some of these features should be almost "free." For example, if we want to allow the user to select more than two players, we should be able to do so by simply adding more players to the list of players. We should not need to modify the code that manages the board, game loop, or player selection.

Given we have already implemented the player, game and board objects, it should be sufficient to move out the variables such as player count, board size and symbol list into a separate config file. This would allow us to easily change these values without modifying the code.

## Step 13: (Bonus) Improve the UX and address possible issues

Ways to enhance the user experience:
- Show that the AI is taking time to make a move
- Ensure the game is accessible on mobile devices, at least up to a certain board size
- Display the game board only when the game is ready to start

Potential issues to address:
- What happens if a request to the AI times out?
- What if multiple players choose the same symbol?
- What if a human player tries to make a move while the AI is still making a move?

These are significant issues that are addressed in the solution code.

## Step 14: (Bonus) Refactor the code

- Move large functions to separate files
- Assess method access. For instance, if the `game` has a method that is only used internally, it should not be accessible externally. This can be achieved by not including the method in the `game` object or by using prepending private class methods with a `#`.

The final solution incorporates most of these refactorings.
