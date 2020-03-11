export function depthFirstSearch(grid, startNode, targetNode, ROW_SIZE, COL_SIZE) {
    const visitedNodes = []
    const visitedNodesInOrder = []
    visitedNodes.push(startNode)
    console.log(ROW_SIZE);
    console.log(COL_SIZE);

    while (visitedNodes.length !== 0) {
        const currentNode = visitedNodes.pop()
        if (currentNode.isWall || currentNode.isVisited) {
            continue
        }

        visitedNodesInOrder.push(currentNode)

        if (currentNode.type === "TARGET") {
            console.log(visitedNodesInOrder);
            return (visitedNodesInOrder)
        }

        currentNode.isVisited = true
        const row = currentNode.row
        const col = currentNode.col
        console.log(`Row ${row} Col: ${col}`);

        if (!(col-1 < 0))           {visitedNodes.push(grid[row][col-1])}
        if (!(row+1 > COL_SIZE-1))  {visitedNodes.push(grid[row+1][col])}
        if (!(col+1 > ROW_SIZE-1))  {visitedNodes.push(grid[row][col+1])}
        if (!(row-1 < 0))           {visitedNodes.push(grid[row-1][col])}
    }

}