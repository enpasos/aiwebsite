---
title: Here - Tic-Tac-Toe
heading: true
editLink: true
components:
  - ./TicTacToe2
---

Before entering the MuZero world jump for nostalgia to the 80's ... [WarGames](https://www.youtube.com/watch?v=F7qOV8xonfY)

We have implemented **Gumbel MuZero** with DJL on the backend for training, ONNX transfer of the model from backend to browser and TypeScript/WebAssembly in the browser. We have tested it on the trivial game TicTacToe
with a single GPU for training ([stack for training](muzero/here/How#stack-used-here-for-training)). Starting from scratch it learns perfect play in games from start within 2.000 training steps and 50.000 game plays in half an hour.

<ticTacToe2 title="Game Tic-Tac-Toe"   />

Source UI component: [Tic Tac Toe In JavaScript With Source Code](https://code-projects.org/tic-tac-toe-in-javascript-with-source-code/)


