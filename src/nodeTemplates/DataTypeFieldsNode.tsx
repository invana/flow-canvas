import React, { memo } from "react";
import { Handle, Position, ReactFlowState, useStore, useStoreApi } from "@xyflow/react";
import BaseNode from "./BaseNode";
import { generateFieldName } from "../utils";
import {
  highlightHandlePathByNodeHandleId,
  resetHandlePathHighlight
} from "../interactions/EntityRelationHighlight";
import { NodeField, CanvasNodeProps, NodeStyles } from "../app/types";


const nodeStyles: NodeStyles = {
  shape: {
    // border: "1px solid var(--canvas-border)",
    // borderTop:  "2px solid var(--canvas-border)",
    // borderRadius: "3px",
    // boxShadow: "2px 4px 0px 1px var(--canvas-node-shadow)"

  },
  header: {

  },
  body: {

  },
  nodeContainerTargeHandleStyle: {
    position: "absolute",
    top: "10px"
  },
  nodeContainerSourceHandleStyle: {
    position: "absolute",
    top: "10px"
  }
}

const DataTypeFieldsNode = ({ id, data, selected = false }: CanvasNodeProps) => {
  const store = useStoreApi();
  const nodes = useStore((state: ReactFlowState) => state.nodes);
  const edges = useStore((state: ReactFlowState) => state.edges);
  const { setNodes, setEdges } = store.getState();

  const onMouseOver = (e: React.MouseEvent) => {
    const el = e.currentTarget;
    const nodeId: string = el.getAttribute("data-node-id") || "";
    const handleId: string | null = el.getAttribute("data-handle-id");
    highlightHandlePathByNodeHandleId(nodeId, handleId, nodes, edges, setNodes, setEdges);
    // https://github.com/wbkd/react-flow/issues/2418
  };

  const onMouseOut = (e: React.MouseEvent) => {
    console.log("onMouseOut", e);
    resetHandlePathHighlight(nodes, edges, setNodes, setEdges);
  };

  const handleClick = (e: React.MouseEvent) => {
    onMouseOver(e);
  };

  const fields = data.fields || [];

  return (
    <BaseNode
      id={id}
      label={data.label}
      selected={selected}
      nodeStyles={nodeStyles}
      className="min-w-[240px]"
      header={
        <div className={"bg-slate-300 rounded-t-sm border-b border-gray-600 dark:border-gray-300 " +
          " p-2 text-sm font-bold"}>{data.label}</div>
      }
      body={
        <div>
          {fields && fields.map((field: NodeField, index) => (
            <div
              className={`p-1 pl-2 pr-2 nodeField relative ${index !== fields.length - 1 ? 'border-b border-secondary' : ''}`}
              onMouseOver={onMouseOver}
              onMouseOut={onMouseOut}
              id={generateFieldName(id, field.id)}
              onClick={handleClick}
              data-node-id={id}
              data-handle-id={field.id}
              key={"i-" + field.label}
            >
              <div className="flex justify-between text-gray-600 dark:text-gray-400 items-center">
                <div>{field.label}</div>
                <div className="text-xs">{field.data_type}</div>
              </div>
              {/* <Handle type="source" position={Position.Top} id={field.id}/>
                <Handle type="source" position={Position.Bottom} id={field.id}/> */}

              <Handle type="source" position={Position.Right} id={field.id} />
              <Handle type="target" position={Position.Left} id={field.id} />
            </div>
          ))}
        </div>
      }
    />
  );
};

export default memo(DataTypeFieldsNode);
