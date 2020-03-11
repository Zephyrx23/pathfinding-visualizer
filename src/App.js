import React, { useState, useEffect } from 'react'
import Grid from './components/Grid'
import {depthFirstSearch} from './algorithms/depthFirstSearch.js'
import './components/Node.css'
import './App.css'

const ROW_SIZE    = 10 // I'll have to scale size with browser size ughhhhhhh
const COL_SIZE    = 10
const START_NODE  = {col: 1, row: 5}
const TARGET_NODE = {col: 8, row: 5}

const App = () => {
    const [ grid, setGrid ] = useState(initializeGrid())
    const [ mousePressed, setMousePressed ] = useState(false)
    const tempGrid = grid

    const handleMouseUp = () => {
        const newGrid = tempGrid.slice()
        setGrid(newGrid)
        setMousePressed(false)
    }

    const animateDFS = (shortestPath) => {
        for (let i = 0; i <= shortestPath.length; i++) {
            if (i === shortestPath.length) {
              setTimeout(() => {
                animateShortestPath(shortestPath);
              }, 10 * i);
              return;
            }
            setTimeout(() => {
              const node = shortestPath[i];
              document.getElementById(`${node.row}-${node.col}`).className =
                'NODE-visited';
            }, 10 * i);
          }
    }

    const animateShortestPath = (shortestPath) => {
        for (let i = 0; i < shortestPath.length; i++) {
            setTimeout(() => {
              const node = shortestPath[i];
              document.getElementById(`${node.row}-${node.col}`).className =
                'NODE-shortest-path';
            }, 50 * i);
          }
    }

    const calculateDFS = () => {
        const newGrid = {...grid}
        const startNode = newGrid[START_NODE.row][START_NODE.col]
        const targetNode = newGrid[TARGET_NODE.row][TARGET_NODE.col]
        const shortestPath = depthFirstSearch(newGrid, startNode, targetNode, ROW_SIZE, COL_SIZE)
        animateDFS(shortestPath)
    }

    return (
        <>
        <button onClick={calculateDFS}>
            Visualize Algorithm (DFS)
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

export default App
