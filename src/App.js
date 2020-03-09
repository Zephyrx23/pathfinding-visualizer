import React, { useState, useEffect } from 'react'
import Grid from './components/Grid'
import './App.css'

const ROW_SIZE    = 20
const COL_SIZE    = 30
const START_NODE  = {row: 10, col: 15}
const TARGET_NODE = {row: 20, col: 15}

const App = () => {
    const [ grid, setGrid ] = useState(initializeGrid())

    useEffect(() => {
        document.body.style = 'background: #2C2F33;';
    })

    const handleMouseDown = (row, col) => {
        console.log(`Mouse is down on ${col}-${row}`);
    }

    const handleMouseEnter = (row, col) => {
        console.log(`Mouse has entered ${col}-${row}`);
    }

    return (
        <div className="App">            
            <Grid 
                grid={grid} 
                handleMouseDown={handleMouseDown} 
                handleMouseEnter={handleMouseEnter}

            />
        </div>
    )
}

const initializeGrid = () => {
    const grid = []
    for (let row = 0; row < ROW_SIZE; row++) {
        const currRow = []
        for (let col = 0; col < COL_SIZE; col++) {
            currRow.push({row, col})
        }
        grid.push(currRow)
    }
    return(grid)
}

/*
    TODO: Add weight property, on press, displays weight of node
*/
const createNodeProperties = (row, col) => {
    return ({
        row:    row,
        col:    col,
        type:   "",
        
    })
}

const isStartNode = (row, col) => {
    return(START_NODE.row === row && START_NODE.col === col) ? true : false;
}

const isTargetNode = (row, col) => {
    return(TARGET_NODE.row === row && TARGET_NODE.col === col) ? true : false;
}

export default App
