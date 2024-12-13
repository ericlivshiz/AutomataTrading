import type { BuiltInEdge, Edge, EdgeTypes } from "@xyflow/react";

import MenuEdge, { type MenuEdge as MenuEdgeType } from "./MenuEdge";

export const initialEdges = [
  { id: "a->b", source: "a", target: "b", type: "menuEdge", animated: true },
  { id: "b->c", source: "b", target: "c", type: "menuEdge", animated: true },
] satisfies Edge[];

export const edgeTypes = {
  menuEdge: MenuEdge,
} satisfies EdgeTypes;

export type CustomEdgeType = BuiltInEdge | MenuEdgeType;
