import { useState } from "react";

const Note = ({carrier}) => {
  const [note, setNote] = useState("");
  if (carrier !== "") {
    const handleNote = (event) => {
      console.log(sessionStorage.getItem(carrier));
      // If no key for carrier, make one
      if (sessionStorage.getItem(carrier) === null) {
        console.log("create key")
      } else {
        setNote(sessionStorage.getItem(carrier))
      }
    }

    return (
      <div className="notes">
        <textarea id="noteText" onChange={handleNote} value={note}></textarea>
      </div>
    )
  }
}

export default Note;