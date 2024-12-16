import { ReactNode, useState } from "react";
import { Button } from "@/components/ui/button"; // Replace with your actual shadcn/ui path
import ButtonWithTooltip from "./button-with-tooltip";
import { Separator } from "@/components/ui/separator"


interface IOptionsSwitchOption{
  key: string;
  displayName: ReactNode;
  onClick: () => void;
}

export interface IOptionsSwitch {
  options: IOptionsSwitchOption[];
  defaultOptionKey: string
}

function OptionsSwitch({ options, defaultOptionKey }: IOptionsSwitch) {

  const [selected, setSelected] = useState(defaultOptionKey);

  const switchOption = (selected: string) => {
    setSelected(selected);
    const option = options.find(option => option.key === selected);
    if (option) {
      option.onClick();
    }

    // setCurrentIndex((prevIndex) => (prevIndex + 1) % options.length);
  };

  return (
    <div className="flex items-center">
      {options.map((option) => (
          <ButtonWithTooltip
            key={option.key}
            variant="ghost"
            className={selected === option.key ? "text-blue-500 hover:text-blue-500" : ""}
            onClick={()=>switchOption(option.key)}
            tooltip={<p>{option.displayName}</p>}
          >{option.displayName}
          </ButtonWithTooltip>
          // <Separator orientation="vertical" />
      ))}
    </div>
  );
}

export default OptionsSwitch;