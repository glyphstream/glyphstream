
export class REPL {
  constructor(root) {
    this.root = root;
    this.history = [];
    this.registry = new Map();
    this.printBanner();
    this.newPrompt();
  }
  register(name, handler, {desc = ""} = {}) {
    this.registry.set(name, {handler, desc});
  }
  printBanner() {
    this.echo("⧁ Glyphstream Core v3 · BLOOM Protocol 𓂀\n");
    this.echo("type `help` to list commands\n");
  }
  echo(text = "") {
    const line = document.createElement("div");
    line.textContent = text;
    this.root.appendChild(line);
  }
  async run(cmdline) {
    if (!cmdline.trim()) return;
    const [cmd, ...args] = cmdline.trim().split(/\s+/);
    const entry = this.registry.get(cmd);
    if (!entry) return this.echo(`Unknown command: ${cmd}`);
    try { await entry.handler(args, this); }
    catch (e) { this.echo(`Error: ${e.message}`); }
  }
  newPrompt() {
    const wrap = document.createElement("div");
    const label = document.createElement("span");
    label.className = "prompt";
    label.textContent = "❯ ";
    wrap.appendChild(label);

    const input = document.createElement("input");
    input.className = "cmdline";
    input.autocomplete = "off";
    input.spellcheck = false;
    wrap.appendChild(input);
    this.root.appendChild(wrap);
    input.focus();

    input.addEventListener("keydown", e => {
      if (e.key === "Enter") {
        const val = input.value;
        input.disabled = true;
        this.run(val).finally(() => this.newPrompt());
      }
    });
  }
}
window.REPL = REPL;
const terminal = new REPL(document.getElementById("terminal"));
window.repl = terminal;
