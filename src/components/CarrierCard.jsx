import PropTypes from 'prop-types';

const CarrierCard = ({ carrierName, carrierPrefix, carrierPhoneNumbers, carrierPortalURL, carrierPayerID }) => {

console.log(carrierName, carrierPrefix, carrierPhoneNumbers, carrierPayerID, carrierPortalURL)

  // const parseJSON = (data) => {
  //   console.log(data["benefits_phone_number"])
  //   if (typeof data === 'string') {
  //     try {
  //       data = JSON.parse(data);
  //     } catch (error) {
  //       console.info('Failed to parse JSON, carrier only has a single number.');
  //     }
  //   } 
  //   return data["benefits_phone_numbers"];
  // };

  // const renderConvertedJSON = (data) => {
  //   // Check if result contains JSON
  //   const potentialJSON = parseJSON(data);
  //   if (typeof potentialJSON === "object") {
  //     return (
  //       <>
  //         <br />
  //         {potentialJSON.map((number, index) => (
  //           // TODO: switch to array.join
  //           <span key={index}>{number}{index != (data.length-1) ? ',' : ''} </span>
  //         ))}
  //       </>
  //     );
  //   } else {
  //     return <b>{carrierPhoneNumbers}</b>;
  //   }
  // }

  // TODO: Change this to a table to accomdate uncommon data
  return (
    <section>
      <h3>{carrierName} - <span style={{fontWeight: 300, fontStyle: "italic"}}>{carrierPrefix}</span></h3>
      {carrierPhoneNumbers && <p>Phone number (benefits): <b>{carrierPhoneNumbers["benefits_phone_number"]}</b></p> }
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