import { CSSProperties, memo } from "react";
import BaseNode from "./BaseNode";
import { CanvasNodeProps, NodeStyles } from "../app/types";
import RenderIconOrImgString from "../components/ui-extended/rendereIconOrImgString";
import { type Node } from "@xyflow/react";


export type AnnotationNode = Node<{
  label: string;
  level?: number;
  arrow?: React.ReactNode;
  arrowStyle?: CSSProperties;
}>;

const nodeStyles: NodeStyles = {
  shape: {
  },
  header: {
  },
  body: {
  },
}

const AnnotationNode = ({ id, data, selected = false }: CanvasNodeProps) => {

  return (
    <BaseNode
      id={id}
      label={data.label}
      selected={selected}
      nodeStyles={nodeStyles}
      className="!border-0 max-w-[200px] !bg-transparent"
      hideHandles={true}
      body={<div  className="relative flex max-w-[180px] items-start p-2 text-sm text-secondary-foreground">
        {typeof data.level === 'number' && (
          <div className="mr-1 leading-snug">{data.level}.</div>
        )}
        <div className="leading-snug">{data.label}</div>
        {data.arrowStyle && (
          <div
            className="absolute text-2xl"
            style={data.arrowStyle}
          >
            {data.arrow}
          </div>
        )}
      </div>
      }
    />
  );
};

export default memo(AnnotationNode);
