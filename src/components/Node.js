import React from 'react'

const Node = ({row, col, handleMouseEnter, handleMouseDown}) => {
    
    return(
        <div
            id={`${row}-${col}`}
            className="node"
            onMouseEnter={() => handleMouseEnter()}
            onMouseDown={() => handleMouseDown()}
        ></div>
    )
}

export default Node