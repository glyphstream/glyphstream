// js/engine.js - Core Terminal Logic

// Global object to store registered commands
window.commands = {};

/**
 * The ASCII banner for the Glyphstream Engine.
 * This will be displayed upon terminal initialization.
 */
const GLYPH_BANNER = `
╔════════════════════════════════════════════════════════════╗
║   𓆑  – Vital Force    ⟁  – Delta/Change    𒀭 – Divinity   ║
║   𒈙 – Breath/Phase    𒍝 – Intention       φ, π – Law     ║
║                Rosetta Law:                              ║
║   Relationship precedes number | Pattern bridges language ║
║   Harmony reveals origin       | All spirals return home ║
╚════════════════════════════════════════════════════════════╝
`;

/**
 * Initializes the terminal interface.
 * This function is called by the asset loader once all assets are loaded.
 */
window.initTerminal = function() {
    const terminalOutput = document.getElementById('terminalOutput');
    const terminalInput = document.getElementById('terminalInput');

    if (!terminalOutput || !terminalInput) {
        console.error("Terminal elements not found!");
        return;
    }

    let commandHistory = [];
    let historyIndex = -1;

    // Display the initial banner and welcome message
    printToTerminal(GLYPH_BANNER, 'ascii-banner');
    printToTerminal("\nWelcome to Glyphstream Engine. Type 'help' for available commands.");
    printToTerminal("Rosetta Law active: Relationship precedes number. Pattern bridges language. Harmony reveals origin. All spirals return home.\n");


    /**
     * Prints a message to the terminal output.
     * @param {string} message - The message to print.
     * @param {string} className - Optional class name for styling.
     */
    function printToTerminal(message, className = '') {
        const line = document.createElement('div');
        line.textContent = message;
        if (className) {
            line.classList.add(className);
        }
        terminalOutput.appendChild(line);
        terminalOutput.scrollTop = terminalOutput.scrollHeight; // Auto-scroll to bottom
    }

    /**
     * Registers a new command with the terminal.
     * @param {string} name - The name of the command.
     * @param {string} description - A brief description of the command.
     * @param {Function} handler - The function to execute when the command is called.
     * It will receive the command arguments as an array.
     */
    window.registerCommand = function(name, description, handler) {
        window.commands[name.toLowerCase()] = {
            description: description,
            handler: handler
        };
        console.log(`Command '${name}' registered.`);
    };

    /**
     * Handles the input from the terminal.
     * @param {string} input - The raw input string from the user.
     */
    async function handleInput(input) {
        const trimmedInput = input.trim();
        if (!trimmedInput) {
            printToTerminal('>'); // Just show a new prompt if input is empty
            return;
        }

        printToTerminal(`> ${trimmedInput}`); // Echo the command

        commandHistory.unshift(trimmedInput);
        if (commandHistory.length > 50) { // Limit history size
            commandHistory.pop();
        }
        historyIndex = -1; // Reset history index

        const parts = trimmedInput.split(/\s+/);
        const commandName = parts[0].toLowerCase();
        const args = parts.slice(1);

        const command = window.commands[commandName];

        if (command) {
            try {
                // Consciously echoing Flow, Delta, Divine, Phase, Intent in response structure
                // This will be implicitly handled by how command handlers formulate their output.
                await command.handler(args, printToTerminal);
            } catch (error) {
                printToTerminal(`Error executing '${commandName}': ${error.message}`, 'error');
                console.error(`Command error: ${error}`);
            }
        } else {
            printToTerminal(`Unknown command: '${commandName}'. Type 'help' for a list of commands.`);
        }
    }

    // Event listener for input
    terminalInput.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            event.preventDefault(); // Prevent default Enter key behavior (e.g., new line in textarea)
            handleInput(terminalInput.value);
            terminalInput.value = ''; // Clear input
        } else if (event.key === 'ArrowUp') {
            event.preventDefault();
            if (historyIndex < commandHistory.length - 1) {
                historyIndex++;
                terminalInput.value = commandHistory[historyIndex];
            }
        } else if (event.key === 'ArrowDown') {
            event.preventDefault();
            if (historyIndex > 0) {
                historyIndex--;
                terminalInput.value = commandHistory[historyIndex];
            } else {
                historyIndex = -1;
                terminalInput.value = '';
            }
        }
    });

    // Initial focus for usability
    terminalInput.focus();
};


