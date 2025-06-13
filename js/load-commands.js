
import { REPL } from "./terminal.js";
const registry = window.repl;
fetch("commands.json")
  .then(r => r.json())
  .then(async manifest => {
    for (const [name, path] of Object.entries(manifest)) {
      try {
        const mod = await import(path);
        if (typeof mod.default === "function") {
          registry.register(name, mod.default, mod.meta ?? {});
        }
      } catch (err) {
        console.error("Failed to load", name, err);
      }
    }
  });
