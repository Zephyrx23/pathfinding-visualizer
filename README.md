Pathfinding Algorithms plot the shortest route between two points. In this application, the graph is represented as a 2D matrix, or a grid of nodes. By creating a custom graph filled with walls and weights, you can visualize how different algorithms search for the shortest path between the start (green) node and the end (red) node. Blue spaces represent the nodes visited by the algorithm, and the yellow spaces represents the shortest path.
[![pathfinder-example.gif](https://i.imgur.com/tDIL7pi.gif)](https://i.imgur.com/tDIL7pi.gif)

Click and drag anywhere on the field to create a wall. A wall is untraversable and canot be passed. 
Switch the selection between walls and weights to place weights on the field. These spaces can be traversed but at a much higher cost.
[![pathfinder-example2.gif](https://i.imgur.com/XAKuzaR.gif)](https://i.imgur.com/XAKuzaR.gif)

Weights will impact how weighted algorithms find the shortest path.
[![pathfinder-example3.gif](https://i.imgur.com/n3k9sb7.gif)](https://i.imgur.com/n3k9sb7.gif)

Select from four different algorithms to visualize including:
  * Dijkstra's Algorithm
  * A* Search
  * Breadth First Search
  * Depth First Search

This project was created using Javascript and React.
Interact with the project here: https://zephyrx23.github.io/pathfinding-visualizer/
