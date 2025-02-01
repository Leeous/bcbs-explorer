import PropTypes from 'prop-types';

const CarrierCard = ({ carrierName, carrierPrefix, carrierNumberBenefits, carrierNumberClaims, carrierPortalURL, carrierPayerID }) => {


  const parseJSON = (data) => {
    if (typeof data === 'string') {
      try {
        data = JSON.parse(data);
      } catch (error) {
        console.error('Failed to parse benefits numbers:', error);
      }
    } 
    console.log(typeof data)

    return data["phone_numbers"];
  };

  const renderBenefitsNumbers = () => {
    const data = parseJSON(carrierNumberBenefits);
    if (typeof data === "object") {
      return (
        <>
          <br />
          {data.map((number, index) => (
            <span key={index}>{number}{index != (data.length-1) ? ',' : ''} </span>
          ))}
        </>
      );
    } else {
      return <b>{carrierNumberBenefits}</b>;
    }
  }

  
  return (
    <section>
      <h3>{carrierName} - <span style={{fontWeight: 500}}>{carrierPrefix}</span></h3>
      {carrierNumberBenefits && <p>Phone number (benefits): <b>{renderBenefitsNumbers()}</b></p> }
      {carrierNumberClaims && <p>Phone number (claims): <b></b></p> }
      {carrierPortalURL && <p>Portal link: <b><a href={carrierPortalURL} target='_blank'>{carrierPortalURL}</a></b></p> }
      {carrierPayerID && <p>Payer ID: <b>{carrierPayerID}</b></p> }
    </section>
  );
};

CarrierCard.propTypes = {
  carrierName: PropTypes.string,
  carrierPrefix: PropTypes.string,
  carrierNumberBenefits: PropTypes.any,
  carrierNumberClaims: PropTypes.string,
  carrierPortalURL: PropTypes.string,
  carrierPayerID: PropTypes.string
};

export default CarrierCard;