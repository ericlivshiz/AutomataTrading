import type { BuiltInNode, Node, NodeTypes } from "@xyflow/react";
import TriggerNode, { type TriggerNode as TriggerNodeType} from "./TriggerNode";
import ActionNode, { type ActionNode as ActionNodeType } from "./ActionNode";
import ConditionNode, {type ConditionNode as ConditionNodeType} from "./ConditionNode";

// Assuming you have already set up TriggerNode and other nodes
export const initialNodes = [
  {
    id: "a",
    type: "trigger-node",
    position: { x: 0, y: -200 },
    data: { label: "Perform Trigger" },
  },
  {
    id: "b",
    type: "condition-node",
    position: {x: -10, y: 0},
    data: {label: "Perform Condition"},
  },
  {
    id: "c",
    type: "action-node",
    position: { x: 5, y: 200 },
    data: { label: "Perform Action" },
  }, 
] satisfies Node[];

export const nodeTypes = {
  "trigger-node": TriggerNode,
  "action-node": ActionNode,
  "condition-node": ConditionNode,
  // Add more custom nodes here if needed!
} satisfies NodeTypes;

// Append the new custom node type to the BuiltInNode type
export type CustomNodeType = BuiltInNode | TriggerNodeType | ActionNodeType | ConditionNodeType;
