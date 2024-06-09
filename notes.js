// Import 'fs' module - FILE SYSTEM
const fs = require('fs');
// Import 'chalk' Module
const chalk = require('chalk');

const getNotes =() => {
    return 'Your notes...'
};

// Function to add a new note 
const addNote = (title, body) => {
    // Loads existing notes
    const notes = loadNotes();
    // Checks for duplicate notes
    const duplicateNote = notes.find((note) => note.title === title);

    // Can be called to debug 
    debugger

    // If note is not a duplicate 
    if (!duplicateNote) {
        // add note 
        notes.push({
            title: title,
            body: body
        })
        // and save note
        saveNotes(notes)
        // prints success message to the console
        console.log(chalk.green.inverse('New note added!'));
    // If note title is taken
    } else {
        // Prints error message to the console letting user know that the title is already taken
        console.log(chalk.red.inverse('Note title taken!'));
    } 
};

// Function to remove a note
const removeNote = function (title) {
    // Load existing notes and add assign them variable called note
    const notes = loadNotes()
    // Filter function to find the note that needs to be removed
    const notesToKeep = notes.filter((note)=> note.title !== title);

    // if the length of notes in system decreases 
    if (notes.length > notesToKeep.length) {
        // prints success message to let user know that note was removed
        console.log(chalk.green.inverse('Note removed!'))
        // Saves the updated notes
        saveNotes(notesToKeep)
    } else {
        // If no note is deleted, prints message on the console letting user know
        console.log(chalk.red.inverse('No note found!'))
    }    
};

// Function to list all note titles
const listNotes = () => {
    // Load existing notes
    const notes = loadNotes();

    // logs a header of your notes to the console
    console.log(chalk.inverse('Your Notes'));

    //forEach method that loops through every note
    notes.forEach((note) => {
        // and prints its title in the console
        console.log(note.title);
    })
};

// Function to read a note by title
const readNote = (title) => {
    // Load existing notes
    const notes = loadNotes();

    // Find method to find the note by title
    const note = notes.find((note) => note.title === title);

    // If the note is found, print its title and body
    if (note) {
        console.log(chalk.inverse(note.title)); // Print note title
        console.log(note.body) // print note body
    // If title is not found
    } else {
        console.log(chalk.red.inverse('Note not found!'));// Error Message to let user know
    }
}

// Function to save notes
const saveNotes = (notes) => {
    // Convers dataJSON data to a JSON string
    const dataJSON = JSON.stringify(notes)
    // Write the JSON string to 'notes.json'
    fs.writeFileSync('notes.json', dataJSON)
};

// Function to load notes from a file
const loadNotes = () => {
    // The try nlock contains code that might potentially throw an exception
    try {
        // Read the 'notes.json' file and save it to dataBuffer
        const dataBuffer = fs.readFileSync('notes.json')
        // convert dataBuffer to a string
        const dataJSON = dataBuffer.toString()
        // Parse the JSON string to a JS object
        return JSON.parse(dataJSON)
    } catch (e) {
        // Return an empty array if the file does not exist
        return []
    }
};

// All code that needs to be exported to the 'app.js' file
module.exports = {
    getNotes: getNotes,
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
};