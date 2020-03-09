import React from 'react'
import Node from "./Node.js";
import './Node.css'

const Row = ({col, handleMouseDown, handleMouseEnter}) => {
    return(
        <div>
            {col.map((node, rowIdx) => {
                // console.log(`Row: ${node.row}, Col: ${node.col}`);
                return (<Node
                    key={rowIdx}
                    row={node.row}
                    col={node.col}
                    handleMouseDown={() => handleMouseDown(node.row, node.col)}
                    handleMouseEnter={() => handleMouseEnter(node.row, node.col)}
                />)
            })}
        </div>
    )
}

const Grid = ({grid, handleMouseDown, handleMouseEnter}) => {
    
    return (grid.map((col, colIdx) => {
            return (<Row 
                key={colIdx}
                col={col} 
                handleMouseDown={handleMouseDown} 
                handleMouseEnter={handleMouseEnter}
            /> )
        })
    )
}

export default Grid