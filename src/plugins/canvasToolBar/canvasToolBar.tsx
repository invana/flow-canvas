"use client";
import * as React from "react";
import { Download, Eraser, File, FileImage, FileJson, Import, Link, Minimize, Minus, MoveDown, MoveLeft, MoveRight, MoveUp, Network, Plus, Redo, Undo, Upload } from "lucide-react";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import {
  Panel,
  useViewport,
  useReactFlow,
  PanelProps,
} from "@xyflow/react";
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils";
import ButtonWithTooltip from "@/components/ui-extended/button-with-tooltip";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"


const CanvasToolBar = React.forwardRef<
  HTMLDivElement,
  Omit<PanelProps, "children">
>(({ className = "", ...props }) => {
  const { zoom } = useViewport();
  const { zoomTo, zoomIn, zoomOut, fitView } = useReactFlow();

  const onZoomChange = (value: string) => {
    if (value === "fitview") {
      fitView({ duration: 300 });
    }
    else {
      zoomTo(Number(value) / 100, { duration: 300 });
    }
  }


  return (
    <Panel
      className={cn(
        "flex  h-8 items-center rounded-md bg-primary-foreground text-foreground text-sm border",
        className,
      )}
      {...props}
    >
      <DropdownMenu>
        <DropdownMenuTrigger className=" text-left" >
          <span className="pl-3 pr-3">Load</span>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          <DropdownMenuItem><Link className="h-4 w-4" /> Upload from Remote URL</DropdownMenuItem>
          <DropdownMenuItem><File className="h-4 w-4" /> Upload from Local File</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <DropdownMenu>
        <DropdownMenuTrigger className=" text-left">
          <span className="pl-3 pr-3">Save</span>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          <DropdownMenuItem><FileImage className="w-4 h-4" /> Download as Image</DropdownMenuItem>
          <DropdownMenuItem><FileJson className="w-4 h-4" /> Download as JSON</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <Separator orientation="vertical" />
      <Select onValueChange={onZoomChange}>
        <SelectTrigger className="w-[100px] border-none hover:border-none focus:border-none active:border-none ring-0 shadow-none">
          <SelectValue placeholder={(100 * zoom).toFixed(0)} />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="10">10%</SelectItem>
          <SelectItem value="25">25%</SelectItem>
          <SelectItem value="50">50%</SelectItem>
          <SelectItem value="100">100%</SelectItem>
          <SelectItem value="200">200%</SelectItem>
          {/* <SelectItem value="400">400%</SelectItem> */}
          <SelectItem value="fitview">Fit View</SelectItem>
        </SelectContent>
      </Select>
      <Separator orientation="vertical" />
      <ButtonWithTooltip
        variant="ghost"
        size="icon"
        onClick={() => zoomOut({ duration: 300 })}
        tooltip={<p>Zoom out</p>}
      >
        <Minus className="h-4 w-4" />
      </ButtonWithTooltip>
      <ButtonWithTooltip
        variant="ghost"
        size="icon"
        onClick={() => zoomIn({ duration: 300 })}
        tooltip={<p>Zoom In</p>}
      >
        <Plus className="h-4 w-4" />
      </ButtonWithTooltip>

      <Separator orientation="vertical" />
      <ButtonWithTooltip
        variant="ghost"
        size="icon"
        onClick={() => fitView({ duration: 300 })}
        tooltip={<p>Undo</p>}
      >
        <Undo className="h-4 w-4" />
      </ButtonWithTooltip>
      {/* <ButtonWithTooltip
        variant="ghost"
        size="icon"
        onClick={() => fitView({ duration: 300 })}
        tooltip={<p>Redraw</p>}
      >
        <RefreshCcw className="h-4 w-4" />
      </ButtonWithTooltip> */}
      <ButtonWithTooltip
        variant="ghost"
        size="icon"
        onClick={() => fitView({ duration: 300 })}
        tooltip={<p>Redo</p>}
      >
        <Redo className="h-4 w-4" />
      </ButtonWithTooltip>
      <Separator orientation="vertical" />
      <ButtonWithTooltip
        variant="ghost"
        size="icon"
        onClick={() => fitView({ duration: 300 })}
        tooltip={<p>Erase Everything</p>}
      >
        <Eraser className="h-4 w-4" />
      </ButtonWithTooltip>
      <Separator orientation="vertical" />
      <span className="flex items-center space-x-2 pl-3">
        <Network className="h-4 w-4" />
        <Select onValueChange={(value) => console.log(value)} defaultValue="left-to-right">
          <SelectTrigger className="w-[150px] border-none hover:border-none focus:border-none active:border-none ring-0 shadow-none">
            <SelectValue placeholder="Layout" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="left-to-right">
              <span className="flex items-center"><MoveRight className="w-4 h-4 mr-2" /> Left to Right</span>
            </SelectItem>
            <SelectItem value="right-to-left">
              <span className="flex items-center"><MoveLeft className="w-4 h-4 mr-2" /> Right to Left</span>
            </SelectItem>
            <SelectItem value="top-to-bottom">
              <span className="flex items-center"><MoveDown className="w-4 h-4 mr-2" /> Top to Bottom</span>
            </SelectItem>
            <SelectItem value="bottom-to-top">
              <span className="flex items-center"><MoveUp className="w-4 h-4 mr-2" /> Bottom to Top</span>
            </SelectItem>
          </SelectContent>
        </Select>
      </span>
    </Panel>
  );
});

CanvasToolBar.displayName = "CanvasToolBar";

export default CanvasToolBar;
