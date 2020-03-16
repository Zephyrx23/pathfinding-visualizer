import React, { useState } from 'react'
import Grid from './components/Grid'
import {depthFirstSearch} from './algorithms/depthFirstSearch.js'
import './components/Node.css'
import './App.css'

const ROW_SIZE    = 40 // I'll have to scale size with browser size ughhhhhhh
const COL_SIZE    = 30
const START_NODE  = {col: 5, row: COL_SIZE/2}
const TARGET_NODE = {col: ROW_SIZE-5, row: COL_SIZE/2}

const App = () => {
    const [ grid, setGrid ]                 = useState(initializeGrid())
    const [ oldGrid, setOldGrid ]           = useState(null) // for saving old grid state so that you can animate again
    const [ mousePressed, setMousePressed ] = useState(false)
    const [ animatedAlready, setAnimatedAlready ] = useState(false) // flag to check whether the old grid state (on first time animation)
    // const [ lockInput, setLockInput ]       = useState(false) // flag for disabling user input to the grid when animation is in progress
    let tempGrid = grid

    const handleMouseUp = () => {
        const newGrid = tempGrid.slice()
        setGrid(newGrid)
        setMousePressed(false)
    }

    const animateDFS = (visitedNodes, shortestPath) => {
        for (let i = 0; i <= visitedNodes.length; i++) {
            if (i === visitedNodes.length) {
              setTimeout(() => {
                animateShortestPath(shortestPath);
              }, 10 * i);
              return;
            }
            setTimeout(() => {
              const node = visitedNodes[i];
              if (!isStartOrTargetNode(node.row, node.col)) {
                  document.getElementById(`${node.row}-${node.col}`).className =
                'NODE-visited';
              }
            }, 10 * i);
          }
    }

    const animateShortestPath = (shortestPath) => {
        for (let i = 0; i < shortestPath.length; i++) {
            setTimeout(() => {
              const node = shortestPath[i];
              if (!isStartOrTargetNode(node.row, node.col)) {
                document.getElementById(`${node.row}-${node.col}`).className =
                    'NODE-shortest-path';
              }
            }, 50 * i);
          }
    }

    const calculateDFS = () => {
        const newGrid = JSON.parse(JSON.stringify(grid));
        const startNode = newGrid[START_NODE.row][START_NODE.col]
        const targetNode = newGrid[TARGET_NODE.row][TARGET_NODE.col]
        const visitedNodes = depthFirstSearch(newGrid, startNode, ROW_SIZE, COL_SIZE)
        const shortestPath = backtrackPath(targetNode)
        console.log("Visited Nodes", visitedNodes);
        animateDFS(visitedNodes, shortestPath)
    }

    const calculateAlgo = (algorithm) => {
        resetGridWithWalls()
        switch (algorithm) {
            case "DFS":
                calculateDFS()
                break;
        }
    }

    const resetGrid = () => {
        setGrid(initializeGrid())
        for (let row = 0; row < COL_SIZE; row++) {
            for (let col = 0; col < ROW_SIZE; col++) {
                if (!isStartOrTargetNode(row, col)) {
                    document.getElementById(`${row}-${col}`).className =
                        'NODE';
                }
            }
        }  
    }

    const resetGridWithWalls = () => {
        for (let row = 0; row < COL_SIZE; row++) {
            for (let col = 0; col < ROW_SIZE; col++) {
                const classType = document.getElementById(`${row}-${col}`).className;
                if (classType === 'NODE-visited' || classType === 'NODE-shortest-path') {
                    document.getElementById(`${row}-${col}`).className =
                        'NODE';
                }
            }
        }  
    }

    return (
        <>
        <button onClick={() => calculateAlgo("DFS")}>
            Visualize Algorithm (DFS)
        </button>
        <button onClick={resetGrid}>
            Reset
        </button>
        <div className="App" onMouseLeave={handleMouseUp}>            
            <Grid 
                grid={tempGrid} 
                setGrid={setGrid}
                mousePressed={mousePressed}
                setMousePressed={setMousePressed}
            />
        </div>
        </>
    )
}

const initializeGrid = () => {
    const grid = []
    for (let row = 0; row < COL_SIZE; row++) {
        const currRow = []
        for (let col = 0; col < ROW_SIZE; col++) {
            currRow.push(createNode(row, col))
        }
        grid.push(currRow)
    }
    return(grid)
}

/*
    TODO: Add weight property, on press, displays weight of node
*/
const createNode= (row, col) => {
    return ({
        row:          row,
        col:          col,
        type:         getType(row, col),
        isVisited:    false,
        isWall:       false,
        previousNode: null,
    })
}

const getType = (row, col) => {
    return(
        START_NODE.row === row && START_NODE.col === col ? "START" :
        TARGET_NODE.row === row && TARGET_NODE.col === col ? "TARGET" : "NODE"
    )
}

const isStartOrTargetNode = (row, col)  => {
    return (row === START_NODE.row  && col === START_NODE.col) 
        || (row === TARGET_NODE.row && col === TARGET_NODE.col);
}

function backtrackPath(targetNode) {
    const shortestPath = []
    let currentNode = targetNode
    while (currentNode !== null) {
        shortestPath.unshift(currentNode)
        currentNode = currentNode.previousNode
    } 

    return shortestPath;
}

export default App
