---
title: Here - Go
heading: true
editLink: true
components:
  - ./Go
---

Watch the great documentary [AlphaGo - The Movie | Full Documentary](https://www.youtube.com/watch?v=WXuK6gekU1Y)
about the historical event when legendary Go player Lee Sedol played against AlphaGo. It shows some of the
breathtaking achievements of the DeepMind's team.

The book
[deep learning and the game of go](https://www.manning.com/books/deep-learning-and-the-game-of-go) by [Max Pumperla](https://maxpumperla.com/) and Kevin Ferguson
helped us a lot to dive into the subject matter. We used the go environment within Max Pumperla's project [ScalphaGoZero](https://maxpumperla.com/ScalphaGoZero/) during selfplay of our MuZero implementation.

<go title="Game Go" />

Go5 is running. Go9 is in preparation.

The trained MuZero networks are loaded from the server when the page is initialized. You can choose the number of recurrent inference steps during MCTS by moving the slider.
The ai does all inference steps on your device. Go Rules: area scoring.

Source UI components: [tenuki](https://github.com/aprescott/tenuki), [Google Charts](https://developers.google.com/chart)




