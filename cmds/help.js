export const meta={desc:"list cmds"};
export default async(_,repl)=>{
  repl.echo("");repl.echo("Available commands:");
  for(const[n,{d}]of repl.registry)repl.echo(`  • ${n.padEnd(8)} ${d?.desc||""}`);
};
