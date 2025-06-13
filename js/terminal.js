export class REPL{
 constructor(root){this.root=root;this.registry=new Map();this.banner();this.prompt()}
 banner(){this.echo("⧁ Glyphstream Recovery • type `help`");}
 echo(t=""){const d=document.createElement("div");d.textContent=t;this.root.appendChild(d)}
 prompt(){const wrap=document.createElement("div");
  wrap.innerHTML=`<span class="prompt">❯ </span><input class="cmdline" spellcheck=false>`;
  this.root.appendChild(wrap);const i=wrap.querySelector("input");i.focus();
  i.onkeydown=e=>{if(e.key==="Enter"){i.disabled=true;this.run(i.value).finally(()=>this.prompt())}}
 }
 register(n,h,d={}){this.registry.set(n,{h,d})}
 async run(l){if(!l.trim())return;const[a,...b]=l.trim().split(/\s+/);const e=this.registry.get(a);
  if(!e)return this.echo(`unknown cmd: ${a}`);try{await e.h(b,this)}catch(err){this.echo(err+"")}}
}
window.repl=new REPL(document.getElementById("terminal"));
