const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const Notes = require('../models/Notes')
const { body, validationResult } = require('express-validator');

//Fetch all notes using: GET "api/notes/fetchallnotes".
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Notes.find({ user: req.user.id });
        res.json(notes)
    } catch (error) {
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
    }
});

//Adding new note using: POST "api/notes/addnote".
router.post('/addnote', fetchuser, [
    body('title', 'Enter a valid title').isLength({ min: 3 }),
    body('description', 'description must have a minimum of 5 characters').isLength({ min: 5 })
], async (req, res) => {
    try {
        const { title, description, tag } = req.body;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const note = new Notes({
            title, description, tag, user: req.user.id
        })

        const savedNote = await note.save()
        res.json(savedNote)
    } catch (error) {
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
    }
});

//Update an existing note using: PUT "api/notes/updatenote".
router.put('/updatenote/:id', fetchuser, async (req, res) => {
    const { title, description, tag } = req.body;
    try {
        const newNote = {};
        if (title) { newNote.title = title };
        if (description) { newNote.description = description };
        if (tag) { newNote.tag = tag };

        let note = await Notes.findById(req.params.id);
        if (!note) { res.status(404).send("NOT FOUND") }

        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("NOT ALLOWED")
        }

        note = await Notes.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
        res.json(note)

    } catch (error) {
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
    }
});

//Delete an existing note using: DELETE "api/notes/deletenote".
router.delete('/deletenote/:id', fetchuser, async (req, res) => {
    try {
        let note = await Notes.findById(req.params.id);
        if (!note) { res.status(404).send("NOT FOUND") }

        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("NOT ALLOWED")
        }

        note = await Notes.findByIdAndDelete(req.params.id)
        res.json({ "Success": "note has been delete", note: note });
    } catch (error) {
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
    }
});
module.exports = router