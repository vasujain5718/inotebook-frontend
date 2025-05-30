import  Notes  from "./Notes"
import NoteContext from "../context/notes/notecontext"
import UnoteContext from "../context/notes/unotecontext";
import { useContext, useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";
export default function Home(props) {
  const context = useContext(NoteContext);
  const navigate = useNavigate();
  const unotecontext = useContext(UnoteContext);
  const handleclick = async (e) => {
    e.preventDefault();
    const result = await context.addnote(note.title, note.content);
    if (result.success) {
      setNote({ title: "", content: "" });
      props.showAlert("Note added successfully!", "success");
    } else {
      props.showAlert("Failed to add note: " + (result.error?.errors?.[0]?.msg || "Unknown error"), "danger");
    }
  };
  const updatechange = async (e) => {
    e.preventDefault();
    const resp=await context.updatenote(unotecontext.unote, utitle, ucontent);
    if (resp.success) {
      props.showAlert("Note updated successfully!", "success");
      setUtitle("");
      setUcontent("");
    } else {
      props.showAlert("Failed to update note: " + (resp.error?.errors?.[0]?.msg || "Unknown error"), "danger");
    }
  }
  useEffect(() => {
    if (localStorage.getItem('token') === null) {
      navigate("/login");
    }
    else {
      context.getallnotes();
    }
    // eslint-disable-next-line
  }, [])
  const [note, setNote] = useState({ title: "", content: "" });
  const onchange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  }
  const [utitle, setUtitle] = useState("");
  const [ucontent, setUcontent] = useState("");
  return (
  <div >
    <div className="container">
      <div className="row justify-content-center mb-4">
        <div className="col-md-8">
          <div className="card shadow-lg p-4 bg-white">
            <h1 className="mb-4 text-center text-primary fw-bold">Add a Note</h1>
            <form>
              <div className="mb-3">
                <label htmlFor="title" className="form-label">Title</label>
                <input type="text" className="form-control rounded-pill" id="title" name="title" onChange={onchange} value={note.title} />
              </div>
              <div className="mb-3">
                <label htmlFor="description" className="form-label">Content</label>
                <input type="text" className="form-control rounded-pill" name="content" value={note.content} id="description" onChange={onchange} />
              </div>
              <button type="submit" className="btn btn-primary w-100" onClick={handleclick}>Add Note</button>
            </form>
          </div>
        </div>
      </div>

      {/* Modal */}
      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content rounded-4">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <form>
              <div className="modal-body">
                <div className="mb-3">
                  <label htmlFor="editTitle" className="form-label">Title</label>
                  <input
                    type="text"
                    className="form-control"
                    id="editTitle"
                    name="editTitle"
                    value={utitle}
                    onChange={(e) => setUtitle(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="editContent" className="form-label">Content</label>
                  <input
                    type="text"
                    className="form-control"
                    id="editContent"
                    name="editContent"
                    value={ucontent}
                    onChange={(e) => setUcontent(e.target.value)}
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="submit" className="btn btn-primary" data-bs-dismiss="modal" onClick={updatechange}>Save changes</button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Notes Section */}
      <div className="mt-4">
        <h2 className="mb-3 text-secondary">Your Notes</h2>
        <Notes showAlert={props.showAlert} />
      </div>
    </div>
  </div>
)
}
