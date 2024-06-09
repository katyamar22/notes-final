// Imports 'chalk' module- Styles console output
const chalk = require('chalk');
// Imports 'yargs' module - for parsing command line arguments
const yargs = require('yargs');
// Imports 'notes.js'
const notes = require('./notes.js');

// Customize yargs version
yargs.version('1.1.0');

// Create add command
yargs.command({
    // Command name
    command: 'add',
    // Command Description
    describe: 'Add a new note',
    // Define options for the command
    builder: {
        // options for title
        title: {
            // Title Description
            describe: 'Note title',
            // Makes defining a title a requirement
            demandOption: true,
            // requires value to be a string
            type: 'string'
        },
        body: {
            // Body Description
            describe: 'Note body',
            // Body is required
            demandOption: true,
            // Value must be a string
            type: 'string'
        }
    },
    // handler function for the add command
    handler(argv) {
        // Calls the addNote function from the notes module, takes tile and body as an argument
        notes.addNote(argv.title, argv.body)
    }
});

// Create remove command
yargs.command({
    // Command Name
    command: 'remove',
    // Command Description
    describe: 'Remove a note',
    // Command Options
    builder: {
        // Include title
        title: {
            // Title description
            describe: 'Note title',
            // A title is required
            demandOption: true,
            // Title value must be a string
            type: 'string'
        }
    },
    // Handler function for command
    handler(argv) {
        // Calles 'removeNote' function from notes module to run when this command is called
        notes.removeNote(argv.title)
    }
});

// Create list command
yargs.command({
    // Command Name
    command: 'list',
    // Command Description
    describe: 'List your notes',
    builder: {
        // Include Title
        title:{
            // Title description
            describe: 'Note title',
            // Makes title required
            demandOption: true,
            // title value must be a string
            type: 'string'
        }
    },
    // Handler function that runs when command is called
    handler() {
        //calls 'listNotes' function from notes module to run when command is called
        notes.listNotes();
    }
});

// Create read command
yargs.command({
    //Command Name
    command: 'read',
    //Command Description
    describe: 'Read a note',
    //Define the options for the command
    builder: {
        // Options for title
        title: {
            // Title Description
            describe: 'Note Title',
            // Makes title required
            demandOption: true,
            // title must be a string
            type: 'string'
        }
    },
    // Handler function that is called when command is ran
    handler(argv) {
        // Call the 'readNote' function from the notes module when read command is called
        notes.readNote(argv.title);
    }
});

// Ensures that command line arguments are parsed
yargs.parse();