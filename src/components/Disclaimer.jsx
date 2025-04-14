import { NavLink } from 'react-router';
import Cookies from 'universal-cookie';
import '../App.css';

const cookies = new Cookies();

const setDisclaimerAccepted = () => {
  cookies.set("disclaimerAccepted", true)
}

function Disclaimer() {
    return(
        <>
            <h2 style={{textAlign: "center"}}>DISCLAIMER</h2>
            <div style={{textAlign: "left", padding: "10px 30px", overflow: "visible"}}>
                This browser extension, BCBS Explorer, is designed to provide users with information about Blue Cross Blue Shield (BCBS) carriers. The information provided by this extension is for general informational purposes only and is not intended to be a substitute for official documentation.
                <br/>
                <br/>
                <h5 style={{margin: "5px 0"}}>Accuracy of Information</h5>
                While I strive to ensure that the information provided by this extension is accurate and up-to-date, I make no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, suitability, or availability with respect to the information, products, services, or related graphics contained in the extension for any purpose. Any reliance you place on such information is therefore strictly at your own risk.
                <br/>
                <br/>
                <h5 style={{margin: "5px 0"}}>No Endorsement</h5>
                This extension is not affiliated with, endorsed by, or sponsored by any Blue Cross Blue Shield carrier or any of its affiliates. The use of any trade names, trademarks, service marks, logos, or domain names (collectively “Marks”) in this extension does not imply any affiliation with or endorsement by the respective owners.
                <br/>
                <br/>
                <h5 style={{margin: "5px 0"}}>Limitation of Liability</h5>
                In no event will I be liable for any loss or damage including without limitation, indirect or consequential loss or damage, or any loss or damage whatsoever arising from loss of data or profits arising out of, or in connection with, the use of this extension.
                <br/>
                <br/>
                <h5 style={{margin: "5px 0"}}>External Links</h5>
                Through this extension, you may be able to link to other websites which are not under the control of Leeous&apos; Creations. I have no control over the nature, content, and availability of those sites. The inclusion of any links does not necessarily imply a recommendation or endorse the views expressed within them.
                <br/>
                <br/>
                <h5 style={{margin: "5px 0"}}>Changes to This Disclaimer</h5>
                I may update this disclaimer from time to time. I will notify you of any changes by posting the new disclaimer on this page. You are advised to review this disclaimer periodically for any changes. Changes to this disclaimer are effective when they are posted on this page.
                <br/>
                <br/>
                <h5 style={{margin: "5px 0"}}>Notes fields</h5>
                Notes are not currently encrypted - please do not store PHI in this field as it will not be properly secured.
                <br/>
                <br/>
                <h5 style={{margin: "5px 0"}}>Contact Us</h5>
                If you have any questions about this disclaimer, contact me at <span><a href="mailto:contact@leeous.com">contact@leeous.com</a>.</span>
            </div>
            <div style={{paddingBottom: "50px", paddingTop: "50px", textAlign: "center"}}>
              <NavLink className={"button-normal"} style={{textDecoration: "none"}} to={"/search"} onClick={() => setDisclaimerAccepted()}>
                I understand and agree to the terms above
              </NavLink>
            </div>
        </>
    )
}

export default Disclaimer