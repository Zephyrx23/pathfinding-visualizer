import React, { useState } from 'react'

const Node = ({row, col, grid, setGrid, mousePressed, setMousePressed}) => {
    const [ nodeType, setType ] = useState(grid[row][col].type)
    
    const handleMouseDown = () => {
        setGrid(getGridWithWall(grid, row, col))
        setType("WALL")
        setMousePressed(true)
    }

    const handleMouseUp = () => {
        setMousePressed(false)
    }

    const handleMouseEnter = () => {
        if (mousePressed) {
            setGrid(getGridWithWall(grid, row, col))
            setType("WALL")
            return
        }

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
            onMouseUp={handleMouseUp}
        ></div>
    )
}

const getGridWithWall = (grid, row, col) => {
    const newGrid = grid.slice()
    newGrid[row][col].type = "WALL"
    newGrid[row][col].isWall = true
    return(newGrid)
}

export default Node