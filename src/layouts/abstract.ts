import { CanvasNode, CanvasEdge } from "../core/types";
import { ReactFlowInstance } from "@xyflow/react"
;

export abstract class LayoutEngine {
    abstract getLayoutedElements(
        nodes: CanvasNode[],
        edges: CanvasEdge[],
        flowInstance: ReactFlowInstance | null,
        direction: string
    ): { layoutedNodes: CanvasNode[], layoutedEdges: CanvasEdge[] };
}