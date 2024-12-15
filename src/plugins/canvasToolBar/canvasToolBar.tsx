"use client";
import * as React from "react";
import { Maximize, Minus, Plus } from "lucide-react";
import {
  Panel,
  useViewport,
  useStore,
  useReactFlow,
  PanelProps,
} from "@xyflow/react";
import { Separator } from "@/components/ui/separator"
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import ButtonWithTooltip from "@/components/extended/button-with-tooltip";


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



  return (
    <Panel
      className={cn(
      "flex gap-1 rounded-md bg-primary-foreground text-foreground text-[12px] border",
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
      <input
        className="w-10 tabular-nums"
        onChange={(e) => zoomTo(Number(e.target.value) / 100, { duration: 300 })}
        value={(100 * zoom).toFixed(0)}
      />
      <ButtonWithTooltip
        variant="ghost"
        size="icon"
        onClick={() => zoomIn({ duration: 300 })}
        tooltip={<p>Zoom In</p>}
      >
        <Plus className="h-4 w-4" />
      </ButtonWithTooltip>
      <ButtonWithTooltip
        variant="ghost"
        size="icon"
        onClick={() => fitView({ duration: 300 })}
        tooltip={<p>Fitview</p>}
      >
        <Maximize className="h-4 w-4" />
      </ButtonWithTooltip>
      <Separator orientation="vertical" />

    </Panel>
  );
});

CanvasToolBar.displayName = "CanvasToolBar";

export default CanvasToolBar;
