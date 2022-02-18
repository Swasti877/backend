import NoteContext from "./NoteContext.js";
import { useEffect, useState } from "react";

const NoteState = (props) => {
    const initialNote = [];
    const [notes, setNotes] = useState(initialNote);
    const PORT = process.env.PORT || 5000;
    const DOMAIN = process.env.DOMAIN || "http://localhost:"
    const host = `${DOMAIN}${PORT}/api`

    //fetch All Notes.
    const fetchAllNotes = async () => {
        //API CALL
        const response = await fetch(`${host}/notes/fetchallnotes`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            }
        })
        const json = await response.json();
        setNotes(json);
    }

    //addNote 
    const addNote = async (title, description) => {
        const response = await fetch(`${host}/notes/addnote`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({ title, description })
        })
        const json = await response.json()
        setNotes(notes.concat(json));
    }

    //update Note
    const updateNote = async (_id, title, description) => {
        const response = await fetch(`${host}/notes/fetchallnotes/${_id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({ title, description })
        })
        const json = await response.json();

        //logic to display on client side.
        let newNotes = JSON.parse(JSON.stringify(notes));
        for (let i = 0; i < newNotes.length; i++) {
            if (newNotes[i]._id === _id) {
                newNotes.title = title;
                newNotes.description = description;
                break;
            }
        }
        setNotes(newNotes);
    }

    //delete Note
    const deleteNote = async (_id) => {
        const response = await fetch(`${host}/notes/fetchallnotes/${_id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            }
        })
        const json = await response.json();

        const newNotes = notes.filter((note) => {
            return note._id !== _id;
        })
        setNotes(newNotes);
    }
    //update completion of note
    const completeNote = async (_id, taskComplete) => {
        const response = await fetch(`${host}/notes/fetchallnotes/${_id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({ taskComplete })
        })
        const json = await response.json();

        //logic to display on client side.
        let newNotes = JSON.parse(JSON.stringify(notes));
        for (let i = 0; i < newNotes.length; i++) {
            if (newNotes[i]._id === _id) {
                if (newNotes[i].completeNote) {
                    newNotes[i].completeNote = false;
                    break;
                } else {
                    newNotes[i].completeNote = true;
                    break;
                }
            }
        }
        setNotes(newNotes)
    }

    return (
        <NoteContext.Provider value={{ notes, fetchAllNotes, addNote, updateNote, deleteNote, completeNote }}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;