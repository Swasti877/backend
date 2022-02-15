import React, { useContext, useRef, useState } from 'react';
import NoteContext from '../context/notes/NoteContext';

export default function AddNote() {
    const context = useContext(NoteContext);
    const { addNote } = context;
    const [note, setNote] = useState({ title: '', description: '' })

    const handleAddNote = (e) => {
        e.preventDefault();
        addNote(note.title, note.description);
        setNote({ title: '', description: '' });
    }
    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }

    return (
        <>
            <div style={{
                margin: "20px 0 20px 0",
                backgroundColor: "rgb(245,249,249)",
                borderRadius: "12px",
                padding: "20px"
            }}>
                <h2>Add Notes:</h2>
                <form>
                    <div className="input-group mb-3">
                        <span className="input-group-text" id="basic-addon1" style={{
                            backgroundColor: "rgb(232,241,240)"
                        }}>Title</span>
                        <input id='title' name='title' type="text" onChange={onChange} value={note.title} className="form-control" placeholder="Title" aria-label="Title" aria-describedby="basic-addon1" />
                    </div>
                    <div className="input-group">
                        <span className="input-group-text" style={{
                            backgroundColor: "rgb(232,241,240)"
                        }}>Description</span>
                        <textarea id='description' name='description' className="form-control" aria-label="With textarea" onChange={onChange} value={note.description} placeholder="Description" style={{ height: '150px' }}></textarea>
                    </div>
                    <button type="button" className="my-3" onClick={handleAddNote}>Add Note</button>
                </form>
            </div>
        </>
    )
}