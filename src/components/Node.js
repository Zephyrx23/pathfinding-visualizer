import React, { useState } from 'react'

const Node = ({row, col, grid, setGrid, mousePressed, setMousePressed}) => {
    const [ nodeType, setType ] = useState(grid[row][col].type)
    
    const handleMouseDown = () => {
        console.log(nodeType);
        if (nodeType !== "START" && nodeType !== "TARGET") {
            const newType = nodeType === "WALL" ? "NODE" : "WALL"
            grid[row][col].type = newType
            grid[row][col].isWall = !grid[row][col].isWall
            setType(newType)
        }
        setMousePressed(true)
    }

    const handleMouseUp = () => {
        const newGrid = grid.slice()
        setGrid(newGrid)
        setMousePressed(false)
    }

    const handleMouseEnter = () => {
        if (mousePressed) {
            if (nodeType !== "START" && nodeType !== "TARGET") {
                const newType = nodeType === "WALL" ? "NODE" : "WALL"
                grid[row][col].type = newType
                grid[row][col].isWall = !grid[row][col].isWall
                setType(newType)
            }
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

// const getGridWithWall = (grid, row, col) => {
//     const newGrid = grid.slice()
//     newGrid[row][col].type = "WALL"
//     newGrid[row][col].isWall = true
//     return(newGrid)
// }

export default Node