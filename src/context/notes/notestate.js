import NoteContext from "./notecontext";
import { useState } from "react";
const NoteState = (props) => {
  const host = "http://localhost:5000";
  const noteshard = [

  ]
  const [notes, setNotes] = useState(noteshard);
  const getallnotes = async () => {
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token') // Assuming you store the token in localStorage
      }

    });
    const json = await response.json();
    setNotes(json);
  }
  const addnote = async (title, content) => {
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token') // Assuming you store the token in localStorage
      },
      body: JSON.stringify({ title, content })
    });
    const json = await response.json();

    if (response.ok) {
      setNotes(notes.concat(json));
      return { success: true, json }; // Return success status
    } else {
      return { success: false, error: json }
    }
  }
  const deletenote = async (id) => {
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token') // Assuming you store the token in localStorage
      }
    });

    if (response.ok) {
      const newnotes = notes.filter((note) => { return note._id !== id });
      setNotes(newnotes);
      return { success: true }; // Return success status
    } else {
      const json = await response.json();
      return { success: false, error: json }; // Return error if deletion fails
    }
  }
  const updatenote = async (id, title, content) => {
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token') // Assuming you store the token in localStorage
      },
      body: JSON.stringify({ title, content })
    });
    const json = await response.json();

    if (json.success) {
      const note = notes.find((note) => { return note._id === id });
      const newnote = { ...note, title, content };
      const newnotes = notes.map((note) => { return note._id === id ? newnote : note });
      setNotes(newnotes);
      return { success: true, note: newnote }; // Return success status
    }
    else {
      return { success: false, error: json };
    }
  }

  return (
    <NoteContext.Provider value={{ notes, addnote, deletenote, updatenote, getallnotes }} >
      {props.children}
    </NoteContext.Provider>
  );
}
export default NoteState;