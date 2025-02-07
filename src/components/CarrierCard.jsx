import PropTypes from 'prop-types';
import { useState } from 'react';

const CarrierCard = ({ carrierName, carrierPrefix, carrierPhoneNumbers, carrierURLs, carrierPayerID }) => {

  // TODO: Change this to a table to accomdate uncommon data
  return (
    <section>
      <h3>{carrierName} - <span style={{fontWeight: 300, fontStyle: "italic"}}>{carrierPrefix}</span></h3>
      {carrierPhoneNumbers && <p>Phone number (benefits): <b>{carrierPhoneNumbers.benefits_phone_number}</b></p> }
      {/* {carrierNumberClaims && <p>Phone number (claims): <b></b></p> } */}
      {/* {carrierPayerID && <p>Payer ID: <b>{carrierPayerID}</b></p> } */}
      {/* {carrierURLs && Object.keys(carrierURLs).map((url) => {
        <p>{url.general}</p>
      })}  */}
      <h4>Links</h4>
      {carrierURLs && Object.keys(carrierURLs).map((keyName, i) => (
        <li className='carrier-urls' key={i}>
          <a target='_blank' href={carrierURLs[keyName]}>{keyName}</a>
        </li>
      ))}
      
    </section>
  );
};

CarrierCard.propTypes = {
  carrierName: PropTypes.string,
  carrierPrefix: PropTypes.string,
  carrierPhoneNumbers: PropTypes.any,
  carrierNumberClaims: PropTypes.string,
  carrierURLs: PropTypes.any,
  carrierPayerID: PropTypes.string
};

export default CarrierCard;