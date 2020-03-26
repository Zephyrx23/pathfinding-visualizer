import React, { useState } from 'react'
import Grid from './components/Grid'
import depthFirstSearch from './algorithms/depthFirstSearch.js'
import breadthFirstSearch from './algorithms/breadthFirstSearch.js'
import dijkstra from './algorithms/dijkstra.js'
import Button from 'react-bootstrap/Button'
import SplitButton from 'react-bootstrap/SplitButton'
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'
import './components/Node.css'
import './App.css'

const ROW_SIZE    = 40 // I'll have to scale size with browser size ughhhhhhh
const COL_SIZE    = 26
const START_NODE  = {col: 5, row: COL_SIZE/2}
const TARGET_NODE = {col: ROW_SIZE-6, row: COL_SIZE/2}

const App = () => {
    const [ grid, setGrid ]                 = useState(initializeGrid())
    const [ mousePressed, setMousePressed ] = useState(false)
    const [ isAnimating, setIsAnimating ]   = useState(false)
    const [ algo, setAlgo ]                 = useState("Select an algorithm")
    const [ clickType, setClickType ]       = useState("Wall")
    let tempGrid = grid

    const handleMouseUp = () => {
        const newGrid = tempGrid.slice()
        setGrid(newGrid)
        setMousePressed(false)
    }

    const animateUnweighted = (visitedNodes, shortestPath, success) => {
        for (let i = 1; i < visitedNodes.length; i++) {
            if (i === visitedNodes.length-1 && success) {
                setTimeout(() => {
                    if (success) {
                        animateShortestPath(shortestPath);
                    } else {
                        animationCleanup()
                    }
                }, 10 * i);
                return;
            }
            setTimeout(() => {
                const node = visitedNodes[i];
                document.getElementById(`${node.row}-${node.col}`).className =
                    'NODE-visited';
                if (i === visitedNodes.length-1) animationCleanup()
            }, 10 * i);
          }
    }

    const animateShortestPath = (shortestPath) => {
        for (let i = 1; i < shortestPath.length-1; i++) {
            setTimeout(() => {
              const node = shortestPath[i];
              if (!isStartOrTargetNode(node.row, node.col)) {
                document.getElementById(`${node.row}-${node.col}`).className =
                    'NODE-shortest-path';
              }
              if (i === shortestPath.length-2) {
                animationCleanup()
              }
            }, 50 * i);
          }
    }

    const animationCleanup = () => {
        setIsAnimating(false)
    }

    const getNewStartTargetGrid = () => {
        const newGrid = JSON.parse(JSON.stringify(grid));
        const startNode = newGrid[START_NODE.row][START_NODE.col]
        const targetNode = newGrid[TARGET_NODE.row][TARGET_NODE.col]
        return [newGrid, startNode, targetNode];
    }

    const calculateDFS = () => {
        const [newGrid, startNode, targetNode] = getNewStartTargetGrid()
        const [visitedNodes, success] = depthFirstSearch(newGrid, startNode)
        const shortestPath = backtrackPath(targetNode)
        animateUnweighted(visitedNodes, shortestPath, success)
    }

    const calculateBFS = () => {
        const [newGrid, startNode, targetNode] = getNewStartTargetGrid()
        const [visitedNodes, success] = breadthFirstSearch(newGrid, startNode)
        const shortestPath = backtrackPath(targetNode)
        animateUnweighted(visitedNodes, shortestPath, success)
    }

    const calculateDijkstra = () => {
        const [newGrid, startNode, targetNode] = getNewStartTargetGrid()
        const [visitedNodes, success] = dijkstra(newGrid, startNode)
        const shortestPath = backtrackPath(targetNode)
        animateUnweighted(visitedNodes, shortestPath, success)
    }

    const calculateAlgo = (algorithm) => {
        setIsAnimating(true)
        resetGridWithWalls()
        switch (algorithm) {
            case "Depth First Search":
                calculateDFS()
                break;
            case "Breadth First Search":
                calculateBFS()
                break;
            case "Dijkstra's Algorithm":
                calculateDijkstra()
                break;
            default:
                window.alert("Please select an algorithm")
                setIsAnimating(false)
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
        <SplitButton
          variant="primary"
          title={isAnimating ? "In Progress..." : algo}
          disabled={isAnimating}
          onClick={() => calculateAlgo(algo)}
        >
            <Dropdown.Item eventKey="1" onClick={() => setAlgo("Depth First Search")}>
                Depth First Search
            </Dropdown.Item>
            <Dropdown.Item eventKey="2" onClick={() => setAlgo("Breadth First Search")}>
                Breadth First Search
            </Dropdown.Item>
            <Dropdown.Item eventKey="3" onClick={() => setAlgo("Dijkstra's Algorithm")}>
                Dijkstra's Algorithm
            </Dropdown.Item>
        </SplitButton>
        <SplitButton
          variant="info"
          title={clickType}
          disabled={isAnimating}
        >
            <Dropdown.Item eventKey="1" onClick={() => setClickType("Wall")}>
                Wall
            </Dropdown.Item>
            <Dropdown.Item eventKey="2" onClick={() => setClickType("Weight")}>
                Weight
            </Dropdown.Item>
        </SplitButton>
        <Button variant="secondary" onClick={resetGrid} disabled={isAnimating}>Reset</Button>
        <div className="App" onMouseLeave={handleMouseUp}>            
            <Grid 
                grid={tempGrid} 
                setGrid={setGrid}
                mousePressed={mousePressed}
                setMousePressed={setMousePressed}
                clickType={clickType}
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
        distance:     99999,
        weight:       1,
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
