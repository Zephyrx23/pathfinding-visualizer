import React from 'react'
import SplitButton from 'react-bootstrap/SplitButton'
import Dropdown from 'react-bootstrap/Dropdown'
import Modal from 'react-bootstrap/Modal'

const Parameters = ({isAnimating, algo, setAlgo, showAlgoInfo, setShowAlgoInfo, 
        clickType, setClickType, showTypeInfo, setShowTypeInfo}) => {
    return(
        <>
        <SplitButton
          variant="info"
          title={isAnimating ? "In Progress..." : algo}
          disabled={isAnimating}
          onClick={() => setShowAlgoInfo(true)}
        >
            <Dropdown.Header>Unweighted Algorithms</Dropdown.Header>
            <Dropdown.Item eventKey="1" onClick={() => setAlgo("Depth First Search")}>
                Depth First Search
            </Dropdown.Item>
            <Dropdown.Item eventKey="2" onClick={() => setAlgo("Breadth First Search")}>
                Breadth First Search
            </Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Header>Weighted Algorithms</Dropdown.Header>
            <Dropdown.Item eventKey="3" onClick={() => setAlgo("Dijkstra's Algorithm")}>
                Dijkstra's Algorithm
            </Dropdown.Item>
            <Dropdown.Item eventKey="3" onClick={() => setAlgo("A* Search")}>
                A* Search
            </Dropdown.Item>
        </SplitButton>
        <Modal size="lg" show={showAlgoInfo} onHide={() => setShowAlgoInfo(false)}>
            <Modal.Header closeButton>
            <Modal.Title>Algorithms</Modal.Title>
            </Modal.Header>
            <Modal.Body>Select an pathfinding algorithm from the dropdown. <br /><br />
                Note that unweighted algorithms (Depth First Search, Breadth First Search) will not take into account any weights placed on the field.<br /><br />
                Weighted algorithms have a cost of 1 to travel to any adjacent node and a cost 8 to travel to a weighted one. 
                These will calculate the shortest path to get to the target, minimizing the total cost to get there.
            </Modal.Body>
        </Modal>
        <SplitButton
          variant="info"
          title={clickType}
          disabled={isAnimating}
          onClick={() => setShowTypeInfo(true)}
        >
            <Dropdown.Item eventKey="1" onClick={() => setClickType("Wall")}>
                Wall
            </Dropdown.Item>
            <Dropdown.Item eventKey="2" onClick={() => setClickType("Weight")}>
                Weight
            </Dropdown.Item>
        </SplitButton>
        <Modal size="lg" show={showTypeInfo} onHide={() => setShowTypeInfo(false)}>
            <Modal.Header closeButton>
            <Modal.Title>Wall/Weight Interation</Modal.Title>
            </Modal.Header>
            <Modal.Body>Click and hold on any node to create/remove walls or weights. <br />
                Walls cannot be traversed by the path while weights can be travsered. <br /><br />
                Weights "cost" more to travel to where the default cost to travel to an adjacent node is 1.
                To be specific, it costs 8 to travel to a weighted node. 
                Weights will only work with weighted algorithms.
            </Modal.Body>
        </Modal>
        </>
    )
}

export default Parameters