import { memo } from "react";
import BaseNode from "../BaseNode";
import iconUrl from "./stickyNotes.svg"
import { CanvasNodeProps, NodeStyles } from "@/app/types";
import RenderedHTML from "../../compon/renderedHtml";
import RenderIconOrImgString from "@/compon/rendereIconOrImgString";
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

const CommentNode = ({ id, data, selected }: CanvasNodeProps) => {

  const icon = data.icon ? data.icon : <StickyNoteIcon className="w-4 h-4" />
  return (
    <BaseNode
      id={id}
      label={data.label}
      selected={selected}
      nodeStyles={nodeStyles}
      className="border-0"
      header={
      <div className=" flex items-center ">
        {<RenderIconOrImgString style={{position: "absolute", top: 0}} icon={icon} />} 
        <strong>{data.label}</strong>
      </div>
      }
      body={ <>
        <RenderedHTML html={data?.commentText || ""} />
      </>} 
    />
  );
};

export default memo(CommentNode);
