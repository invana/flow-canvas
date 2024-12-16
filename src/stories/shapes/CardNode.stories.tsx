import type { Meta, StoryObj } from '@storybook/react';
import FlowCanvas from '../../app/app';
import { BsFillBuildingsFill } from "react-icons/bs";
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';


// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  title: 'Shapes/CardNode',
  component: FlowCanvas,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof FlowCanvas>;

export default meta;
type Story = StoryObj<typeof meta>;


const exampleData = [{
  id: "2.1",
  type: "CardNode",
  data: {
    label: "Card with Html Body",
    icon: BsFillBuildingsFill,
    body: (
      <div className="flex flex-col gap-6">
      <div className="grid gap-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="m@example.com"
          required
        />
      </div>
      <Button type="submit" className="w-full">
        Login
      </Button>
    </div>
    )
  },
  style: {
    width: "400px"
  },
  "position": {
    "x": -462.6688995489353,
    "y": -249.0542457456631
  },
},
{
  id: "2.3",
  type: "CardNode",
  data: {
    label: "With Node icon",
    icon: "https://invana.io/public/img/vendor-logos/janusgraph.png",
    body: (
      <div>
        <img src='https://picsum.photos/200/300' style={{ margin: '0 auto', width: '100%', height: 'auto' }} />
      </div>
    )
  },
  "position": {
    "x": 150.15590727594028,
    "y": -383.32989646710155
  }
}
];


export const CardNode: Story = {
  args: {
    initialNodes: exampleData,
    // initialEdges: initialEdges,
  },
};
