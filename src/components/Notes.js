import { useContext } from "react";
import NoteContext from "../context/notes/notecontext";
import { Noteitem } from "./noteitem"; // Import your Noteitem component

export default function Notes({ showAlert }) {
  const { notes } = useContext(NoteContext);

  if (!notes.length) {
    return <p className="text-muted text-center">No notes to display.</p>;
  }

  return (
    <div className="row g-4">
      {notes.map(note => (
        <div className="col-md-4" key={note._id}>
          <Noteitem
            id={note._id}
            title={note.title}
            content={note.content}
            showAlert={showAlert}
          />
        </div>
      ))}
    </div>
  );
}