import{P as t,M as p,F as c}from"./app-D2qYsXol.js";import{g}from"./data-DBPv8Ebn.js";import"./index-Dc7tpNWJ.js";import"./index-eCxJ45ll.js";import"./index-CNjFNOVn.js";const u=[{id:"1",type:"input",data:{label:"Input Node"},position:{x:250,y:0}},{id:"2",data:{label:"Default Node"},position:{x:100,y:100}},{id:"3",type:"output",data:{label:"Output Node"},position:{x:400,y:100}},{id:"4",type:"custom",position:{x:100,y:200},data:{label:"Default Node 4"}},{id:"5",type:"output",data:{label:"custom style"},className:"circle",style:{background:"#2B6CB0",color:"white"},position:{x:400,y:200},sourcePosition:t.Right,targetPosition:t.Left}],m=[{id:"e1-2",source:"1",target:"2",label:"this is an edge label"},{id:"e1-3",source:"1",target:"3",animated:!0},{id:"e4-5",source:"4",target:"5",type:"smoothstep",sourceHandle:"handle-0",data:{selectIndex:0},markerEnd:{type:p.ArrowClosed}}],s=g(),x={title:"Canvas/GenericFlowCanvas",component:c,parameters:{layout:"fullscreen"},tags:["autodocs"],argTypes:{}},e={args:{initialNodes:u,initialEdges:m}},a={args:{initialNodes:s.initialNodes,initialEdges:s.initialEdges}};var o,i,r;e.parameters={...e.parameters,docs:{...(o=e.parameters)==null?void 0:o.docs,source:{originalSource:`{
  args: {
    initialNodes: nodes,
    initialEdges: edges
  }
}`,...(r=(i=e.parameters)==null?void 0:i.docs)==null?void 0:r.source}}};var n,d,l;a.parameters={...a.parameters,docs:{...(n=a.parameters)==null?void 0:n.docs,source:{originalSource:`{
  args: {
    initialNodes: largeDataSet.initialNodes,
    initialEdges: largeDataSet.initialEdges
  }
}`,...(l=(d=a.parameters)==null?void 0:d.docs)==null?void 0:l.source}}};const f=["SimpleBaseFlowCanvas","LargeDataCanvas"];export{a as LargeDataCanvas,e as SimpleBaseFlowCanvas,f as __namedExportsOrder,x as default};
