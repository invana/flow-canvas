import {
  ReactFlow,
  ReactFlowProvider,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState
} from "@xyflow/react";
import '@xyflow/react/dist/style.css';
import "../style.scss";
import { defaultCanvasStyle } from "./defaults";
import { FlowCanvasProps } from "./types";
import { useRef } from "react";
import { CanvasToolBar } from "@/plugins/canvasToolBar";


const FlowCanvas = ({
  children,
  initialNodes = [],
  initialEdges = [],
  style = defaultCanvasStyle,
  // canvasSettings = defaultCanvasSettings,
  hideAttribution = false,
  ...props
}: FlowCanvasProps) => {
  console.log("==FlowCanvas canvasSettings", props)


  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const ref = useRef(null);

  return (
    <div style={style}>
      <ReactFlowProvider fitView>
        <ReactFlow
          ref={ref}
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          fitView
          minZoom={0.1}
          attributionPosition="top-right"
          proOptions={{ hideAttribution: hideAttribution }}
        >
          <MiniMap zoomable pannable />
          <Background />
          <Controls />
          <CanvasToolBar />
          {children}
        </ReactFlow>
      </ReactFlowProvider>
    </div>
  );
};

// FlowCanvas.defaultProps = {
//   // onLayoutUpdatedChange: defaultLayoutChange,
//   // canvasInteractions: new CanvasInteractions(),
//   // NodeContextMenu: GenericNodeContextMenu,
//   // EdgeContextMenu: GenericEdgeContextMenu
// };

export default FlowCanvas;
