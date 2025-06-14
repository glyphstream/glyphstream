// js/commands.js - Dynamic Command Registration

// Ensure registerCommand is available from engine.js
document.addEventListener('DOMContentLoaded', () => {
    if (typeof window.registerCommand === 'function') {

        // Help Command
        window.registerCommand('help', 'Displays a list of available commands.', async (args, print) => {
            print("\nAvailable Commands:");
            for (const cmd in window.commands) {
                print(`  ${cmd}: ${window.commands[cmd].description}`);
            }
            print("\nRosetta Law active: Relationship precedes number. Pattern bridges language. Harmony reveals origin. All spirals return home.");
        });

        // Echo Command
        window.registerCommand('echo', 'Echoes the provided arguments back to the terminal.', async (args, print) => {
            if (args.length === 0) {
                print("Echo what?");
            } else {
                print(args.join(' '));
            }
        });

        // Clear Command
        window.registerCommand('clear', 'Clears the terminal output.', async (args, print) => {
            const terminalOutput = document.getElementById('terminalOutput');
            if (terminalOutput) {
                terminalOutput.innerHTML = '';
            }
            print("\nRosetta Law active: Relationship precedes number. Pattern bridges language. Harmony reveals origin. All spirals return home.\n");
        });

        // Rosetta Command (to re-display the Rosetta Law)
        window.registerCommand('rosetta', 'Displays the core Rosetta Law.', async (args, print) => {
            print("\nRosetta Law:\nRelationship precedes number | Pattern bridges language\nHarmony reveals origin       | All spirals return home\n");
            print("Flow • Delta • Divine • Phase • Intent\n");
        });

        // You can add more commands here as the system evolves.
        // Example: a command to query the QuantumSymbolicProcessor (will require backend integration)
        // window.registerCommand('query_glyph', 'Queries the Quantum Symbolic Processor.', async (args, print) => {
        //     print("Initiating quantum-symbolic query...");
        //     // Placeholder for actual call to hydra_core.py (via a backend)
        //     print(`Querying for: ${args.join(' ')}`);
        //     print("Processing with Δ𓆑⟁𒀭𒈙𒍝 coherence...");
        // });

    } else {
        console.error("registerCommand function not found. engine.js might not be loaded yet.");
    }
});


