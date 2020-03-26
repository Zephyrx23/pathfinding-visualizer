import React, { useState } from 'react'
import Grid from './components/Grid'
import depthFirstSearch from './algorithms/depthFirstSearch.js'
import breadthFirstSearch from './algorithms/breadthFirstSearch.js'
import dijkstra from './algorithms/dijkstra.js'
import Button from 'react-bootstrap/Button'
import SplitButton from 'react-bootstrap/SplitButton'
import Dropdown from 'react-bootstrap/Dropdown'
import Modal from 'react-bootstrap/Modal'
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
    const [ algo, setAlgo ]                 = useState("Dijkstra's Algorithm")
    const [ clickType, setClickType ]       = useState("Wall")
    const [ showAlgoInfo, setShowAlgoInfo ] = useState(false)
    const [ showTypeInfo, setShowTypeInfo ] = useState(false)
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
        resetAnimatedGrid()
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

    const resetAnimatedGrid = () => {
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
          variant="info"
          title={isAnimating ? "In Progress..." : algo}
          disabled={isAnimating}
          onClick={() => setShowAlgoInfo(true)}
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
        <Modal size="lg" show={showAlgoInfo} onHide={() => setShowAlgoInfo(false)}>
            <Modal.Header closeButton>
            <Modal.Title>Algorithms</Modal.Title>
            </Modal.Header>
            <Modal.Body>Select an pathfinding algorithm from the dropdown. <br /><br />
                Note that unweighted algorithms (Depth First Search, Breadth First Search) will not take into account any weights placed on the field.<br /><br />
                Weighted algorithms have a cost of 1 to travel to any adjacent node and a cost 8 to travel to a weighted one. 
                These will calculate the shortest path to get to the target, minimizing the total cost to get there.
            </Modal.Body>
        </Modal>
        <SplitButton
          variant="info"
          title={clickType}
          disabled={isAnimating}
          onClick={() => setShowTypeInfo(true)}
        >
            <Dropdown.Item eventKey="1" onClick={() => setClickType("Wall")}>
                Wall
            </Dropdown.Item>
            <Dropdown.Item eventKey="2" onClick={() => setClickType("Weight")}>
                Weight
            </Dropdown.Item>
        </SplitButton>
        <Modal size="lg" show={showTypeInfo} onHide={() => setShowTypeInfo(false)}>
            <Modal.Header closeButton>
            <Modal.Title>Wall/Weight Interation</Modal.Title>
            </Modal.Header>
            <Modal.Body>Click and hold on any node to create/remove walls or weights. <br />
                Walls cannot be traversed by the path while weights can be travsered. <br /><br />
                Weights "cost" more to travel to where the default cost to travel to an adjacent node is 1.
                To be specific, it costs 8 to travel to a weighted node. 
                Only Dijkstra's Algorithm can take advantage of weights. The other algorithms will ignore them. 
            </Modal.Body>
        </Modal>
        <Button variant="primary" onClick={() => calculateAlgo(algo)} disabled={isAnimating}>Animate Algorithm</Button>
        <Button variant="secondary" onClick={resetGrid} disabled={isAnimating}>Full Reset</Button>
        <Button variant="secondary" onClick={resetAnimatedGrid} disabled={isAnimating}>Reset Path</Button>
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
