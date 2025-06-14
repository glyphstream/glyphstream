// Glyphstream Engine v1.0 - Modular Terminal Engine
const commands = {};
function registerCommand(name, fn, description) {
    commands[name] = { fn, description };
}

function showHelp() {
    console.log("Available commands:");
    for (let cmd in commands) {
        console.log(`  ${cmd}: ${commands[cmd].description}`);
    }
}

// Sample command
registerCommand('help', () => showHelp(), 'Display this help message');
registerCommand('echo', (args) => console.log(args.join(' ')), 'Echo input args');

// Terminal input simulation
window.onload = () => {
    console.log("Engine initialized. Type 'help' to get started.");
    // For actual terminal, integrate input listener here
};