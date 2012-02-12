# Typist

`Typist` is simple game to practice 10 finger typing.

Words will fall down, and to keep the game going you need to type them before they reach the ground.


## Working bits

The basic game behavior is implemented; words fall, key pressed are recorded and matched agains the expected value. Errors are detected and counted.


## Missing bits

The initial selection of `lessons` sounds very boring, and it is also very limited.

It is probably more feasable to just pick random sequence of letters (instead of real words), possibly from a specific sets that will change with the level of the game (initially using only letters on the central row, adding top/bottom rows after a while, adding punctuation marks later on, etc…).
Another interesting option to add would be to let the user copy/paste a text, and just practice re-typing it in.

At the moment, once the word hits the ground, the game just alts. All the effort to create a full game around the `hit the word` activity is still missing.
