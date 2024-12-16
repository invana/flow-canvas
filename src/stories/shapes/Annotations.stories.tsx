import type { Meta, StoryObj } from '@storybook/react';
import FlowCanvas from '../../app/app';


const meta = {
  title: 'Shapes/AnnotationNode',
  component: FlowCanvas,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof FlowCanvas>;

export default meta;
type Story = StoryObj<typeof meta>;


const data = {
  "nodes": [
    {
      "id": "1a",
      "type": "input",
      "data": {
        "label": "Node 1"
      },
      "position": {
        "x": 0,
        "y": 0
      },
      "measured": {
        "width": 150,
        "height": 40
      }
    },
    {
      "id": "1b",
      "position": {
        "x": -155,
        "y": -53
      },
      "parentId": "1a",
      "data": {
        "level": 1,
        "label": "Annotate your flows any way you like.",
        "arrowStyle": {
          "right": 30,
          "bottom": 0,
          "transform": "rotate(-60deg)"
        },
        "arrow": "⤹"
      },
      "type": "AnnotationNode",
      "measured": {
        "width": 180,
        "height": 55
      },
      "selected": false,
      "dragging": false
    },
    {
      "id": "2a",
      "data": {
        "label": "Node 2"
      },
      "position": {
        "x": -100,
        "y": 120
      },
      "measured": {
        "width": 150,
        "height": 40
      }
    },
    {
      "id": "3a",
      "data": {
        "label": "Node 3"
      },
      "position": {
        "x": 100,
        "y": 120
      },
      "measured": {
        "width": 150,
        "height": 40
      }
    },
    {
      "id": "3b",
      "position": {
        "x": 117.5,
        "y": -99
      },
      "parentId": "3a",
      "data": {
        "level": 2,
        "label": "Connect annotations to nodes to adjust interactively.",
        "arrowStyle": {
          "left": 20,
          "bottom": -25,
          "transform": "rotate(-10deg) "
        },
        "arrow": "⤹"
      },
      "type": "AnnotationNode",
      "measured": {
        "width": 180,
        "height": 74
      },
      "selected": true,
      "dragging": false
    }
  ],
  "edges": [
    {
      "id": "e1-2",
      "source": "1a",
      "target": "2a"
    },
    {
      "id": "e1-3",
      "source": "1a",
      "target": "3a"
    }
  ]
}

export const AnnotationNode: Story = {
  args: {
    initialNodes: data.nodes,
    initialEdges: data.edges,
  },
};
