---
title: Here - Approach
---

The component structuring we use ([copied from ...](https://arxiv.org/abs/2306.03408)):

<div><object type="image/svg+xml" data="https://enpasos.ai/components.svg" width="100%"/></div>



Agent and environment are implemented as a Java Spring Boot command line application.
The hyperparameters can be configured using Spring Boot configuration properties.

Agent and environment are separated by a standard agent environment interface. This allows plugging the agent into different environments.
The figure above details the structuring of the agent into components and their interplay.

During training, a loop iterates over epochs. Each epoch has an _experience episodes phase_ and a _train model phase_.

The _experience episodes phase_ runs episodes in parallel. Each episode iterates discrete timesteps. Each timestep
begins with an _observation_ of the environment. Next, the action to be taken is _decided_. This is the responsibility
of a decision component, which calls planning for the tree search but is free in how it uses planning. Planning calls
the model for inference results. Then the agent acts against the environment and stores the experience it has
gained at this time step.

During the _train model phase_, samples are taken from the experience and the model component is called to perform batch training.

All calls to the model are asynchronous. This decouples the callers from the model. The model component encapsulates all
neural network operations. The decoupling is not only in functionality but also in parallelization. The model component
builds batch tasks and sends them via the DeepJavaLibrary (DJL) and Java Native Interface (JNI) to PyTorch, where they
are processed using NVIDIA CUDA on a single GPU. The use of a single GPU only reflects the hardware we are using. DJL
and PyTorch support processing on multiple GPUs out of the box.

The implementation provides export functionality to the ONNX exchange format, which we use to run the model on WebAssembly
directly in a browser, or to navigate the visualised network graph using [Netron](https://github.com/lutzroeder/netron).

The build tool is Gradle, which packages the application with all Java dependencies into a single jar file at compile time.
C-based dependencies for PyTorch and CUDA are dynamically loaded using the standard DJL approach.

All hyperparameters used can be fully configured by the Spring Boot application via a single YAML file or as command
line parameters. Concrete properties files are provided with the source code.

## Model

Let's sketch the network-structure:

<div><object type="image/svg+xml" data="https://enpasos.ai/network.svg" width="100%"/></div>

Bottom-up means from input to output. Left-right does inference timestep by timestep, starting with initially consuming
the observation, transforming it to an internal "embedded" state, that is then propagated forward by the network on each
action during Monte Carlo Tree Search (MCTS).

<div><object type="image/svg+xml" data="https://enpasos.ai/network2.svg" width="100%"/></div>



### Representation, Dynamics and Prediction

The functional building blocks of MuZero networks are a representation, a dynamic and a prediction function. A network has one
instance of each - that is, each time the dynamic function is used in inference, it is the same one with the same
parameters - this is also true for the prediction function.

For board games (no reward head in the dynamics function and representation/dynamics functions with the same structure)

<div><object type="image/svg+xml" data="https://enpasos.ai/network3.svg" width="100%"/></div>

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

<div><object type="image/svg+xml" data="https://enpasos.ai/network4.svg" width="100%"/></div>

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

In section [TicTacToe](/muzero/here/TicTacToe) you can test the initial inference block (representation + prediction) and see the time
it takes for one "fast thinking" inference. The ONNX network representation is loaded in the background. We measure an inference time
on notebooks of 5-10 ms and on mobiles of 10-20 ms. Try it yourself.

## Performance critical aspects

To make MuZero work, it is essential to parallelise the neural network's activities while avoiding low-bandwidth data transfers.

To get a feeling what this is about let's look at the hardware used for the original MuZero training:
[MuZero on Google TPUv3](https://youtu.be/L0A86LmH7Yw?t=396) or [cloud.google.com/tpu](https://cloud.google.com/tpu)
and compare it to typical low budget hardware ... the one we are using:
[NVIDIA GEFORCE RTX 4090](https://www.nvidia.com/de-de/geforce/graphics-cards/40-series/rtx-4090/).

MuZero runs on a feedback loop of self-play and training. The hardware requirements of self-play vs. training can be estimated
from the MuZero author's statement, "For each board game, we used 16
TPUs for training and 1000 TPUs for self-play".

While the move from AlphaZero to MuZero broadens the scope from classic board games to classic video games, let us start here.
from the roots: classic board games.
We start with the trivial game TicTacToe, which has about 250,000 possible games and therefore comes with a decision tree that can be
that can easily be fully evaluated for testing. We use it as an integration test in our continuous integration (CI) pipeline.
We proceed with go games on 5x5 and 9x9 board (instead of 19x19) - 9x9 has [about 10^38 legal positions](https://en.wikipedia.org/wiki/Go_and_mathematics).


### Batch training and batch self-play

During the tree search, all in-mind states need to be stored somewhere. As the memory on the GPU is much more limited (for the given hardware stack) than on the CPU/RAM side
we store the in-mind states on the CPU/RAM and move them to the GPU/RAM as inference input.

The tensor we transport to the GPU has four dimensions (training and inference):
* batch dim
* feature planes
* one spacial dim of one feature plane
* other spacial dim of one feature plane


### Symmetry to reduce self-play effort

TicTacToe and Go have a board symmetry (as mentioned in the Alpha Go papers) that allows us to make eight self-plays out of one. The symmetry operations are done directly on the device which saves transport time.



## Other aspects

### Memory management

Java objects are stored in Java heap space. Clean up happens automatically: When an object is not referenced anymore it gets on the cleanup list
of the Java garbage collector, which frees the space sometime according to its cleaning strategy and the heap space occupation.

The memory management of the tensors used by the network model is fundamentally different. Tensors are stored in native memory on the devices - in this case CPU RAM or GPU RAM.
They are actively moved between the devices and actively deleted. To ensure deterministic runtime behaviour and make
life easier for developers, the Deep Java Library (DJL) provides a robust [memory management](https://github.com/deepjavalibrary/djl/blob/master/docs/development/memory_management.md).
At its core are hierarchical organized [NDManagers](https://javadoc.io/doc/ai.djl/api/latest/ai/djl/ndarray/NDManager.html).
Java objects that act as factories and scopes for the tensors - the [NDArrays](https://javadoc.io/doc/ai.djl/api/latest/ai/djl/ndarray/NDArray.html).
It is the counterpart to NumPy's ndarray from the world of Python - a **n**-**d**imensional **array**.
The main idea is that each NDArray is attached to an NDManager and is closed when the NDManager is closed, freeing up native memory.
This makes life even easier for developers: NDManagers are auto-closable and closing is automatically cascaded down the NDManager hierarchy.

However, when dealing with NDArrays attached to different NDManagers, an operation between such two NDArrays creates a
new NDArray that is attached to the NDManager of the first NDArray in the operation. This can lead to memory leaks that
are very difficult to detect. Together with the DJL team we came up with a simple-to-use, well-working solution: We introduced a
[NDScope](https://javadoc.io/doc/ai.djl/api/latest/ai/djl/ndarray/NDScope.html) that can be used independently of the
NDManagers to guarantee that all objects created in an NDScope are closed when the NDScope is closed.
It is easy to use: The developer only has to define the autoclosable NDScope. Everything else is done automatically and thread locally.
Many thanks to the DJL team who had the patience of a saint with us and ultimately led us to the simple deterministic solution.


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
| Examples          | Tic-Tac-Toe, GO 5x5, GO 9x9                                                                                                                                                        |
| App               | MuZero                                                                                                                                                                             |
| AI Java framework | [DJL 0.25.0](https://github.com/awslabs/djl)                                                                                                                                       |
| Java              | [JDK 21](https://github.com/corretto/corretto-21/releases)                                                                                                                         |
| AI framework      | [PyTorch 2.1.1](https://pytorch.org/docs/2.1/)                                                                                                                                     |
| Device API        | [CUDA 12.1](https://docs.nvidia.com/cuda/archive/12.1.1/)<br/>[cuDNN 8.9](https://docs.nvidia.com/deeplearning/cudnn/index.html)                                                   |
| OS                | Windows 11, 64 bit                                                                                                                                                                 |
| HW                | PC: <br/>&nbsp;&nbsp;CPU: Intel Core i9-13900K, <br/>&nbsp;&nbsp;Main Memory: 128 GB, <br/>&nbsp;&nbsp;BUS: PCIe 4.0, <br/>&nbsp;&nbsp;GPU: NVIDIA GeForce RTX 4090 with 26 GB RAM |




