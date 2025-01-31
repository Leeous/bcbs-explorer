// import React, { useEffect } from 'react';
import { Fragment } from 'react';

const Modal = ({modal_title, modal_content}) => {
    return(
        <div className="modal-container">
            <div className="modal">
                <div className="modal-header">
                    <p className="close">&times;</p>
                    <h1>{modal_title}</h1>
                </div>
                <div className="modal-content">
                    <Fragment>
                        {modal_content}
                    </Fragment>
                </div>
                <div className="modal-footer">
                    <button className="button-normal">I understand</button>
                </div>
            </div>
        </div>
    );
};

export default Modal;