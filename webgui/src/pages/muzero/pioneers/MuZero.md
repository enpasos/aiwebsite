---
title: Pioneers - MuZero & Beyond
desc: Pioneers ...
---

## MuZero

[MuZero (DeepMind's blog post)](https://deepmind.com/blog/article/muzero-mastering-go-chess-shogi-and-atari-without-rules).

Julian Schrittwieser from the DeepMind team gives insight in his [Video Talk](https://www.youtube.com/watch?v=L0A86LmH7Yw)
and [Intuition Blog](http://www.furidamu.org/blog/2020/12/22/muzero-intuition/).

The corresponding paper has been published in [Nature, Dec 2020](https://www.nature.com/articles/s41586-020-03051-4) [(shared access by the authors ...)](https://www.davidsilver.uk/publications/) together with
[pseudocode](https://www.nature.com/articles/s41586-020-03051-4), [github](https://gist.github.com/Mononofu/6c2d27ea1b3a9b3c1a293ebabed062ed).


## Beyond MuZero


### Efficient MuZero

**2021 - Mastering Atari Games with Limited Data (EfficientZero)**
[paper](https://proceedings.neurips.cc/paper/2021/hash/d5eca8dc3820cad9fe56a3bafda65ca1-Abstract.html),
[github](https://github.com/YeWR/EfficientZero),
[blog1](https://www.furidamu.org/blog/2021/12/04/mastering-atari-games-with-limited-data/),
[blog2](https://www.alignmentforum.org/posts/mRwJce3npmzbKfxws).
Three improvements to MuZero in efficiency concerning environment interactions:
- Self-Supervised Consistency Loss
- End-To-End Prediction of the Value Prefix
- Model-Based Off-Policy Correction

_Weirui Ye, Shaohuai Liu, Thanard Kurutach, Pieter Abbeel, Yang Gao_


**2021 - Online and Offline Reinforcement Learning by Planning with a Learned Model**
[paper](https://arxiv.org/abs/2104.06294),
[blog](https://www.furidamu.org/blog/2021/12/04/online-and-offline-reinforcement-learning-by-planning-with-a-learned-model/),
[github](https://gist.github.com/Mononofu/466dbd67031b63e8052674e2599f3970),
[video](https://www.youtube.com/watch?v=pgZhGavMHcU).
Improving MuZero in efficiency concerning environment interactions by planning from previously experienced states without acting in the environment.
<br>_DeepMind_
<br>_Julian Schrittwieser, Thomas Hubert, Amol Mandhane, Mohammadamin Barekatain, Ioannis Antonoglou and David Silver_

### Improving the policy when using less inference steps

**2021 - Policy improvement by planning with gumbel** [paper](https://openreview.net/forum?id=bERaNdoegnO), [github](https://github.com/deepmind/mctx)
<br>_DeepMind_
<br>_Ivo Danihelka, Arthur Guez, Julian Schrittwieser, David Silver_



### Improve robustness of model

**2021 - Self-consistent models and values** [paper](https://proceedings.neurips.cc/paper/2021/file/08f0efebb1c51aada9430a089a2050cc-Paper.pdf)
<br>Making a model's relation between value function and reward self-consistent in the vicinity of experience.
<br>_DeepMind, University of Oxford_
<br>_Greg Farquhar, Kate Baumli, Zita Marinho, Angelos Filos, Matteo Hessel, Hado P van Hasselt and David Silver_

### From discrete to arbitrarily complex action spaces
**2021 - Learning and Planning in Complex Action Spaces** [paper](http://proceedings.mlr.press/v139/hubert21a/hubert21a.pdf)
<br>_DeepMind_
<br>_Thomas Hubert, Julian Schrittwieser, Ioannis Antonoglou, Mohammadamin Barekatain,
Simon Schmitt and David Silver_

### Extension to stochastic environments
**2022 - Planning in stochastic environments with a learned model** [paper](https://openreview.net/pdf?id=X6D9bAHhBQ1), [blog](https://www.furidamu.org/blog/2022/05/15/planning-in-stochastic-environments-with-a-learned-model/), [github](https://gist.github.com/Mononofu/7548d8aa4bf94e12bc7eb7662fd60b56)
<br>_DeepMind, University College London_
<br>_Ioannis Antonoglou, Julian Schrittwieser, Sherjil Ozair, Thomas Hubert and David Silver_


### MuZero’s steps from research into the real world
**2022 - YouTube video compression** [blog](https://deepmind.com/blog/article/MuZeros-first-step-from-research-into-the-real-world), [paper](https://storage.googleapis.com/deepmind-media/MuZero/MuZero%20with%20self-competition.pdf)
<br>Demonstrates an average 4% bitrate reduction on a portion of YouTube’s live traffic
<br>_DeepMind, Google_
<br>_Amol Mandhane, Anton Zhernov, Maribeth Rauh, Chenjie Gu, Miaosen Wang,
Flora Xue, Wendy Shang, Derek Pang, Rene Claus, Ching-Han Chiang,
Cheng Chen, Jingning Han, Angie Chen, Daniel J. Mankowitz, Jackson Broshear,
Julian Schrittwieser, Thomas Hubert, Oriol Vinyals and Timothy Mann_

**2022 - Discovering novel algorithms with AlphaTensor** [blog](https://www.deepmind.com/blog/discovering-novel-algorithms-with-alphatensor), [paper](https://www.nature.com/articles/s41586-022-05172-4), [github](https://github.com/deepmind/alphatensor)
<br>It is the first artificial intelligence (AI) system for discovering novel, efficient, and provably correct algorithms for fundamental tasks such as matrix multiplication.
<br>_DeepMind, Google_
<br>_Alhussein Fawzi, Matej Balog, Aja Huang, Thomas Hubert, Bernardino Romera-Paredes, Mohammadamin Barekatain, Alexander Novikov,
Francisco J. R. Ruiz, Julian Schrittwieser, Grzegorz Swirszcz, David Silver, Demis Hassabis, Pushmeet Kohli_


