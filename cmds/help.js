
export const meta = { desc: "List available commands" };
export default async (args, repl) => {
  repl.echo("");
  repl.echo("Available:");
  for (const [name, obj] of repl.registry) {
    repl.echo(`  • ${name.padEnd(10)} ${obj.desc || ""}`);
  }
};
