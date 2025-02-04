import PropTypes from 'prop-types';

const CarrierCard = ({ carrierName, carrierPrefix, carrierPhoneNumbers, carrierPortalURL, carrierPayerID }) => {

  const handleObject = (obj) => {
    console.log(obj)
    if (typeof obj === "string") return obj;
  }

  // TODO: Change this to a table to accomdate uncommon data
  return (
    <section>
      <h3>{carrierName} - <span style={{fontWeight: 300, fontStyle: "italic"}}>{carrierPrefix}</span></h3>
      {carrierPhoneNumbers && <p>Phone number (benefits): <b>{handleObject(carrierPhoneNumbers)}</b></p> }
      {/* {carrierNumberClaims && <p>Phone number (claims): <b></b></p> } */}
      {/* {carrierPayerID && <p>Payer ID: <b>{carrierPayerID}</b></p> } */}
      {/* {carrierPortalURL && <p><b><a href={carrierPortalURL} target='_blank'>Portal link</a></b></p> } */}
    </section>
  );
};

CarrierCard.propTypes = {
  carrierName: PropTypes.string,
  carrierPrefix: PropTypes.string,
  carrierPhoneNumbers: PropTypes.any,
  carrierNumberClaims: PropTypes.string,
  carrierPortalURL: PropTypes.string,
  carrierPayerID: PropTypes.string
};

export default CarrierCard;