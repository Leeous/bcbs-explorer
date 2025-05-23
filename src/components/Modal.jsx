import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Cookies from 'universal-cookie';
import parse from 'html-react-parser';

/**
 * @param {string} title - The title to display for the modal
 * @param {string} description - The body text to display for the modal
 * @param {boolean} showDecline - Whether or not to render a decline/no button (default: false)
 * @param {boolean} showConfirmation - Whether or not to render a decline/no button (default: true)
 * @param {boolean} showRememberCheckbox - Whether or not to render a remember decision checkbox (default: true)
 * @param {string} cookieName - Name for cookie used if user wants to remember decision
 * @param {string} confirmationText - Text rendered in accept button (default: "I understand")
 * @param {string} rememberText - Text rendered next to checkbox button (default: "Don't remind me again")
 */
function Modal({ 
	title, 
	description, 
	showRememberCheckbox = "true", 
	showDecline = false, 
	showConfirmation = true, 
	cookieName, 
	confirmationText = "I understand",
	rememberText = "Don't remind me again"
}) {
	const cookies = new Cookies();
	const [showPopup, setShowPopup] = useState(true);
	const [rememberDecision, setRememberDecision] = useState(false);

	// useEffect to check and set the initial state based on cookies
	useEffect(() => {
		const decision = cookies.get(cookieName);
		if (decision) {
			// If user previously accepted and chose to remember the decision, hide the popup
			setShowPopup(false);
		}
	}, [cookies, cookieName]);

	const handleAccept = () => {
		setShowPopup(false);

		if (rememberDecision) {
			cookies.set(cookieName, true);
			setRememberDecision(true);
		}
	}

	const handleDecline = () => {
		setShowPopup(false);
	}

	const handleRememberDecisionChange = (event) => {
		setRememberDecision(event.target.checked);
	}

	return (
		showPopup && (
			<div className='modal'>
				<h2>{title}</h2>
				<p>{parse(description)}</p>
				<div>
					{showRememberCheckbox ? <>
						<input type="checkbox" checked={rememberDecision} onChange={handleRememberDecisionChange} name="rememberDecision" id="rememberDecision" />
						<label htmlFor="rememberDecision">{rememberText}</label>
					</> : ""}
				</div>
				{showDecline ? <button className='button-normal' onClick={handleDecline}>Decline</button> : ""}
				{showConfirmation ? <button className='button-normal' onClick={handleAccept}>{confirmationText}</button> : ""}
			</div>
		)
	)
}

Modal.propTypes = {
	title: PropTypes.string,
	description: PropTypes.string,
	showDecline: PropTypes.boolean,
	showConfirmation: PropTypes.boolean,
	showRememberCheckbox: PropTypes.boolean,
	cookieName: PropTypes.string,
	confirmationText: PropTypes.string,
	rememberText: PropTypes.string
};

export default Modal;