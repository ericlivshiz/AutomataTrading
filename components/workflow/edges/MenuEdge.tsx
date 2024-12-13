import {
  BaseEdge,
  EdgeLabelRenderer,
  getBezierPath,
  useReactFlow,
  type EdgeProps,
  type Edge,
} from "@xyflow/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const buttonStyle = {
  width: 20,
  height: 20,
  border: "1px solid #fff",
  cursor: "pointer",
  borderRadius: "50%",
  fontSize: "12px",
  lineHeight: 1,
};

type MenuEdgeData = {};

export type MenuEdge = Edge<MenuEdgeData>;

export default function MenuEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},
  markerEnd,
}: EdgeProps<MenuEdge>) {
  const { setNodes } = useReactFlow();

  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  const handleAddNode = (nodeType: 'condition-node' | 'action-node') => {
    // Calculate the position halfway between source and target
    const newNodeX = (sourceX + targetX) / 2;
    const newNodeY = (sourceY + targetY) / 2;

    setNodes((nodes) => [
      ...nodes,
      {
        id: `${nodeType}-${Math.random()}`,
        type: nodeType,
        position: { x: newNodeX - 75, y: newNodeY - 25 }, // Offset by half the node width/height
        data: { label: nodeType === 'condition-node' ? 'Perform Condition' : 'Perform Action' },
      },
    ]);
  };

  return (
    <>
      <BaseEdge path={edgePath} markerEnd={markerEnd} style={style} />
      <EdgeLabelRenderer>
        <div
          style={{
            position: "absolute",
            transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
            fontSize: 12,
            pointerEvents: "all",
          }}
          className="nodrag nopan"
        >
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button style={buttonStyle} className="gradient-blue">
                +
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-32 gradient-blue border-none">
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={() => handleAddNode('condition-node')}
              >
                Condition
              </DropdownMenuItem>
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={() => handleAddNode('action-node')}
              >
                Action
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </EdgeLabelRenderer>
    </>
  );
} 