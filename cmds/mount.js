export const meta={desc:"toggle mount state"};
export default async(args,repl)=>{
  const part=args[0]||"/system";repl.echo(`🔄 mounted ${part} (simulated)`);
};
