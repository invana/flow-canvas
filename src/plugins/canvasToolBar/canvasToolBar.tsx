"use client";
import * as React from "react";
import { Eraser, Maximize, Minus, MonitorCog, Plus, Redo, RefreshCcw, Undo } from "lucide-react";
import {
  Panel,
  useViewport,
  // useStore,
  useReactFlow,
  PanelProps,
} from "@xyflow/react";
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils";
import ButtonWithTooltip from "@/components/ui-extended/button-with-tooltip";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"


const CanvasToolBar = React.forwardRef<
  HTMLDivElement,
  Omit<PanelProps, "children">
>(({ className = "", ...props }) => {
  const { zoom } = useViewport();
  const { zoomTo, zoomIn, zoomOut, fitView } = useReactFlow();

  // const { minZoom, maxZoom } = useStore(
  //   (state) => ({
  //     minZoom: state.minZoom,
  //     maxZoom: state.maxZoom,
  //   }),
  //   (a, b) => a.minZoom !== b.minZoom || a.maxZoom !== b.maxZoom,
  // );

  const onZoomChange = (value: string) => {
    if (value === "fitview") {
      fitView({ duration: 300 });
    }
    else  {
      zoomTo(Number(value) / 100, { duration: 300 });
      // fitView({ duration: 300, minZoom: value, maxZoom: value });
    }
  }


  return (
    <Panel
      className={cn(
        "flex  h-8 items-center rounded-md bg-primary-foreground text-foreground text-[12px] border",
        className,
      )}
      {...props}
    >
      <ButtonWithTooltip
        variant="ghost"
        size="icon"
        onClick={() => zoomOut({ duration: 300 })}
        tooltip={<p>Zoom out</p>}
      >
        <Minus className="h-4 w-4" />
      </ButtonWithTooltip>
      {/* <Slider
        className="w-[140px]"
        value={[zoom]}
        min={minZoom}
        max={maxZoom}
        step={0.01}
        onValueChange={(values) => zoomTo(values[0])}
      /> */}

      <ButtonWithTooltip
        variant="ghost"
        size="icon"
        onClick={() => zoomIn({ duration: 300 })}
        tooltip={<p>Zoom In</p>}
      >
        <Plus className="h-4 w-4" />
      </ButtonWithTooltip>
      <Separator orientation="vertical" />


      <Select onValueChange={onZoomChange}>
        <SelectTrigger className="w-[80px] border-none hover:border-none focus:border-none active:border-none ring-0 shadow-none">
          <SelectValue placeholder={(100 * zoom).toFixed(0)} />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="25">25%</SelectItem>
          <SelectItem value="50">50%</SelectItem>
          <SelectItem value="100">100%</SelectItem>
          <SelectItem value="200">200%</SelectItem>
          <SelectItem value="400">400%</SelectItem>
          <SelectItem value="fitview">Fit View</SelectItem>
        </SelectContent>
      </Select>

      {/* <input
        className="w-10 tabular-nums"
        onChange={(e) => zoomTo(Number(e.target.value) / 100, { duration: 300 })}
        value={(100 * zoom).toFixed(0)}
      /> */}
      <Separator orientation="vertical" />

      <ButtonWithTooltip
        variant="ghost"
        size="icon"
        onClick={() => fitView({ duration: 300 })}
        tooltip={<p>Fitview</p>}
      >
        <Maximize className="h-4 w-4" />
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
 

    </Panel>
  );
});

CanvasToolBar.displayName = "CanvasToolBar";

export default CanvasToolBar;
