We will cover a single possible implementation of the Tic Tac Toe game. There are many other ways to implement it, and you are encouraged to explore them on your own:
- objects communicating by emitting events
- component-based code encapsulation
- game state with a render function

## Step 1: Build basic a minimal (ugly) game UI

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

```css
.board {
  /* 3x3 grid */
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);
  gap: 1rem;
}

.cell {
  aspect-ratio: 1;
  background-color: var(--cell-color);
  border-radius: var(--border-radius);
  transition: background-color 0.2s ease-in-out;
  font-size: var(--cell-font-size);

  display: flex;
  align-items: center;
  justify-content: center;
}

.cell:hover {
  background-color: red;
}
```

Nothing fancy, but it gets the job done.

## Step 2: Explore the problem by building a naive solution

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

What about the **AI player?** We can create a simple function that will randomly select a cell and place an `O` in it.

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

We can create a simple function that will check if someone has won before working on the consequences.

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

  // map each cell index to the cell element in DOM
  const cellsCombinations = winningCombinations
    .map(combination => combination.map(index => cells[index]))

  // find a combination where every cell is either X or O
  return cellsCombinations
    .find(combination => combination
      .every(cell => cell.innerText === symbol || cell.innerText === symbol))
}
```

Now, we can use this function to check if someone has won and display a message.

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

Alright, this works, but at this point our "code smell" senses should be tingling. That is, our code works and it satisfies a a couple of main game requirements but it has some serious problems:
- it is not straightforward to change some key details, such as who should start the game
- some parts of the code are repeated and we would need to add more repetetive code to add more features such as declaring a draw

Before we proceed, let's try to step back and think about how we can rethink the problem.

## Step 3: Split the code into modules

Ideally, we would like to have a game loop that would look something like this:

```js
while (!hasWinner() && !isDraw()) {
  player = getPlayer()
  player.makeMove()
}
```

Our game loop should not be concerned with the details of who the player is - human or AI. It should be indifferent to player symbols (`X`, `O`, ...), player count, their name or anything else that is inherent to the player. It should only "care" about the fact that a player can make a move. This is a good example of **abstraction**.

We need to condsider a few things:
- the human player might be not the first one to make a move, so we will need to start the game loop outside of out click handler
- the human and a GPT AI player will perform their moves **asynchronously**, so the game loop will need to be asynchronous as well

```js
// pseudo code
let players = [HumanPlayer, RandomPlayer]
let playerIndex = 0
let winningLine = null
let isDraw = false

while (!winningLine && !isDraw) {
  // next player
  playerIndex = (playerIndex + 1) % players.length
  const player = players[playerIndex]

  // let the player to see the current state of the board
  // and return a cell for their move
  const cell = await player.makeMove(boardElement)

  // somehow mark the cell on the board
  markCell(cell, player.symbol)

  winningLine = getWinningLine(boardElement, winLength)
  isDraw = isBoardFull(boardElement)
}

