import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import parse from 'html-react-parser';

/**
 * @param {string} title - The title to display for the modal
 * @param {string} description - The body text to display for the modal
 * @param {boolean} showDecline - Whether or not to render a decline/no button (default: false)
 * @param {boolean} showConfirmation - Whether or not to render a decline/no button (default: true)
 * @param {Array<{type: string, text: string}>} options - array of objects for options
 * @param {string} confirmationText - Text rendered in accept button (default: "I understand")
 * @param {string} rememberText - Text rendered next to checkbox button (default: "Don't remind me again")
 */
function Modal({
  title,
  description,
  onClose,
  onChange,
  onSubmit,
  options,
  showDecline = false,
  showConfirmation = true,
  confirmationText = "I understand",
}) {
  return (
    <div className='modal'>
      <h1>{title}</h1>
      <div>{parse(description)}</div>
      <div className='modal-options'>
      {options && options.map((option, index) => {
        if (option.type === "checkbox") {
          return (
            <div className='modal-option' key={index}>
              <input onChange={onChange} type={option.type} id={option.value} value={option.value} />
              <label htmlFor={option.value}>{option.label}</label>
            </div>
          );
        }
      })}
      </div>
      {showDecline ? <button onClick={onClose} className='button-normal'>Decline</button> : ""}
      {showConfirmation ? <button onClick={onSubmit} className='button-normal'>{confirmationText}</button> : ""}
    </div>
  )
}

Modal.propTypes = {
	title: PropTypes.string,
  description: PropTypes.string,
  onClose: PropTypes.func,
  onChange: PropTypes.func,
  onSubmit: PropTypes.func,
  options: PropTypes.array,
  showDecline: PropTypes.bool,
  showConfirmation: PropTypes.bool,
  confirmationText: PropTypes.string
};

export default Modal;