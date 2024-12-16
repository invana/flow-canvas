import { memo } from "react";
import BaseNode from "./BaseNode";
import iconUrl from "./stickyNotes.svg"
import { CanvasNodeProps, NodeStyles } from "@/app/types";
import RenderedHTML from "../components/ui-extended/renderedHtml";
import RenderIconOrImgString from "@/components/ui-extended/rendereIconOrImgString";
import { StickyNoteIcon } from "lucide-react";


const nodeStyles: NodeStyles = {
  shape: {
    backgroundColor: "#ffffcc",
    // border: "1px solid #ffeb3b",
    borderLeft: "5px solid #ffeb3b",
    color: "#222222",
    padding: "5px 10px",
    boxShadow: "0 4px 6px -1px rgb(0 0 0 / 15%), 0 2px 4px -1px rgb(0 0 0 / 8%);",
    width: "180px"
  },
  header: {

  },
  body: {
 
  },
  nodeContainerTargeHandleStyle: {
    position: "absolute",
    top: "20px"
  },
  nodeContainerSourceHandleStyle:{
    position: "absolute",
    top: "20px"
  }
}

const CommentNode = ({ id, data, selected = false }: CanvasNodeProps) => {

  const icon = data.icon ? data.icon : <StickyNoteIcon className="w-4 h-4" />
  return (
    <BaseNode
      id={id}
      label={data.label}
      selected={selected}
      nodeStyles={nodeStyles}
      hideHandles={true}
      className="border-0 max-w-[200px]"
      header={
      <div className=" flex items-center ">
        {<RenderIconOrImgString icon={icon} />} 
        <strong>{data.label}</strong>
      </div>
      }
      body={ <>
        <RenderedHTML html={data?.commentText || ""} className={"text-xs"} />
      </>} 
    />
  );
};

export default memo(CommentNode);
