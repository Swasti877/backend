import React, { useContext, useEffect, useRef, useState } from 'react';
import AddNote from './AddNote';
import NotesItem from './NotesItem';
import NoteContext from '../context/notes/NoteContext';

export default function Home(props) {
    const context = useContext(NoteContext);
    const { notes, fetchAllNotes, updateNote } = context;
    const [note, setNote] = useState({ _id: '', etitle: '', edescription: '' });
    const { showAlert } = props;
    const ref = useRef(null);
    const refClose = useRef(null);

    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }
    //edit note function passon as props in noteitem
    const editNote = (currentNote) => {
        ref.current.click();
        console.log(currentNote._id)
        setNote({
            _id: currentNote._id,
            etitle: currentNote.title,
            edescription: currentNote.description
        })
    }
    const handleEditNote = (e) => {
        e.preventDefault();
        updateNote(note._id, note.etitle, note.edescription);
        setNote({ _id: '', etitle: '', edescription: '' });
        refClose.current.click();
        showAlert('Edited Note Successfully', 'success')
        window.location.reload(false);
    }

    useEffect(() => {
        fetchAllNotes();
    }, [])
    return (
        <>
            <div className="container">
                <button type="button" ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                </button>

                <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="staticBackdropLabel">Edit Note</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="input-group mb-3">
                                <span className="input-group-text" id="basic-addon1">Title</span>
                                <input id='etitle' name='etitle' type="text" onChange={onChange} value={note.etitle} className="form-control" placeholder="Title" aria-label="Title" aria-describedby="basic-addon1" />
                            </div>
                            <div className="input-group">
                                <span className="input-group-text">Description</span>
                                <textarea id='edescription' name='edescription' className="form-control" aria-label="With textarea" onChange={onChange} value={note.edescription} placeholder="Description" style={{ height: '150px' }}></textarea>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" ref={refClose}>Close</button>
                                <button type="button" className="btn btn-primary" onClick={handleEditNote}>Submit</button>
                            </div>
                        </div>
                    </div>
                </div>
                <AddNote />
                <div style={{ backgroundColor: "rgb(245,249,249)", borderRadius: "12px", padding: "20px" }}>
                    <h2>Pending  Notes:</h2>
                    <div className="container my-2">
                        <div className="row">
                            {notes.map((note) => {
                                if (!note.taskComplete) {
                                    return <NotesItem key={note._id} note={note} editNote={editNote} showAlert={showAlert} />
                                }
                            })}
                        </div>
                    </div>
                </div>
                <div style={{ backgroundColor: "rgb(245,249,249)", borderRadius: "12px", padding: "20px", margin: "20px 0 20px 0" }}>
                    <h2>Completed Notes:</h2>
                    <div className="container my-2">
                        <div className="row">
                            {notes.map((note) => {
                                if (note.taskComplete) { return <NotesItem key={note._id} note={note} editNote={editNote} showAlert={showAlert} /> }
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}