(this["webpackJsonppathfinding-visualizer"]=this["webpackJsonppathfinding-visualizer"]||[]).push([[0],{40:function(e,t,n){e.exports=n.p+"static/media/weight.06a87e94.png"},47:function(e,t,n){e.exports=n(59)},53:function(e,t,n){},57:function(e,t,n){},58:function(e,t,n){},59:function(e,t,n){"use strict";n.r(t);var r=n(0),a=n.n(r),o=n(22),i=n.n(o),l=(n(52),n(53),n(9)),c=n(40),s=n.n(c),u=function(e){var t=e.row,n=e.col,o=e.grid,i=e.setGrid,c=e.mousePressed,u=e.setMousePressed,h=e.clickType,f=Object(r.useState)(o[t][n].type),d=Object(l.a)(f,2),v=d[0],m=d[1];Object(r.useEffect)((function(){m(o[t][n].type)}),[o,t,n]);var p=function(){if("START"!==v&&"TARGET"!==v){var e="WALL"===v?"NODE":"WALL";o[t][n].type=e,o[t][n].isWall=!o[t][n].isWall,o[t][n].weight="WEIGHT"===e?2:1,m(e)}},g=function(){if("START"!==v&&"TARGET"!==v){var e="WEIGHT"===v?"NODE":"WEIGHT";o[t][n].type=e,o[t][n].weight="WEIGHT"===e?8:1,m(e)}};return a.a.createElement("div",{id:"".concat(t,"-").concat(n),className:v,onMouseEnter:function(){c&&("Wall"===h?p():g())},onMouseDown:function(){console.log("Type: ".concat(v," Row: ").concat(t," Col: ").concat(n)),"Wall"===h?p():g(),u(!0)},onMouseUp:function(){var e=o.slice();i(e),u(!1)}},"WEIGHT"===v?a.a.createElement("img",{className:"img",src:s.a,alt:"weight"}):"")},h=function(e){var t=e.col,n=e.grid,r=e.setGrid,o=e.mousePressed,i=e.setMousePressed,l=e.clickType;return a.a.createElement("div",null,t.map((function(e,t){return a.a.createElement(u,{key:t,row:e.row,col:e.col,grid:n,setGrid:r,mousePressed:o,setMousePressed:i,clickType:l})})))},f=function(e){var t=e.grid,n=e.setGrid,r=e.mousePressed,o=e.setMousePressed,i=e.clickType;return t.map((function(e,l){return a.a.createElement(h,{key:l,col:e,grid:t,setGrid:n,mousePressed:r,setMousePressed:o,clickType:i})}))},d=n(38),v=n(12),m=n(25),p=function(e){var t=e.isAnimating,n=e.algo,r=e.setAlgo,o=e.showAlgoInfo,i=e.setShowAlgoInfo,l=e.clickType,c=e.setClickType,s=e.showTypeInfo,u=e.setShowTypeInfo;return a.a.createElement(a.a.Fragment,null,a.a.createElement(d.a,{variant:"info",title:t?"In Progress...":n,disabled:t,onClick:function(){return i(!0)}},a.a.createElement(v.a.Header,null,"Unweighted Algorithms"),a.a.createElement(v.a.Item,{eventKey:"1",onClick:function(){return r("Depth First Search")}},"Depth First Search"),a.a.createElement(v.a.Item,{eventKey:"2",onClick:function(){return r("Breadth First Search")}},"Breadth First Search"),a.a.createElement(v.a.Divider,null),a.a.createElement(v.a.Header,null,"Weighted Algorithms"),a.a.createElement(v.a.Item,{eventKey:"3",onClick:function(){return r("Dijkstra's Algorithm")}},"Dijkstra's Algorithm"),a.a.createElement(v.a.Item,{eventKey:"3",onClick:function(){return r("A* Search")}},"A* Search")),a.a.createElement(m.a,{size:"lg",show:o,onHide:function(){return i(!1)}},a.a.createElement(m.a.Header,{closeButton:!0},a.a.createElement(m.a.Title,null,"Algorithms")),a.a.createElement(m.a.Body,null,"Select an pathfinding algorithm from the dropdown. ",a.a.createElement("br",null),a.a.createElement("br",null),"Note that unweighted algorithms (Depth First Search, Breadth First Search) will not take into account any weights placed on the field.",a.a.createElement("br",null),a.a.createElement("br",null),"Weighted algorithms have a cost of 1 to travel to any adjacent node and a cost 8 to travel to a weighted one. These will calculate the shortest path to get to the target, minimizing the total cost to get there.")),a.a.createElement(d.a,{variant:"info",title:l,disabled:t,onClick:function(){return u(!0)}},a.a.createElement(v.a.Item,{eventKey:"1",onClick:function(){return c("Wall")}},"Wall"),a.a.createElement(v.a.Item,{eventKey:"2",onClick:function(){return c("Weight")}},"Weight")),a.a.createElement(m.a,{size:"lg",show:s,onHide:function(){return u(!1)}},a.a.createElement(m.a.Header,{closeButton:!0},a.a.createElement(m.a.Title,null,"Wall/Weight Interation")),a.a.createElement(m.a.Body,null,"Click and hold on any node to create/remove walls or weights. ",a.a.createElement("br",null),"Walls cannot be traversed by the path while weights can be travsered. ",a.a.createElement("br",null),a.a.createElement("br",null),'Weights "cost" more to travel to where the default cost to travel to an adjacent node is 1. To be specific, it costs 8 to travel to a weighted node. Weights will only work with weighted algorithms.')))};var g=function(e){var t=[],n=!0,r=!1,a=void 0;try{for(var o,i=e[Symbol.iterator]();!(n=(o=i.next()).done);n=!0){var l=o.value,c=!0,s=!1,u=void 0;try{for(var h,f=l[Symbol.iterator]();!(c=(h=f.next()).done);c=!0){var d=h.value;t.push(d)}}catch(v){s=!0,u=v}finally{try{c||null==f.return||f.return()}finally{if(s)throw u}}}}catch(v){r=!0,a=v}finally{try{n||null==i.return||i.return()}finally{if(r)throw a}}return t},y=function(e){e.sort((function(e,t){return e.distance-t.distance}))},E=function(e,t){var n=w(e,t),r=!0,a=!1,o=void 0;try{for(var i,l=n[Symbol.iterator]();!(r=(i=l.next()).done);r=!0){var c=i.value,s=e.distance+c.weight;s<c.distance&&(c.distance=s,c.previousNode=e)}}catch(u){a=!0,o=u}finally{try{r||null==l.return||l.return()}finally{if(a)throw o}}},w=function(e,t){var n=[],r=e.col,a=e.row;return a>0&&n.push(t[a-1][r]),a<t.length-1&&n.push(t[a+1][r]),r>0&&n.push(t[a][r-1]),r<t[0].length-1&&n.push(t[a][r+1]),n.filter((function(e){return!e.isVisited}))};var b=function(e){var t=[],n=!0,r=!1,a=void 0;try{for(var o,i=e[Symbol.iterator]();!(n=(o=i.next()).done);n=!0){var l=o.value,c=!0,s=!1,u=void 0;try{for(var h,f=l[Symbol.iterator]();!(c=(h=f.next()).done);c=!0){var d=h.value;t.push(d)}}catch(v){s=!0,u=v}finally{try{c||null==f.return||f.return()}finally{if(s)throw u}}}}catch(v){r=!0,a=v}finally{try{n||null==i.return||i.return()}finally{if(r)throw a}}return t},T=function(e,t){return Math.abs(e.row-t.row)+Math.abs(e.col-t.col)},S=function(e){e.sort((function(e,t){return e.fScore-t.fScore}))},O=function(e,t,n){var r=k(e,n),a=!0,o=!1,i=void 0;try{for(var l,c=r[Symbol.iterator]();!(a=(l=c.next()).done);a=!0){var s=l.value,u=e.distance+s.weight,h=u+T(s,t);h<s.fScore&&(s.distance=u,s.fScore=h,s.previousNode=e)}}catch(f){o=!0,i=f}finally{try{a||null==c.return||c.return()}finally{if(o)throw i}}},k=function(e,t){var n=[],r=e.col,a=e.row;return a>0&&n.push(t[a-1][r]),a<t.length-1&&n.push(t[a+1][r]),r>0&&n.push(t[a][r-1]),r<t[0].length-1&&n.push(t[a][r+1]),n.filter((function(e){return!e.isVisited}))},A=n(26),N=(n(57),n(58),5),j=13,W=34,I=13,D=function(){for(var e=[],t=0;t<26;t++){for(var n=[],r=0;r<40;r++)n.push(G(t,r));e.push(n)}return e},G=function(e,t){return{row:e,col:t,type:C(e,t),isVisited:!1,isWall:!1,previousNode:null,distance:99999,fScore:99999,weight:1}},C=function(e,t){return j===e&&N===t?"START":I===e&&W===t?"TARGET":"NODE"},P=function(e,t){return e===j&&t===N||e===I&&t===W};function B(e){for(var t=[],n=e;null!==n;)t.unshift(n),n=n.previousNode;return t}var R=function(){var e=Object(r.useState)(D()),t=Object(l.a)(e,2),n=t[0],o=t[1],i=Object(r.useState)(!1),c=Object(l.a)(i,2),s=c[0],u=c[1],h=Object(r.useState)(!1),d=Object(l.a)(h,2),v=d[0],m=d[1],w=Object(r.useState)("Select an algorithm"),k=Object(l.a)(w,2),G=k[0],C=k[1],R=Object(r.useState)("Wall"),M=Object(l.a)(R,2),F=M[0],H=M[1],V=Object(r.useState)(!1),x=Object(l.a)(V,2),K=x[0],z=x[1],L=Object(r.useState)(!1),J=Object(l.a)(L,2),U=J[0],q=J[1],Q=n,X=function(e,t,n){for(var r=function(r){if(r===e.length-1&&n)return setTimeout((function(){n?Y(t):Z()}),10*r),{v:void 0};setTimeout((function(){var t=e[r];document.getElementById("".concat(t.row,"-").concat(t.col)).className="NODE-visited",r===e.length-1&&Z()}),10*r)},a=1;a<e.length;a++){var o=r(a);if("object"===typeof o)return o.v}},Y=function(e){for(var t=function(t){setTimeout((function(){var n=e[t];P(n.row,n.col)||(document.getElementById("".concat(n.row,"-").concat(n.col)).className="NODE-shortest-path"),t===e.length-2&&Z()}),50*t)},n=1;n<e.length-1;n++)t(n)},Z=function(){m(!1)},$=function(){var e=JSON.parse(JSON.stringify(n));return[e,e[j][N],e[I][W]]},_=function(){var e=$(),t=Object(l.a)(e,3),n=t[0],r=t[1],a=t[2],o=function(e,t){var n=[];t.distance=0;for(var r=g(e);0!==r.length;){y(r);var a=r.shift();if(!a.isWall){if(99999===a.distance)return[n,!1];if(a.isVisited=!0,n.push(a),"TARGET"===a.type)return t.previousNode=null,[n,!0];E(a,e)}}}(n,r),i=Object(l.a)(o,2),c=i[0],s=i[1],u=B(a);X(c,u,s)},ee=function(){var e=$(),t=Object(l.a)(e,3),n=t[0],r=t[1],a=t[2],o=function(e,t,n){var r=[];t.distance=0,t.heuristic=T(t,n),t.fScore=t.distance+t.heuristic;for(var a=b(e);0!==a.length;){S(a);var o=a.shift();if(!o.isWall){if(99999===o.distance)return[r,!1];if(o.isVisited=!0,r.push(o),"TARGET"===o.type)return t.previousNode=null,[r,!0];O(o,n,e)}}}(n,r,a),i=Object(l.a)(o,2),c=i[0],s=i[1];console.log(c);var u=B(a);X(c,u,s)},te=function(e){switch(m(!0),ne(),e){case"Depth First Search":!function(){var e=$(),t=Object(l.a)(e,3),n=t[0],r=t[1],a=t[2],o=function(e,t,n,r){var a=[],o=[];for(a.push(t);0!==a.length;){var i=a.pop();if(!i.isWall&&!i.isVisited){if(o.push(i),"TARGET"===i.type)return t.previousNode=null,[o,!0];i.isVisited=!0;var l=i.row,c=i.col,s=[];c-1<0||s.push(e[l][c-1]),l+1>e.length-1||s.push(e[l+1][c]),c+1>e[0].length-1||s.push(e[l][c+1]),l-1<0||s.push(e[l-1][c]);for(var u=0,h=s;u<h.length;u++){var f=h[u];a.push(f),null==f.previousNode&&(f.previousNode=i)}}}return[o,!1]}(n,r),i=Object(l.a)(o,2),c=i[0],s=i[1],u=B(a);X(c,u,s)}();break;case"Breadth First Search":!function(){var e=$(),t=Object(l.a)(e,3),n=t[0],r=t[1],a=t[2],o=function(e,t,n,r){var a=[],o=[];for(a.push(t);0!==a.length;){var i=a.shift();if(!i.isWall&&!i.isVisited){if(o.push(i),"TARGET"===i.type)return t.previousNode=null,[o,!0];i.isVisited=!0;var l=i.row,c=i.col,s=[];c-1<0||s.push(e[l][c-1]),l+1>e.length-1||s.push(e[l+1][c]),c+1>e[0].length-1||s.push(e[l][c+1]),l-1<0||s.push(e[l-1][c]);for(var u=0,h=s;u<h.length;u++){var f=h[u];a.push(f),null==f.previousNode&&(f.previousNode=i)}}}return[o,!1]}(n,r),i=Object(l.a)(o,2),c=i[0],s=i[1],u=B(a);X(c,u,s)}();break;case"Dijkstra's Algorithm":_();break;case"A* Search":ee();break;default:window.alert("Please select an algorithm"),m(!1)}},ne=function(){for(var e=0;e<26;e++)for(var t=0;t<40;t++){var n=document.getElementById("".concat(e,"-").concat(t)).className;"NODE-visited"!==n&&"NODE-shortest-path"!==n||(document.getElementById("".concat(e,"-").concat(t)).className="NODE")}};return a.a.createElement(a.a.Fragment,null,a.a.createElement(p,{isAnimating:v,algo:G,setAlgo:C,showAlgoInfo:K,setShowAlgoInfo:z,clickType:F,setClickType:H,showTypeInfo:U,setShowTypeInfo:q}),a.a.createElement(A.a,{variant:"primary",onClick:function(){return te(G)},disabled:v},"Animate Algorithm"),a.a.createElement(A.a,{variant:"secondary",onClick:function(){o(D());for(var e=0;e<26;e++)for(var t=0;t<40;t++)P(e,t)||(document.getElementById("".concat(e,"-").concat(t)).className="NODE")},disabled:v},"Full Reset"),a.a.createElement(A.a,{variant:"secondary",onClick:ne,disabled:v},"Reset Path"),a.a.createElement("div",{className:"App",onMouseLeave:function(){var e=Q.slice();o(e),u(!1)}},a.a.createElement(f,{grid:Q,setGrid:o,mousePressed:s,setMousePressed:u,clickType:F})))};i.a.render(a.a.createElement(R,null),document.getElementById("root"))}},[[47,1,2]]]);
//# sourceMappingURL=main.158fb8a0.chunk.js.map