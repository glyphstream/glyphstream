fetch("commands.json").then(r=>r.json()).then(async m=>{
  for(const[k,p]of Object.entries(m)){const mod=await import(p);repl.register(k,mod.default,mod.meta)}
});
