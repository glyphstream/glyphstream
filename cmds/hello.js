
export const meta = { desc: "Echo back your text" };
export default async (args, repl) => {
  const msg = args.join(" ") || "Hello, Operator.";
  repl.echo(msg);
};
