import React, { useState, useEffect } from 'react'
import Grid from './components/Grid'
import './components/Node.css'
import './App.css'

const ROW_SIZE    = 20
const COL_SIZE    = 30
const START_NODE  = {row: 10, col: 5}
const TARGET_NODE = {row: 10, col: 25}

const App = () => {
    const [ grid, setGrid ] = useState(initializeGrid())
    const [ mousePressed, setMousePressed ] = useState(false)
    const tempGrid = grid

    const handleMouseUp = () => {
        const newGrid = tempGrid.slice()
        setGrid(newGrid)
        setMousePressed(false)
    }

    // useEffect(() => {
    //     document.body.addEventListener(onmouseup, handleMouseUp)
    // }, [])

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
        <div className="footer">2020 Zephyrx23</div>
        </>
    )
}

const initializeGrid = () => {
    const grid = []
    for (let row = 0; row < ROW_SIZE; row++) {
        const currRow = []
        for (let col = 0; col < COL_SIZE; col++) {
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
