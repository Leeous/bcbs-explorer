import { useEffect, useState } from "react";

const Note = ({ carrierKey }) => {
	const [note, setNote] = useState("");

	useEffect(() => {
		// Retrieve the saved note from localStorage
		const savedNote = localStorage.getItem(carrierKey);
		if (savedNote) {
			setNote(savedNote);
		}
	}, [carrierKey]);

	const handleNote = (event) => {
		const newNote = event.target.value;
		setNote(newNote);
		// Save the new note to localStorage
		localStorage.setItem(carrierKey, newNote);
	};

	return (
    <>
      <div className="notes">
        <h4>Notes</h4>
        {carrierKey != "" ? <textarea className="noteText" onChange={handleNote} value={note}></textarea> : ""}
      </div>
    </>
	);
};

export default Note;
