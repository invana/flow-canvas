import React, { memo } from "react";
import { Handle, Position } from "@xyflow/react";
import { BaseNodeProps } from "../app/types";


const BaseNode: React.FC<BaseNodeProps> = ({
  id,
  label,
  selected,
  nodeStyles,
  header,
  body,
  className
}: BaseNodeProps) => {
  return (
    <div className={"customNode bg-white dark:bg-gray-800 border rounded-sm " + 
      "border-gray-600 dark:border-gray-300 " + (selected ? "selected" : "") + " " + className} 
      style={nodeStyles?.shape || {}}  >
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
      <div className="nodeBody" style={nodeStyles?.body || {}}>{body || label}</div>
    </div>
  );
};

export default memo(BaseNode);
