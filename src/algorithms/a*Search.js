export default function aStarSearch(grid, startNode, targetNode) {
    const visitedNodesInOrder = []
    startNode.distance = 0
    startNode.heuristic = manhattanDist(startNode, targetNode)
    startNode.fScore = startNode.distance + startNode.heuristic
    const unvisitedNodes = unpackGrid(grid)

    while (unvisitedNodes.length !== 0) {
        sortNodesByDistance(unvisitedNodes) // Maintain a priority queue
        const closestNode = unvisitedNodes.shift()

        if (closestNode.isWall) continue
        if (closestNode.distance === 99999) return [visitedNodesInOrder, false]
        
        closestNode.isVisited = true
        visitedNodesInOrder.push(closestNode)
        if (closestNode.type === "TARGET") {
            startNode.previousNode = null;
            return [visitedNodesInOrder, true]
        }
        updateUnvisitedNeighbors(closestNode, targetNode, grid)
    }
}

const unpackGrid = (grid) => {
    const nodes = []
    for (const row of grid) {
        for (const node of row) {
            nodes.push(node)
        }
    }
  return nodes
}

const manhattanDist = (node, targetNode) => {
    let d1 = Math.abs (node.row - targetNode.row);
    let d2 = Math.abs (node.col - targetNode.col);
    return d1 + d2;
}

const sortNodesByDistance = (unvisitedNodes) => {
    unvisitedNodes.sort((nodeA, nodeB) => nodeA.fScore - nodeB.fScore)
}

const updateUnvisitedNeighbors = (closestNode, targetNode, grid) => {
    const unvisitedNeighbors = getUnvisitedNeighbors(closestNode, grid);
    for (const neighbor of unvisitedNeighbors) {
        const newDistance = closestNode.distance + neighbor.weight;
        const newfScore = newDistance + manhattanDist(neighbor, targetNode); // f(x) = g(x) + h(x)
        if (newfScore < neighbor.fScore) {
            neighbor.distance = newDistance
            neighbor.fScore = newfScore
            neighbor.previousNode = closestNode
        }
    }
}

const getUnvisitedNeighbors = (node, grid) => {
    const neighbors = []
    const {col, row} = node

    if (row > 0)                    neighbors.push(grid[row - 1][col])
    if (row < grid.length - 1)      neighbors.push(grid[row + 1][col])
    if (col > 0)                    neighbors.push(grid[row][col - 1])
    if (col < grid[0].length - 1)   neighbors.push(grid[row][col + 1])
    return neighbors.filter(neighbor => !neighbor.isVisited)
}