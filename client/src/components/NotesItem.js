import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NoteContext from '../context/notes/NoteContext';

export default function NotesItem(props) {
    const context = useContext(NoteContext);
    const { note, editNote, showAlert } = props;
    const { deleteNote, completeNote } = context;

    const handleCheckbox = (currentnode) => {
        if (document.getElementById(currentnode._id).checked) {
            completeNote(currentnode._id, 'true')
        } else {
            completeNote(currentnode._id, 'false')
        }
        window.location.reload(false);
    }

    return (
        <>
            <div className="col my-2">
                <div className="card" style={{ border: "none", boxShadow: "0 4px 8px 0 rgb(0 0 0 / 10%), 0 4px 8px 0 rgb(0 0 0 / 2%)" }}>
                    <div className="card-body">
                        <div className="row">
                            <div className="col">
                                <h5 className="card-title d-flex flex-row" style={{
                                    padding: "8px",
                                    backgroundColor: "rgb(232,241,240)",
                                    borderRadius: "12px"
                                }}>{note.title}</h5>
                            </div>
                            <div className="col">
                                <h5 className="form-check d-flex flex-row-reverse">
                                    <input className="form-check-input" type="checkbox" value="" id={note._id} onClick={() => { handleCheckbox(note) }} />
                                </h5>
                            </div>
                        </div>
                        <p className="card-text">{note.description}</p>
                        <p className="card-text"><small className="text-muted">Last updated on {new Date(note.date).toDateString()}</small></p>
                        <i><span className="material-icons" onClick={() => { editNote(note) }}>edit</span></i>
                        <i><span className="material-icons" style={{ color: "rgb(235,0,0)" }} onClick={() => { deleteNote(note._id); showAlert('Note Deleted Successfully', 'success') }}>delete</span></i>
                    </div>
                </div>
            </div>
        </>
    )
}