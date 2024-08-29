import { useCallback } from "react";
import {
    Background,
    Controls,
    MiniMap,
    ReactFlow,
    addEdge,
    useNodesState,
    useEdgesState,
    type OnConnect,
} from "@xyflow/react";

import "@xyflow/react/dist/style.css";
import './../../styles/flow.css';
import { initialNodes, nodeTypes, type CustomNodeType } from "./nodes/nodes";
import { initialEdges, edgeTypes, type CustomEdgeType } from "./edges/edges";
import Comments from "../Comments";

export default function Flow() {
    const [nodes, setNodes, onNodesChange] = useNodesState<CustomNodeType>(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState<CustomEdgeType>(initialEdges);
        useEdgesState<CustomEdgeType>(initialEdges);
    const onConnect: OnConnect = useCallback(
        (connection) => setEdges((edges) => addEdge(connection, edges)),
        [setEdges]
    );

    return (
        <div style={{ width: '100vw', height: '100vh' }} className="container">
            <ReactFlow<CustomNodeType, CustomEdgeType> 
                colorMode="dark"
                nodes={nodes}
                nodeTypes={nodeTypes}
                onNodesChange={onNodesChange}
                edges={edges}
                edgeTypes={edgeTypes}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                fitView
            >
                <Background />
                <MiniMap />
                <Controls />
            </ReactFlow>
        </div>

    );
}