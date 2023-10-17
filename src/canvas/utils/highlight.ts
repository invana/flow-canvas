// Reference https://github.com/wbkd/react-flow/issues/2418
import { CanvasEdge, CanvasNode, StringOrNull } from "../core/types";
import { generateFieldName } from "../utils";

const getNextIncomingEdges = (nodeId: string, handleId: StringOrNull, nodes: CanvasNode[], edges: CanvasEdge[]) => {
  const incomingEdges = edges
    .filter((e) => e.target === nodeId && e.targetHandle === handleId)
    .map((e) => e);
  return incomingEdges;
};

const getNextOutgoingEdges = (nodeId: string, handleId: StringOrNull, nodes: CanvasNode[], edges: CanvasEdge[]) => {
  const outgoingEdges = edges
    .filter((e) => e.source === nodeId && e.sourceHandle === handleId)
    .map((e) => e);
  return outgoingEdges;
};

const getAllIncomers = (
  nodeId : string,
  handleId: StringOrNull,
  nodes: CanvasNode[],
  edges: CanvasEdge[],
  prevIncomingEdge: CanvasEdge[] = []
) => {
  const incomingEdges = getNextIncomingEdges(nodeId, handleId, nodes, edges);
  const result = incomingEdges.reduce((memo: any, inComingEdge: CanvasEdge) => {
    memo.push(inComingEdge);
    console.log("inComingEdge", inComingEdge);

    if (prevIncomingEdge.findIndex((n: CanvasEdge) => n.id === inComingEdge.target) === -1) {
      prevIncomingEdge.push(inComingEdge);

      getAllIncomers(
        inComingEdge.source,
        inComingEdge.sourceHandle,
        nodes,
        edges,
        prevIncomingEdge
      ).forEach((foundEdge: CanvasEdge) => {
        memo.push(foundEdge);

        if (prevIncomingEdge.findIndex((n: CanvasEdge) => n.id === foundEdge.id) === -1) {
          prevIncomingEdge.push(inComingEdge);
        }
      });
    }
    return memo;
  }, []);
  return result;
};

const getAllOutgoers = (nodeId:string, handleId:StringOrNull, nodes: CanvasNode[], edges: CanvasEdge[], prevOutgoers: CanvasEdge[] = []) => {
  const outGoingEdges = getNextOutgoingEdges(nodeId, handleId, nodes, edges);
  console.log("====outGoingEdges", outGoingEdges);
  return outGoingEdges.reduce((memo: any, outGoingEdge: CanvasEdge) => {
    memo.push(outGoingEdge);
    console.log("====outGoingEdge", outGoingEdge);

    if (prevOutgoers.findIndex((n) => n.id === outGoingEdge.id) === -1) {
      prevOutgoers.push(outGoingEdge);

      getAllOutgoers(
        outGoingEdge.target,
        outGoingEdge.targetHandle,
        nodes,
        edges,
        prevOutgoers
      ).forEach((foundEdge: CanvasEdge) => {
        memo.push(foundEdge);

        if (prevOutgoers.findIndex((n) => n.id === foundEdge.id) === -1) {
          prevOutgoers.push(foundEdge);
        }
      });
    }
    return memo;
  }, []);
};

export const getNodeHandles = (edges: CanvasEdge[]) => {
  const nodeHandles: string[] = edges
    .map((edge) => {
      if (
        edge.source === edge.sourceHandle ||
        edge.target === edge.targetHandle
      ) {
        // ignore edges that doesnt have real handles
        return [];
      } else {
        return [
          generateFieldName(edge.source, edge.sourceHandle),
          generateFieldName(edge.target, edge.targetHandle)
        ];
      }
    })
    .flat();
  return [...new Set(nodeHandles)];
};

export const highlightHandlePath = (
  nodeId: string,
  handleId: StringOrNull,
  nodes: CanvasNode[],
  edges: CanvasEdge[],
  setNodes: any,
  setEdges: any
) => {
  resetHandlePathHighlight(nodes, edges, setNodes, setEdges);
  const allIncomingEdges = getAllIncomers(nodeId, handleId, nodes, edges);
  const allOutgoingEdges = getAllOutgoers(nodeId, handleId, nodes, edges);

  // make all other columns inactive
  document.querySelectorAll(".nodeField").forEach((el) => {
    el.classList.add("inactive");
  });

  // highlight edges
  const toHighlightEdges = allIncomingEdges.concat(allOutgoingEdges);
  const toHighlightEdgesIds = toHighlightEdges.map((edge: CanvasEdge) => edge.id);
  const edgesHighlited = edges?.map((edge) => {
    console.log();
    if (toHighlightEdgesIds.includes(edge.id)) {
      edge.animated = true;
      edge.style = {
        ...edge.style,
        stroke: "blue"
      };
    }else{
      edge.hidden = true // 
    
    }
    return edge;
  });
  setEdges(edgesHighlited);

  // hightlight current handle when no edges are present
  const toHighlightHandleIds =
    toHighlightEdges.length === 0
      ? [generateFieldName(nodeId, handleId)]
      : getNodeHandles(toHighlightEdges);

   toHighlightHandleIds.forEach((handleId) => {
    const el: HTMLElement | null = document.getElementById(handleId);
    if (el){
      el.classList.add("highlight");
      el.classList.remove("inactive");  
    }
  });
};

export const resetHandlePathHighlight = (nodes: CanvasNode[], edges: CanvasEdge[], setNodes: any, setEdges: any) => {
  console.log("resetHandlePathHighlight");
  // remove highlighting of all handles
  document.querySelectorAll(".nodeField").forEach((el) => {
    el.classList.remove("highlight");
    el.classList.remove("inactive");
  });

  // remove edge path hightlights of all handle paths
  const edgesHighlighted = edges?.map((edge) => {
    edge.animated = false;
    edge.style = {
      ...edge.style,
      stroke: "#ccc",
    };
    edge.hidden = false;
    return edge;
  });
  setEdges(edgesHighlighted);
};
