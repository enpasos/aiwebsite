---
title: Pioneers - Thinking, Fast and Slow
desc: Pioneers ...
---

In 2002, "Princeton University psychologist Daniel Kahneman, PhD, was awarded the Nobel Memorial Prize in Economic Sciences
for his groundbreaking work in applying psychological insights to economic theory, particularly in the areas of judgment
and decision-making under uncertainty" [](http://www.apa.org/monitor/dec02/nobel.html).

In 2011 Daniel Kahneman published a best-selling book: [Thinking, Fast and Slow](https://en.wikipedia.org/wiki/Thinking,_Fast_and_Slow).
It reveals two ways of our thinking:
* [fast, intuitive thinking](https://www.google.com/url?sa=t&rct=j&q=&esrc=s&source=web&cd=&cad=rja&uact=8&ved=2ahUKEwijlvP3_d7wAhUM2BQKHVNSAgIQqJcEMBV6BAgjEAs&url=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3DCjVQJdIrDJ0%26t%3D366&usg=AOvVaw3EHMxrd1UgSakUKeLIeTus)
* [slow, rational thinking](https://www.google.com/url?sa=t&rct=j&q=&esrc=s&source=web&cd=&cad=rja&uact=8&ved=2ahUKEwijlvP3_d7wAhUM2BQKHVNSAgIQqJcEMBV6BAgjEA0&url=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3DCjVQJdIrDJ0%26t%3D413&usg=AOvVaw1lCsl5OsYIi08ja46-2Kxs)


MuZero is built on these patterns:

::: tip fast and slow action decision
**fast action prediction** is performed by the neural network on a straight path from observation to action prediction.
<br>**slow planning** is done in an algorithmic tree search using the neural network to partially unfold the decision tree in-mind.
:::

During training, the experience gained from slow-thinking is then used to train the fast-thinking neural network, or more abstractly, the model.
During playout, a budget of inference steps can be used to steer how fast and rashly or how slow and deliberate the decision may be (with Gumbel MuZero).

Following these human thought patterns, MuZero's predecessor, AlphaZero, already produced creative-looking moves that [shed new light on the great games of Chess, Shogi, and Go](https://deepmind.com/blog/article/alphazero-shedding-new-light-grand-games-chess-shogi-and-go).
