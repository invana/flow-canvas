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
import ButtonWithTooltip from "@/components/extended/button-with-tooltip";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"


const DisplaySettingsToolBar = React.forwardRef<
  HTMLDivElement,
  Omit<PanelProps, "children">
>(({ className = "", position="top-right", ...props }) => {
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
      position={position}
      className={cn(
        "flex  h-8 items-center rounded-md bg-primary-foreground text-foreground text-[12px] border",
        className,
      )}
      {...props}
    >
      <ButtonWithTooltip
        variant="ghost"
        size="icon"
        onClick={() => fitView({ duration: 300 })}
        tooltip={<p>Display Settings</p>}
      >
        <MonitorCog className="h-4 w-4" />
      </ButtonWithTooltip>

    </Panel>
  );
});

DisplaySettingsToolBar.displayName = "DisplaySettingsToolBar";

export default DisplaySettingsToolBar;
