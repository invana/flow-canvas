const P={width:80,fontSize:11,color:"white"},p=[{source:"bottom",target:"top"},{source:"right",target:"left"}],T=[["#1e9e99","#4cb3ac","#6ec9c0","#8ddfd4"],["#0f4c75","#1b5d8b","#276fa1","#3282b8"]],r=["default","step","smoothstep","straight"],u=[{x:0,y:-160},{x:160,y:-160},{x:160,y:0},{x:160,y:160},{x:0,y:160},{x:-160,y:160},{x:-160,y:0},{x:-160,y:-160}];let I=0;const l=()=>`edgetypes-${(I++).toString()}`;function N(){const i=[],a=[];for(let t=0;t<p.length;t++){const o=p[t];for(let e=0;e<r.length;e++){const y=r[e];for(let d=0;d<u.length;d++){const g=u[d],h={...P,background:T[t][e]},c={x:d*80*4,y:e*300+t*r.length*300},n=l(),W={label:`Source ${n}`},f={id:n,style:h,data:W,position:c,sourcePosition:o.source,targetPosition:o.target},s=l(),x={label:`Target ${s}`},G={x:c.x+g.x,y:c.y+g.y},b={id:s,style:h,data:x,position:G,sourcePosition:o.source,targetPosition:o.target};i.push(f),i.push(b),a.push({id:`${n}-${s}`,source:n,target:s,type:y})}}}return{initialNodes:i,initialEdges:a}}export{N as g};
