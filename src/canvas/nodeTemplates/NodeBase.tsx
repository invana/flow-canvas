import React, { memo } from "react";
import { Handle, Position } from "reactflow";
import { NodeBaseProps } from "../core/types";


const NodeBase: React.FC<NodeBaseProps> = ({
  id,
  label,
  selected,
  nodeStyles,
  header,
  body
}: NodeBaseProps) => {
 
  return (
    <div className={"customNode " + (selected ? "selected" : "")} style={nodeStyles?.shape || {}}  >
      <div className="nodeHeader" style={nodeStyles?.header || {}}>
        <Handle
          type="source"
          position={Position.Right}
          id={id}
          className="handle right react-flow__handle" style={nodeStyles?.nodeContainerTargeHandleStyle || {}} />
        {header}
        <Handle
          type="target"
          position={Position.Left}
          id={id}
          className="handle  left react-flow__handle" style={nodeStyles?.nodeContainerSourceHandleStyle || {}} />
      </div>
      <div className="nodeBody" style={nodeStyles?.body || {}}>{body}</div>
    </div>
  );
};

export default memo(NodeBase);
