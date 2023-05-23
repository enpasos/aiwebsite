---
title: Here - Approach
---



## Challenge and Approach

To make MuZero work, it is essential to parallelise the neural network's activities while avoiding low-bandwidth data transports.

To get a feeling what this is about let's look at the hardware used for the original MuZero training:
[MuZero on Google TPUv3](https://youtu.be/L0A86LmH7Yw?t=396) or [cloud.google.com/tpu](https://cloud.google.com/tpu)
and compare it to typical low budget hardware ... the one we are starting with:
[NVIDIA GEFORCE RTX 4090](https://www.nvidia.com/de-de/geforce/graphics-cards/40-series/rtx-4090/).

MuZero runs on a feedback loop of selfplay and training. The hardware needed of selfplay compared to training can be estimated
from the MuZero author's statement "For each board game, we used 16
TPUs for training and 1000 TPUs for selfplay."

Whereas MuZero broadens the scope from classical board games to the area of classical video games, let us start here
from the roots: classical board games.
We start with the trivial game TicTacToe that has roughly 250.000 possible games and therefore comes with a decision tree that
can easily be fully evaluated for testing. We are using it as an integration test in our continuous integration (CI) pipeline.
We proceed with go games on 5x5 and 9x9 board (instead of 19x19) - 9x9 has [about 10^38 legal positions](https://en.wikipedia.org/wiki/Go_and_mathematics).



## Performance critical aspects

### Batch training and batch selfplay

The overall time spend on transport to gpu and operations on gpu is larger (for the hardware we use) than the time spend on Java which is automatically hotspot optimized.
Therefore special performance focus has to be taken on neural network operations.

The tensor we transport to the gpu has four dimensions (training and inference):
* batch dim
* feature planes
* one spacial dim of one feature plane
* other spacial dim of one feature plane




### Symmetry to reduce selfplay effort

TicTacToe and Go have a board symmetry (as mentioned in the Alpha Go papers) that allows us to make 8 selfplays out of one. The symmetry operations are done directly on the device which saves transport time.


## Network architecture

Let's sketch the network-structure:

![Flexbox Justify Content](/network.svg)

Bottom-up means from input to output. Left-right does inference timestep by timestep, starting with initially consuming
the observation, transforming it to an internal "embedded" state, that is then propagated forward by the network on each
action during Monte Carlo Tree Search (MCTS).

![Flexbox Justify Content](/network2.svg)



### Representation, Dynamics and Prediction

The functional building blocks of MuZero networks are a representation, a dynamic and a prediction function. A network has one
instance of each - that is, each time the dynamic function is used in inference, it is the same one with the same
parameters - this is also true for the prediction function.

For board games (no reward head in the dynamics function and representation/dynamics functions with the same structure)

![Flexbox Justify Content](/network3.svg)

Sizing Parameters:
- **C**: number of channels
- **C2**: number of bottleneck channels
- **C3**: number of channels in embedded state
- **R**: number of residuals in residual tower
- **B**: broadcast every B residuals

### Residual Tower

The residual tower is composed of R stacked residual blocks. The standard block is a BottleneckResidualBlock and every B block is instead a
BroadcastResidualBlock (see [Gumbel Muzero](https://openreview.net/forum?id=bERaNdoegnO)).
Each residual block learns a delta improvement that includes local and global spacial properties.

![Flexbox Justify Content](/network4.svg)


### ONNX

As "brain dump" format we are using [ONNX](https://onnx.ai/) (Open Neural Network Exchange) exported from DJL.
It includes the structure of the network and its parameters.
As an example have a look at MuZero's three core building functions:

* <doc-link to="https://netron.app?url=https://enpasos.ai/onnx/MuZero-TicTacToe-Representation.onnx">MuZero-TicTacToe-Representation.onnx</doc-link>
* <doc-link to="https://netron.app?url=https://enpasos.ai/onnx/MuZero-TicTacToe-Prediction.onnx">MuZero-TicTacToe-Prediction.onnx</doc-link>
* <doc-link to="https://netron.app?url=https://enpasos.ai/onnx/MuZero-TicTacToe-Generation.onnx">MuZero-TicTacToe-Generation.onnx</doc-link>
* <doc-link to="https://netron.app?url=https://enpasos.ai/onnx/MuZero-TicTacToe-SimilarityProjector.onnx">MuZero-TicTacToe-SimilarityProjector.onnx</doc-link>
* <doc-link to="https://netron.app?url=https://enpasos.ai/onnx/MuZero-TicTacToe-SimilarityPredictor.onnx">MuZero-TicTacToe-SimilarityPredictor.onnx</doc-link>

To visualize the onnx networks we use the marvelous [Netron](https://github.com/lutzroeder/netron).

In section [TicTacToe](/muzero/TicTacToe) you can test the initial inference block (representation + prediction) and see the time
it takes for one "fast thinking" inference. The ONNX network representation is loaded in the background. We measure an inference time
on notebooks of 5-10 ms and on mobiles of 10-20 ms. Try it yourself.

## Other aspects


### Absorbing states

On training we treat absorbing state in the following way:
* no force to make the network to choose a particular action over another. This also means that no force is applied to direct the policy to a uniform distribution.
* As long as we stay with board games no separate reward network is needed (in the paper zero loss on the reward network).
 Without the reward network the value network has to be trained not only on the expected future reward but also on the reward
 given on the terminal move.

### Two player game

The change of perspective at each move (more correct would be "half-move") in the self-play of a game with two players must
be taken care of. Easier on a computer than in real world, see

[Geri's Game](https://www.youtube.com/watch?v=uMVtpCPx8ow) ;-)




## Stack used here for training

| Option            | Description                                                                                                                                                                        |
|:------------------|:-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Examples          | Tic-Tac-Toe, GO 5x5                                                                                                                                                                |
| App               | MuZero                                                                                                                                                                             |
| AI Java framework | [DJL 0.22.1](https://github.com/awslabs/djl)                                                                                                                                       |
| Java              | [JDK 17](https://github.com/corretto/corretto-17/releases)                                                                                                                         |
| AI framework      | [PyTorch 2.0](https://pytorch.org/docs/2.0/)                                                                                                                                       |
| Device API        | [CUDA 11.8](https://docs.nvidia.com/cuda/archive/11.8.0/)<br/>[cuDNN 8.9](https://docs.nvidia.com/deeplearning/cudnn/index.html)                                                   |
| OS                | Windows 11, 64 bit                                                                                                                                                                 |
| HW                | PC: <br/>&nbsp;&nbsp;CPU: Intel Core i9-13900K, <br/>&nbsp;&nbsp;Main Memory: 128 GB, <br/>&nbsp;&nbsp;BUS: PCIe 4.0, <br/>&nbsp;&nbsp;GPU: NVIDIA GeForce RTX 4090 with 26 GB RAM |




