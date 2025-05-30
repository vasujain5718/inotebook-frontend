import NoteContext from "../context/notes/notecontext"
import UnoteContext from "../context/notes/unotecontext";
import { useContext } from "react";
export const Noteitem =  (props) => {
    const context = useContext(NoteContext);
    const unotecontext = useContext(UnoteContext);
  return (
    <div className="card " style={{"width": "18rem"}}>
  <div className="card-body">
    <h5 className="card-title">{props.title}</h5>
    <p className="card-text">{props.content}</p>
    <i className="fa-solid fa-trash " onClick={async ()=>{
        const resp=await context.deletenote(props.id);
        if(resp.success){
            props.showAlert("Note deleted successfully!", "success");
        props.showAlert("Note deleted successfully!", "success");
        } else {
            props.showAlert("Failed to update note: " + (resp.error?.errors?.[0]?.msg || "Unknown error"), "danger");
        }
    }} ></i>
    <i className="fa-solid fa-file-pen mx-4" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={
    ()=>{
        unotecontext.setUnote(props.id);
       
    }
    } ></i>
  </div>
</div>
  )
}
