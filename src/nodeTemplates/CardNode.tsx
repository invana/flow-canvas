import { memo } from "react";
import BaseNode from "./BaseNode";
import { CanvasNodeProps, NodeStyles } from "../app/types";
import RenderIconOrImgString from "../components/ui-extended/rendereIconOrImgString";
import RenderedHTML from "../components/ui-extended/renderedHtml";


const nodeStyles: NodeStyles = {
  shape: {


  },
  header: {
    background: "var(--canavas-header-bg)"
  },
  body: {
    padding: "10px",
    borderTop: "1px solid var(--canvas-border)"

  },
  nodeContainerTargeHandleStyle: {
    position: "absolute",
    top: "10px"
  },
  nodeContainerSourceHandleStyle:{
    position: "absolute",
    top: "10px"
  }
}

const CardNode = ({ id, data, selected = false }: CanvasNodeProps) => {
  return (
    <BaseNode
      id={id}
      label={data.label}
      selected={selected}
      nodeStyles={nodeStyles}
      className={"min-w-[240px]"}
      header={
        <div className="m-2 flex items-center border-b pb-2 border-b border-gray-600 dark:border-gray-300 ">
          {data.icon && <RenderIconOrImgString icon={data.icon} />} <strong className="ml-1">{data.label}</strong>
        </div>
      }
      // color={"Lavender"}
      body={<>
      {
        data.body? <RenderedHTML html={data.body} /> : <></>
      }
      </>}
    />
  );
};

export default memo(CardNode);
