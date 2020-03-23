export function dijkstra(grid, startNode) {
    const visitedNodesInOrder = []
    startNode.distance = 0
    const unvisitedNodes = unpackGrid(grid)

    while (unvisitedNodes.length !== 0) {
        sortNodesByDistance(unvisitedNodes) // Maintain a priority queue
        const closestNode = unvisitedNodes.shift()

        if (closestNode.isWall) continue
        if (closestNode.distance === Infinity) return visitedNodesInOrder
        
        closestNode.isVisited = true
        visitedNodesInOrder.push(closestNode)
        if (closestNode.type === "TARGET") {
            startNode.previousNode = null;
            return visitedNodesInOrder
        }
        updateUnvisitedNeighbors(closestNode, grid)
    }
}

const unpackGrid = () => {
    const nodes = []
    for (const row of grid) {
        for (const node of row) {
            nodes.push(node)
        }
    }
  return nodes
}

const sortNodesByDistance = (unvisitedNodes) => {
    unvisitedNodes.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance)
}

const updateUnvisitedNeighbors = (closestNode, grid) => {
    const unvisitedNeighbors = getUnvisitedNeighbors(node, grid);
    for (const neighbor of unvisitedNeighbors) {
        neighbor.distance = closestNode.distance + neighbor.weight;
        neighbor.previousNode = closestNode;
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