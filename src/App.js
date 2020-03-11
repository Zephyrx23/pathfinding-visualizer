import React, { useState, useEffect } from 'react'
import Grid from './components/Grid'
import './components/Node.css'
import './App.css'

const ROW_SIZE    = 40 // I'll have to scale size with browser size ughhhhhhh
const COL_SIZE    = 26
const START_NODE  = {col: 5, row: 13}
const TARGET_NODE = {col: 35, row: 13}

const App = () => {
    const [ grid, setGrid ] = useState(initializeGrid())
    const [ mousePressed, setMousePressed ] = useState(false)
    const tempGrid = grid

    const handleMouseUp = () => {
        const newGrid = tempGrid.slice()
        setGrid(newGrid)
        setMousePressed(false)
    }

    return (
        <>
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
