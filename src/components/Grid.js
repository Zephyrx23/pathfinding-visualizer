import React from 'react'
import Node from "./Node.js";

const Row = ({col, grid, setGrid, mousePressed, setMousePressed}) => {
    return(
        <div>
            {col.map((node, rowIdx) => {
                // if (node.type === "WALL") {
                //     console.log(`Row: ${node.row}, Col: ${node.col} is WALL`);
                // }
                return (<Node
                    key={rowIdx}
                    row={node.row}
                    col={node.col}
                    grid={grid}
                    setGrid={setGrid}
                    mousePressed={mousePressed}
                    setMousePressed={setMousePressed}
                />)
            })}
        </div>
    )
}

const Grid = ({grid, setGrid, mousePressed, setMousePressed}) => {
    
    return (grid.map((col, colIdx) => {
            return (<Row 
                key={colIdx}
                col={col} 
                grid={grid}
                setGrid={setGrid}
                mousePressed={mousePressed}
                setMousePressed={setMousePressed}
            /> )
        })
    )
}

export default Grid