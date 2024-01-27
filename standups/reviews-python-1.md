- How you were building?
- What you were most proud of?
- Notes on how to improve.

Notes:
// - Introduce user to the rules of the game
## Coding to an interface instead of coding to an implementation

## Error handling
- Error handling. You want to publish errors to an external service.

## Adding opponents
- What if you would like to add an additional algorithm? Then you would have 3 algorithms. What if you would like to choose 2 of the 3 algorithsm you'd like to play?

A more declarative approach for declaring players. Right now it is based on `opponent_idx`. OPPONENT_TYPES are declared in the constants file.

Could players be an array of objects? Right now there are `if` statements that branch out based on the player count.
- Adding a second human player.
- If requirements change, the fewer places we need to change the better. For rules, it's ideal. You don't need to change the UI, the Python code.

Great:
- Declarative rules in a static file, like JSON. Ideal approach, as the JSON file is completely decoupled from the code. It could be used by another program even written in a different programming language.

## Translating
- You publish it to GitHub. Someone likes your game a lot. They want to translate it, to let's say German. Could they do it easily?

## Unit tests
- Unit tests
  - Would you be confident to give this code to someone else to work on? Let's say they change something, say tests pass. Would you be confident that the game still works?
  - Unit tests often reveal issues with code architecture. For example, if to test a single function you need to create a lot of setup code, it's a sign that the code could be too coupled.

## Minor code duplication
- Some code duplication

## File structure
