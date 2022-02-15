const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const Notes = require('../models/Note');
const { body, validationResult } = require('express-validator');

//Route 1: Fetch all notes using POST method /notes/fetchallnotes
router.post('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Notes.find({ user: req.user.id });
        res.json(notes);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Internal Server Error')
    }
})

//Route 2: Adding a note using POST method /notes/fetchallnotes
router.post('/addnote', fetchuser, [
    body('title', 'title cannot be empty').not().isEmpty(),
    body('description', 'Description should at least 5 character').isLength({ min: 5 })
], async (req, res) => {
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        //create a note
        const note = await new Notes({
            user: req.user.id,
            title: req.body.title,
            description: req.body.description
        })
        //saved the note in mongoDB
        const savedNote = await note.save();
        res.json(savedNote);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Internal Server Error');
    }
})

//Route 3: Update a note using PUT method /notes/updatenote
router.put('/fetchallnotes/:id', fetchuser, [
    body('title', 'title cannot be empty').not().isEmpty(),
    body('description', 'Description should at least 5 character').isLength({ min: 5 })
], async (req, res) => {
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { title, description } = req.body;
        const newNote = {};

        if (title) { newNote.title = title };
        if (description) { newNote.description = description };
        let note = await Notes.findById(req.params.id);

        if (!note) { return res.status(404).send('File Not Found') }
        if (req.user.id !== note.user.toString()) { return res.status(401).send('unauthorized access') }

        note = await Notes.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
        res.json(note);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Internal Server Error')
    }
})

//Route 4: Delete a note using DELETE method /notes/fetchallnotes
router.delete('/fetchallnotes/:id', fetchuser, async (req, res) => {
    try {
        let note = await Notes.findById(req.params.id);

        if (!note) { return res.status(404).send('File not Found') }
        if (req.user.id !== note.user.toString()) { return res.status(401).send('unauthorized access') }

        note = await Notes.findByIdAndDelete(req.params.id);
        res.send({ 'Success': 'File Deleted Successfully', note })
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Internal Server Error')
    }
})

//Route 5: Note Completion using POST method  /notes/fetchallnotes
router.post('/fetchallnotes/:id', fetchuser, async (req, res) => {
    try {
        let note = await Notes.findById(req.params.id);
        if (!note) { return res.status(400).send('File not Found.') }
        if (req.user.id !== note.user.toString()) { return res.status(401).send('unauthorized access') }

        if (note.taskComplete === true) {
            note.taskComplete = false
        } else {
            note.taskComplete = true
        }

        note = await note.save();
        res.json(note);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Internal Server Error')
    }
})

module.exports = router;