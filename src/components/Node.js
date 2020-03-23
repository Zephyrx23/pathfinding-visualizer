import React, { useState, useEffect } from 'react'

const Node = ({row, col, grid, setGrid, mousePressed, setMousePressed}) => {
    const [ nodeType, setType ] = useState(grid[row][col].type)

    useEffect(() => {
        setType(grid[row][col].type)
    },[grid, row, col])
    
    const handleMouseDown = () => {
        console.log(`Type: ${nodeType} Row: ${row} Col: ${col}`);
        setWall()
        setMousePressed(true)
    }

    const handleMouseUp = () => {
        const newGrid = grid.slice()
        setGrid(newGrid)
        setMousePressed(false)
    }

    const handleMouseEnter = () => {
        if (mousePressed) {
            setWall()
        }
    }

    const setWall = () => {
        if (nodeType !== "START" && nodeType !== "TARGET") {
            const newType = nodeType === "WALL" ? "NODE" : "WALL"
            grid[row][col].type = newType
            grid[row][col].isWall = !grid[row][col].isWall
            setType(newType)
        }
    }

    return(
        <div
            id={`${row}-${col}`}
            className={nodeType}
            onMouseEnter={handleMouseEnter}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
        ></div>
    )
}

export default Node