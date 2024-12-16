import  { memo } from "react";
import BaseNode from "./BaseNode";
import { CanvasNodeProps, NodeStyles } from "../app/types";
import RenderIconOrImgString from "../compon/rendereIconOrImgString";


const nodeStyles: NodeStyles = {
  shape: {
  },
  header: {
  },
  body: {
  },
}

const GenericNode = ({ id, data, selected }: CanvasNodeProps) => {

  return (
    <BaseNode
      id={id}
      label={data.label}
      selected={selected}
      nodeStyles={nodeStyles}
      header={
        <div className="m-2 flex items-center">
            {data.icon? <RenderIconOrImgString icon={data.icon} />: <></>}
            <strong>{data.label}</strong>
        </div>
      }
      body={<>
      </>}
    />
  );
};

export default memo(GenericNode);
