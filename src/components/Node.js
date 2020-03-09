import React, { useState } from 'react'

const Node = ({row, col, grid, setGrid}) => {
    const [ nodeType, setType ] = useState(grid[row][col].type)
    
    const handleMouseDown = () => {
        const newGrid = grid.slice()
        newGrid[row][col].type = "WALL"
        newGrid[row][col].isWall = true
        setGrid(newGrid)
    }

    const handleMouseEnter = () => {
        if (nodeType === "NODE" || nodeType === "HOVER_LEAVE") {
            setType("HOVER")
        }
    }

    const handleMouseLeave = () => {
        if (nodeType === "HOVER") {
            setType("HOVER_LEAVE")
        }
    }

    return(
        <div
            id={`${row}-${col}`}
            className={nodeType}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onMouseDown={handleMouseDown}
        ></div>
    )
}

export default Node