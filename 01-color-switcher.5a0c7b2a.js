const t=document.querySelector("button[data-start]"),e=document.querySelector("button[data-stop]"),r=document.querySelector("body");let o=null;t.addEventListener("click",(()=>{o=setInterval((()=>{r.style.backgroundColor=`#${Math.floor(16777215*Math.random()).toString(16)}`}),1e3),t.setAttribute("disabled","")})),e.addEventListener("click",(()=>{clearInterval(o),t.removeAttribute("disabled")}));
//# sourceMappingURL=01-color-switcher.5a0c7b2a.js.map
