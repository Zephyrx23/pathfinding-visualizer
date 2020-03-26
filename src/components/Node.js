import React, { useState, useEffect } from 'react'
import weightIcon from '../images/weight.png'


const Node = ({row, col, grid, setGrid, mousePressed, setMousePressed, clickType}) => {
    const [ nodeType, setType ] = useState(grid[row][col].type)

    useEffect(() => {
        setType(grid[row][col].type)
    },[grid, row, col])
    
    const handleMouseDown = () => {
        console.log(`Type: ${nodeType} Row: ${row} Col: ${col}`);
        clickType === "Wall" ? setWall() : setWeight();
        setMousePressed(true)
    }

    const handleMouseUp = () => {
        const newGrid = grid.slice()
        setGrid(newGrid)
        setMousePressed(false)
    }

    const handleMouseEnter = () => {
        if (mousePressed) {
            clickType === "Wall" ? setWall() : setWeight();
        }
    }

    const setWall = () => {
        if (nodeType !== "START" && nodeType !== "TARGET") {
            const newType = nodeType === "WALL" ? "NODE" : "WALL"
            grid[row][col].type = newType
            grid[row][col].isWall = !grid[row][col].isWall
            grid[row][col].weight = newType === "WEIGHT" ? 2 : 1
            setType(newType)
        }
    }

    const setWeight = () => {
        if (nodeType !== "START" && nodeType !== "TARGET") {
            const newType = nodeType === "WEIGHT" ? "NODE" : "WEIGHT"
            grid[row][col].type = newType
            grid[row][col].weight = newType === "WEIGHT" ? 4 : 1
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
        >
            {nodeType === "WEIGHT" ? <img className="img" src={weightIcon} alt="weight" ></img> : ""}
        </div>
    )
}

export default Node