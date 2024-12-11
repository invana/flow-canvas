import{F as o}from"./app-D2qYsXol.js";import{B as s}from"./index-Ba-YPmsC.js";import"./index-Dc7tpNWJ.js";import"./index-eCxJ45ll.js";import"./index-CNjFNOVn.js";const c={title:"Shapes/CardNode",component:o,parameters:{layout:"fullscreen"}},r=[{id:"2.1",type:"CardNode",data:{label:"Card with Html String based Form",icon:s,body:`
        <label>name</label>
        <input type='text'>      
        <button>submit</button>
      `},style:{width:"400px"},position:{x:-300,y:-300}},{id:"2.3",type:"CardNode",data:{label:"No Icon Node",body:`
      <img src='https://picsum.photos/200/300' style='    margin: 0 auto;
      width: 100%; height: auto' />
      `},position:{x:0,y:-100}},{id:"2.2",type:"CardNode",data:{label:"url based Icon",icon:"https://avatars.githubusercontent.com/u/4606947?v=4",properties:{title:"string",identifier:"string",is_active:!1,description:"string"}},position:{x:200,y:-200}}],t={args:{initialNodes:r}};var e,a,i;t.parameters={...t.parameters,docs:{...(e=t.parameters)==null?void 0:e.docs,source:{originalSource:`{
  args: {
    initialNodes: exampleData
    // initialEdges: initialEdges,
  }
}`,...(i=(a=t.parameters)==null?void 0:a.docs)==null?void 0:i.source}}};const u=["CardNode"];export{t as CardNode,u as __namedExportsOrder,c as default};
