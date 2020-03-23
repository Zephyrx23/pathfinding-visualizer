export default function breadthFirstSearch(grid, startNode, ROW_SIZE, COL_SIZE) {
    const visitedNodes = []
    const visitedNodesInOrder = []
    visitedNodes.push(startNode)


    while (visitedNodes.length !== 0) {
        const currentNode = visitedNodes.shift()
        if (currentNode.isWall || currentNode.isVisited) {
            continue
        }

        visitedNodesInOrder.push(currentNode)

        if (currentNode.type === "TARGET") {
            // console.log(`Visited Nodes: ${visitedNodesInOrder}`);
            startNode.previousNode = null;
            return ([visitedNodesInOrder, true])
        }
        
        currentNode.isVisited = true
        const row = currentNode.row
        const col = currentNode.col
        // console.log(`Row ${row} Col: ${col}`);

        const neighbors = []
        if (!(col-1 < 0))               neighbors.push(grid[row][col-1])
        if (!(row+1 > grid.length-1))   neighbors.push(grid[row+1][col])
        if (!(col+1 > grid[0].length-1)) neighbors.push(grid[row][col+1])
        if (!(row-1 < 0))               neighbors.push(grid[row-1][col])

        for (const neighbor of neighbors) {
            visitedNodes.push(neighbor)
            if (neighbor.previousNode == null) {
                neighbor.previousNode = currentNode
            }
        }
    }

    return ([visitedNodesInOrder, false])
}