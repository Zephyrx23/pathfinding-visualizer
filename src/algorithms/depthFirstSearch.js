export function depthFirstSearch(grid, startNode, ROW_SIZE, COL_SIZE) {
    const visitedNodes = []
    const visitedNodesInOrder = []
    visitedNodes.push(startNode)


    while (visitedNodes.length !== 0) {
        const currentNode = visitedNodes.pop()
        if (currentNode.isWall || currentNode.isVisited) {
            continue
        }

        if (currentNode.type === "TARGET") {
            // console.log(`Visited Nodes: ${visitedNodesInOrder}`);
            startNode.previousNode = null;
            visitedNodes.pop()
            return (visitedNodesInOrder)
        }

        visitedNodesInOrder.push(currentNode)

        
        currentNode.isVisited = true
        const row = currentNode.row
        const col = currentNode.col
        console.log(`Row ${row} Col: ${col}`);

        if (!(col-1 < 0)) {
            visitedNodes.push(grid[row][col-1])
            if (grid[row][col-1].previousNode == null) {
                grid[row][col-1].previousNode = currentNode
            }
        }
        if (!(row+1 > COL_SIZE-1)) {
            visitedNodes.push(grid[row+1][col])
            if (grid[row+1][col].previousNode == null) {
                grid[row+1][col].previousNode = currentNode
            }
        }
        if (!(col+1 > ROW_SIZE-1)) {
            visitedNodes.push(grid[row][col+1])
            if (grid[row][col+1].previousNode == null) {
                grid[row][col+1].previousNode = currentNode
            }
        }
        if (!(row-1 < 0)) {
            visitedNodes.push(grid[row-1][col])
            if (grid[row-1][col].previousNode == null) {
                grid[row-1][col].previousNode = currentNode
            } 
        }
    }

}