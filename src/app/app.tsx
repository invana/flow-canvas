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
import "../style.css";
import { defaultCanvasStyle } from "./defaults";
import { FlowCanvasProps } from "./types";
import { useRef } from "react";
import CanvasToolBar from "@/plugins/canvasToolBar/canvasToolBar";
import DisplaySettingsToolBar from "@/plugins/displaySettings/displaySettings";
import { Toaster } from "@/components/ui/sonner"
import { defaultNodeTypes } from "@/nodeTemplates";


const FlowCanvas = ({
  children,
  initialNodes = [],
  initialEdges = [],
  style = defaultCanvasStyle,
  extraNodeTypes= {},
  // canvasSettings = defaultCanvasSettings,
  // hideAttribution = false,
  ...props
}: FlowCanvasProps) => {
  console.log("==FlowCanvas canvasSettings", props)


  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const nodeTypes = {...defaultNodeTypes, ...extraNodeTypes};

  // console.log("=====nodeTypes", nodeTypes)
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
          nodeTypes={nodeTypes}
          attributionPosition="top-right"
          proOptions={{ hideAttribution: true }}
        >
          <MiniMap zoomable pannable />
          <Background />
          <Controls />
          <CanvasToolBar />
          <DisplaySettingsToolBar />
          {children}
        </ReactFlow>
      </ReactFlowProvider>
      <Toaster />
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
