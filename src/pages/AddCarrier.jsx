import { useState } from "react";
import Navigation from "../components/Navigation";
import AddCarrierForm from "../components/AddCarrierForm";
import Modal from "../components/Modal";

export default function AddCarrier() {
  return (
    <>
			<Navigation />
			<Modal title="Custom carriers and overrides" cookieName="customCarrierAck" description={`
				This form will allow you to create custom carriers, or override information for existing carriers. 
				This is based on <b>prefix</b>, so if you enter an existing prefix, you will override the information for that prefix. If you enter a prefix that doesn't exist in the dataset, it will let you populate the details for that carrier.
				<br/><br/>
				If you feel like you're needing to override information too often, please utilize the "<a href ='https://forms.gle/uR8LDcQ4fVQarXPT8' target='_blank'>Something's wrong!</a>" link to report inaccurate carrier information, I'm happy to track and fix these issues.
				`} />
			<h3 className="form-title">Add/Override carrier</h3>
			<AddCarrierForm />
    </>
  )
}