import { useEffect, useState } from "react";
import PropTypes from 'prop-types';

const Note = ({ carrierName, carrierPrefix }) => {
	const [note, setNote] = useState("");

	useEffect(() => {
		// Retrieve the saved note from localStorage
		const savedNote = JSON.parse(localStorage.getItem(carrierPrefix));
		console.log(savedNote)
		if (savedNote) {
			setNote(savedNote);
		}
	}, [carrierPrefix]);

	const handleNote = (event) => {
		const note = event.target.value;
		setNote({carrierName, note});
		// Save the new note to localStorage
		localStorage.setItem(carrierPrefix, JSON.stringify({carrierName, note}));
	};

	return (
    <>
      <div className="notes">
        <h4>Notes</h4>
        {carrierPrefix != "" ? <textarea className="noteText" onChange={handleNote} value={note.note}></textarea> : ""}
      </div>
    </>
	);
};

Note.propTypes = {
	carrierName: PropTypes.string,
	carrierPrefix: PropTypes.string
}

export default Note;
