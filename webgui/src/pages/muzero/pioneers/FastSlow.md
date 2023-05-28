---
title: Pioneers - Thinking, Fast and Slow
desc: Pioneers ...
---

In 2002, "Princeton University psychologist Daniel Kahneman, PhD, was awarded the Nobel Memorial Prize in Economic Sciences
for his groundbreaking work in applying psychological insights to economic theory, particularly in the areas of judgment
and decision-making under uncertainty" [](http://www.apa.org/monitor/dec02/nobel.html).

In 2011 Daniel Kahneman published a best-selling book: [Thinking, Fast and Slow](https://en.wikipedia.org/wiki/Thinking,_Fast_and_Slow).
It reveals two ways of our thinking:
* [“fast” pattern matching](https://www.google.com/url?sa=t&rct=j&q=&esrc=s&source=web&cd=&cad=rja&uact=8&ved=2ahUKEwijlvP3_d7wAhUM2BQKHVNSAgIQqJcEMBV6BAgjEAs&url=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3DCjVQJdIrDJ0%26t%3D366&usg=AOvVaw3EHMxrd1UgSakUKeLIeTus)
* [“slow” planning](https://www.google.com/url?sa=t&rct=j&q=&esrc=s&source=web&cd=&cad=rja&uact=8&ved=2ahUKEwijlvP3_d7wAhUM2BQKHVNSAgIQqJcEMBV6BAgjEA0&url=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3DCjVQJdIrDJ0%26t%3D413&usg=AOvVaw1lCsl5OsYIi08ja46-2Kxs)


DeepMind's team built MuZero on these patterns.
* **fast pattern matching** is performed by the neural network on a straight path from observation to action prediction.
* **slow planning** is done in Monte Carlo tree search, where the planning goes beyond the predictions made by the neural network
  while using them as a basis, which
  narrows the decision tree in width (action prediction) and depth (value prediction).

In MuZero, the fast thinking neural network is trained by the experience produced by slow thinking.

Following these human thought patterns, MuZero produces creative-looking moves
that [shed new light on the great games of Chess, Shogi, and Go](https://deepmind.com/blog/article/alphazero-shedding-new-light-grand-games-chess-shogi-and-go).