// handle the game result
```

This seems to be on the right path, but we need to manage quite a few variables. We could further abstract the problem with 2 more objects:
- game, which encapsulates the role of the person tracking who's turn it is and whether the game is over
- board, which encapsulates the current state of the board - the cells, but it knows nothing about the players

**Note: When to use objects and when to use functions?** In general, if we can neatly encapsulate the state and methods relating to that state, then we should. But that does not necessarily mean using classes.

- If we need to wrap private state behind a few methods, then we could use a object.
- If we want to have a mixed private/public state and methods managing that state, then the class syntax is a suitable choice, though even then we could use plain objects and closures.

To encapsulate the state and methods relating to that state, we can use a few different approaches:
- plain objects inside a function closure
- classes

Right now, we'll use classes as you should be aware of their structure from Python. But it is entirely possible to achieve the same result with plain objects and closures.

```js
async function play(gameElement, players) {
  const game = new Game(/* ... */) // or createGame() if you prefer using plain objects
  const board = new Board(/* ... */)

  while (!board.winningLine && !board.isFull) {
    const player = game.nextPlayer()
    const cell = await player.getMoveCell(gameElement)

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

  while (!board.winningLine && !board.isFull) {
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
  getMoveCell(gameElement) {
    const cellsEmpty = gameElement.querySelectorAll('.cell:empty')

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

  // we could also use getPlayerCurrent() instead, but this is a bit cleaner as it allows
  // us to access game.playerCurrent instead of game.getPlayerCurrent()
  get playerCurrent() {
    return this.players[this.playerIndex]
  },

  // we should not use a getter here, as we are changing the state of the game
  // and it is not a good idea to change the state of an object through a getter
  nextPlayer() {
    this.playerIndex = (this.playerIndex + 1) % this.players.length

    return this.playerCurrent
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

  get isFull() {
    return boardElement.querySelectorAll('.cell:empty').length === 0
  },

  get winningLine() {
    /* a long implementation, which can be generated through ChatGPT */
  },
}
```

The code for the end of the game is rather simple, so we will not cover it here. Instead, we will focus on implementing asynchronous players.

## Step 4: Add asynchronous players

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

What about a **human player**? This one is a bit more tricky.

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

## Step 5: Implement the player selection

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
      return `<div data-player-select>${symbolSelect} ${playerSelect}</div>`
    })
    .join('vs.')
}
```

We will then need a function which will extract the selected player and symbol from the `<select>` elements:

```js
function getPlayers(playerSelects, playersOptions) {
  return [...playerSelects.querySelectorAll('[data-player-select]')]
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

## Step 6: Implement the remaining core features

By this point, the game should be playble. However, there are still a few features missing. In order to keep this tutorial short, we will not cover them here, but we will list all of functions that were used to implement these features in the provided solution:

- Clean up after every game (`game.reset`, `board.reset`)
- Display who's turn it is (`game.updatePlayerStatus`)
- Display the winner or draw (`game.declareWinner`, `game.declareDraw`)
- Highlight the winning cells (`board.markCellsWon`)
- Error handling - display an error message when something goes wrong, e.g. when the AI does not respond (`displayError`)

## Step 7: (Bonus) Consider the ease of change

Think about how simple it would be to modify the game. For instance:
- Allowing a user to choose more than two players
- Letting a user select the board size
- Permitting a user to change the required number of cells in a row to win
- Enabling a user to play multiple games simultaneously on the same page
- Allowing a developer to add more symbols
- Letting a developer include non-single-character symbols, like emojis

These are potential enhancements to the game. A well-designed solution should make it relatively easy to implement these features, even without full knowledge of the codebase.

Ideally, some of these features should be almost "free." For example, if we want to allow the user to select more than two players, we should be able to do so by simply adding more players to the list of players. We should not need to modify the code that manages the board, game loop, or player selection.

## Step 8: (Bonus) Improve the UX and address possible issues

Ways to enhance the user experience:
- Choose a specific theme for the game
- Show that the AI is taking time to make a move
- Ensure the game is accessible on mobile devices
- Display the game board only when the game is ready to start

Potential issues to address:
- What happens if a request to the AI times out?
- How can we reduce the likelihood of the AI making an invalid move?
- What occurs if we start a new game while the AI is still making a move?
- What if multiple players choose the same symbol?
- What if a human player tries to make a move while the AI is still making a move?

These are significant issues that are addressed in the solution code. They are not solved in an ideal manner, as that is beyond the scope of this tutorial. However, resolving these issues would be necessary to make the game production-ready.

## Step 9: (Bonus) Refactor the code

- Consider using data attributes for JavaScript bindings, which separates CSS selectors from JavaScript logic
- Evaluate potential performance pitfalls, if any
- Move large functions to separate files
- Transfer general game configuration to a separate file
- Assess method access. For instance, if the `game` has a method that is only used internally, it should not be accessible externally. This can be achieved by not including the method in the `game` object or by using a `class` object with `#` to make some methods private.
- Document complex functions with JSDoc

The final solution incorporates most of these refactorings.
