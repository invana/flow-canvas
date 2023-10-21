import { CanvasNode } from "../types";
import dagre from "dagre";
import { Position } from 'reactflow';




const defaultNodeWidth = 180 + 30;
const defaultColumnHeight = 36;
// const nodeHeight = 36;

function calcNodeHeight(node: CanvasNode) {
    if (node.data.fields) {
        return defaultColumnHeight * node.data.fields.length + 60;
    }
    return defaultColumnHeight + 60;
}

const dagreGraph = new dagre.graphlib.Graph();
dagreGraph.setDefaultEdgeLabel(() => ({}));


export const getLayoutedElements = (nodes: any[], edges: any[], flowInstance: any= null,  direction: string = "LR") => {
    // https://v9.reactflow.dev/examples/layouting/
    // In order to keep this example simple the node width and height are hardcoded.
    // In a real world app you would use the correct width and height values of
    // const nodes = useStoreState(state => state.nodes) and then node.__rf.width, node.__rf.height

    console.log("getLayoutedElements", flowInstance, direction)
    const isHorizontal = direction === "LR";
    const graphOptions =  direction === "LR" ? {rankSep: 150} : {rankSep: 100}


    dagreGraph.setGraph({ rankdir: direction, 
        // nodesep:200,
        ...graphOptions
    });

    nodes.forEach((node: CanvasNode) => {
        // console.log("node.id", node.id, flowInstance, flowInstance?.getNode(node.id));

        const nodeSizeInfo = flowInstance ? flowInstance.getNode(node.id)  :{}
        // console.log("=====nodeSizeInfo.__rf", nodeSizeInfo?.width, nodeSizeInfo?.height)
        // console.log("==========nodeSizeInfo", nodeSizeInfo)
        dagreGraph.setNode(node.id, {
            width: nodeSizeInfo?.width || defaultNodeWidth,
            height: nodeSizeInfo?.height ||  calcNodeHeight(node)
        });
    });

    edges.forEach((edge: { source: string; target: string; }) => {
        dagreGraph.setEdge(edge.source, edge.target, {
            // length: 200
        });
    });

    dagre.layout(dagreGraph);

    nodes.forEach((node: CanvasNode) => {
        const nodeWithPosition = dagreGraph.node(node.id);
        node.targetPosition = isHorizontal ? Position.Left : Position.Top;
        node.sourcePosition = isHorizontal ? Position.Right : Position.Bottom;

        // We are shifting the dagre node position (anchor=center center) to the top left
        // so it matches the React Flow node anchor point (top left).
        node.position = {
            x: nodeWithPosition.x - nodeWithPosition.width / 2,
            y: nodeWithPosition.y - nodeWithPosition.height / 2
        };

        return node;
    });
    const layoutedNodes = nodes;
    const layoutedEdges = edges;

    return { layoutedNodes, layoutedEdges };
};
