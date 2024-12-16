export const getNodesAndEdges = (xNodes = 10, yNodes = 10, gap = 50) => {
  const nodes = [];
  const edges = [];
  let nodeId = 1;
  let recentNodeId = null;

  for (let y = 0; y < yNodes; y++) {
    for (let x = 0; x < xNodes; x++) {
      const position = { x: x * (100 + gap), y: y * (50 + gap) };
      const data = { label: `Node ${nodeId}` };
      const node = {
        id: `stress-${nodeId.toString()}`,
        style: { width: 50, fontSize: 11 },
        data,
        position,
      };
      nodes.push(node);

      if (recentNodeId && nodeId <= xNodes * yNodes) {
        edges.push({
          id: `${x}-${y}`,
          source: `stress-${recentNodeId.toString()}`,
          target: `stress-${nodeId.toString()}`,
        });
      }

      recentNodeId = nodeId;
      nodeId++;
    }
  }

  return { initialNodes: nodes, initialEdges: edges };
}