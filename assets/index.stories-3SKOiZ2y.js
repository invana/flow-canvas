import{F as i}from"./app-D2qYsXol.js";import{D as r}from"./dagre--B3RHZUB.js";import"./index-Dc7tpNWJ.js";import"./index-eCxJ45ll.js";import"./index-CNjFNOVn.js";const u={title:"Layouts/Dagre Layout",component:i,parameters:{layout:"fullscreen"}},n=[{id:"1",type:"card",data:{label:"Node 1"},position:{x:-100,y:-100}},{id:"2",type:"card",data:{label:"Node 2"},position:{x:0,y:0}},{id:"3",type:"card",data:{label:"Node 3"},position:{x:100,y:100}}],s=[{id:"e1-2",source:"1",target:"2"},{id:"e2-3",source:"2",target:"3"}],a={args:{initialNodes:n,initialEdges:s,layoutEngine:new r}};var e,t,o;a.parameters={...a.parameters,docs:{...(e=a.parameters)==null?void 0:e.docs,source:{originalSource:`{
  args: {
    initialNodes: initialNodes,
    initialEdges: initialEdges,
    layoutEngine: new DagreLayoutEngine()
  }
}`,...(o=(t=a.parameters)==null?void 0:t.docs)==null?void 0:o.source}}};const m=["dagreLayout"];export{m as __namedExportsOrder,a as dagreLayout,u as default};
