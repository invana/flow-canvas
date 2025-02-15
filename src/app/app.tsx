import { useCallback, useState, useRef, useEffect } from "react";
import ReactFlow, {
  addEdge,
  MiniMap,
  Panel,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  ReactFlowInstance,
  ReactFlowProvider,
  applyEdgeChanges, applyNodeChanges, NodeChange, EdgeChange, Edge, Node
} from "reactflow";
import "../style.scss";
import styled, { ThemeProvider } from 'styled-components';
import { darkTheme, lightTheme } from "./theme";
import React from "react";
import "reactflow/dist/style.css";
import { CanvasEdge, CanvasNode, FlowCanvasProps } from "../core/types";
import { CanvasNodeTemplates } from "../nodeTemplates";
import { CanvasEdgeTemplates } from "../edgeTemplates";
import CanvasInteractions from "../interactions/interactions";
import { defaultCanvasSettings, defaultCanvasStyle } from "./defaults";
import NoLayoutEngine from "../layouts/noLayout";
import { ContextMenuType } from "../components/ContextMenu/types";


const FlowCanvas = ({
  children,
  initialNodes = [],
  initialEdges = [],
  layoutEngine = new NoLayoutEngine(),
  NodeContextMenu, 
  EdgeContextMenu,
  style = defaultCanvasStyle,
  canvasSettings = defaultCanvasSettings,
  canvasNodeTemplates = CanvasNodeTemplates,
  canvasEdgeTemplates = CanvasEdgeTemplates,
  canvasInteractions = new CanvasInteractions(),
  hideAttribution = false
}: FlowCanvasProps) => {
  console.log("==FlowCanvas canvasSettings", canvasSettings)


  const [flowInstance, setFlowInstance] = useState<ReactFlowInstance | null>(null);
  const [direction, setDirection] = useState("LR");
  console.log("===setDirection", setDirection)

  // for theming
  const [mode, setMode] = useState('dark');
  const theme = mode === 'light' ? lightTheme : darkTheme;
  const toggleMode = () => {
    setMode((m) => (m === 'light' ? 'dark' : 'light'));
  };
  // Detect changes to the mode state
  useEffect(() => {
    console.log("Mode changed to:", mode);
    document.querySelector("html")?.setAttribute("data-canvas-theme", mode);
  }, [mode]);

  // ends for theming

  // for data
  initialNodes = initialNodes.map(node => ({ ...node, position: node.position || { x: 0, y: 0 } }))
  const [nodes, setNodes] = useNodesState<CanvasNode>(initialNodes);
  const [edges, setEdges] = useEdgesState<CanvasEdge>(initialEdges);

  const onNodesChange = useCallback(
    (changes: NodeChange[]) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [setNodes]
  );
  const onEdgesChange = useCallback(
    (changes: EdgeChange[]) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    [setEdges]
  );
  const ref = useRef(null);



  const [contextMenuItem, setContextMenuItem] = useState<ContextMenuType | null>(null);

  const onNodeContextMenu = useCallback(
    (event: React.MouseEvent, node: Node) => {
      event.preventDefault();
      
      const pane = ref.current ? (ref.current as HTMLDivElement).getBoundingClientRect() : { width: 0, height: 0 };

      setContextMenuItem({
        id: node.id,
        type: "node",
        top: event.clientY < pane.height - 200 ? event.clientY : 0,
        left: event.clientX < pane.width - 200 ? event.clientX : 0,
        right: event.clientX >= pane.width - 200 ? pane.width - event.clientX : 0,
        bottom: event.clientY >= pane.height - 200 ? pane.height - event.clientY : 0,
      });
    },
    [setContextMenuItem]
  );

  const onEdgeContextMenu = useCallback(
    (event: React.MouseEvent, edge: Edge) => {
      event.preventDefault();
      const pane = ref.current ? (ref.current as HTMLDivElement).getBoundingClientRect() : { width: 0, height: 0 };
      setContextMenuItem({
        id: edge.id,
        type: "edge",
        top: event.clientY < pane.height - 200 ? event.clientY : 0,
        left: event.clientX < pane.width - 200 ? event.clientX : 0,
        right: event.clientX >= pane.width - 200 ? pane.width - event.clientX : 0,
        bottom: event.clientY >= pane.height - 200 ? pane.height - event.clientY : 0,
      });
    },
    [setContextMenuItem]
  );

  // const onPaneClick = useCallback(() => setContextMenuItem(null), [setContextMenuItem]);

  const onInit = (reactFlowInstance: ReactFlowInstance) => {
    setFlowInstance(reactFlowInstance);

    onLayoutUpdated(direction, reactFlowInstance);
  };

  const onConnect = useCallback(
    (params: Edge) => setEdges((eds) => addEdge({ ...params }, eds)),
    []
  );

  const onLayoutUpdated = useCallback(
    (direction: string, flowInstance: ReactFlowInstance) => {

      flowInstance = flowInstance ? flowInstance : flowInstance;
      const { layoutedNodes, layoutedEdges } = layoutEngine.getLayoutedElements(
        nodes,
        edges,
        flowInstance,
        direction
      );
      console.log("=====layoutedNodes", layoutedNodes, layoutedEdges)
      setNodes([...layoutedNodes]);
      setEdges([...layoutedEdges]);
      flowInstance?.zoomTo(1);
      flowInstance?.fitView();
    },
    [nodes, edges, flowInstance]
  );

  const edgesWithUpdatedTypes = edges.map((edge) => {
    if (edge.source === edge.target) {
      edge.type = "SelfConnectingEdge";
    }
    return edge;
  });

  const MiniMapStyled = styled(MiniMap)`
    background-color: ${(props) => props.theme.bg};

    .react-flow__minimap-mask {
      fill: ${(props) => props.theme.minimapMaskBg};
    }

    .react-flow__minimap-node {
      stroke: none;
    }
  `;

  const ControlsStyled = styled(Controls)`
    button {
      background-color: ${(props) => props.theme.controlsBg};
      color: ${(props) => props.theme.controlsColor};
      border-bottom: 1px solid ${(props) => props.theme.controlsBorder};

      &:hover {
        background-color: ${(props) => props.theme.controlsBgHover};
      }

      path {
        fill: currentColor;
      }
    }
  `;

  return (
    <div style={style}>
      <ThemeProvider theme={theme}>
        <ReactFlowProvider>
          <ReactFlow
            ref={ref}
            nodes={nodes}
            // className="dark-theme"
            edges={edgesWithUpdatedTypes}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onInit={onInit}
            onEdgeClick={(event: React.MouseEvent, edge: Edge) => canvasInteractions && canvasInteractions.onEdgeClick(event, edge, flowInstance)}
            onEdgeMouseEnter={(event: React.MouseEvent, edge: Edge) => canvasInteractions && canvasInteractions.onEdgeMouseEnter(event, edge, flowInstance)}
            onEdgeMouseLeave={(event: React.MouseEvent, edge: Edge) => canvasInteractions && canvasInteractions.onEdgeMouseLeave(event, edge, flowInstance)}
            onNodeMouseEnter={(event: React.MouseEvent, node: Node) => canvasInteractions && canvasInteractions.onNodeMouseEnter(event, node, flowInstance)}
            onNodeMouseLeave={(event: React.MouseEvent, node: Node) => canvasInteractions && canvasInteractions.onNodeMouseLeave(event, node, flowInstance)}
            onNodeContextMenu={onNodeContextMenu}
            onEdgeContextMenu={onEdgeContextMenu}
            fitView
            minZoom={0.2}
            attributionPosition="top-right"
            nodeTypes={canvasNodeTemplates}
            edgeTypes={canvasEdgeTemplates}

            proOptions={{ hideAttribution: hideAttribution }}
          >
             {/* onClick={onPaneClick} */}
            {contextMenuItem && EdgeContextMenu && contextMenuItem.type === "edge" && <EdgeContextMenu {...contextMenuItem} />}
            {contextMenuItem && NodeContextMenu && contextMenuItem.type === "node" && <NodeContextMenu {...contextMenuItem} />}
            <MiniMapStyled
              nodeColor={(node) => {
                switch (node.type) {
                  case "DataStore":
                    return "LightGreen";
                  case "Collection":
                    return "Lavender";
                  case "DerivedCollectionNode":
                    return "LightBlue";
                  default:
                    return "#eee";
                }
              }}
              zoomable
              pannable
            />
            <ControlsStyled />
            <Background color="#444" style={{ backgroundColor: theme.bg }} gap={16} />
            <Panel position="top-right">
              <button onClick={() => onLayoutUpdated("TB")}>vertical layout</button>
              <button onClick={() => onLayoutUpdated("LR")}>horizontal layout</button>
              <button onClick={toggleMode}>switch mode</button>
            </Panel>
            {children}
          </ReactFlow>
        </ReactFlowProvider>
      </ThemeProvider>
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
