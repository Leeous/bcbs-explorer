import PropTypes from 'prop-types';

const CarrierCard = ({ carrierName, carrierNumberBenefits, carrierNumberClaims, carrierPortalURL, carrierPayerID }) => {
  return (
    <section>
      <h3>{carrierName}</h3>
      {carrierNumberBenefits && <p>Phone number (benefits): <b>{carrierNumberBenefits}</b></p> }
      {carrierNumberClaims && <p>Phone number (claims): <b>{carrierNumberClaims}</b></p> }
      {carrierPortalURL && <p>Portal link: <b><a href={carrierPortalURL} target='_blank'>{carrierPortalURL}</a></b></p> }
      {carrierPayerID && <p>Payer ID: <b>{carrierPayerID}</b></p> }
    </section>
  );
};

CarrierCard.propTypes = {
  carrierName: PropTypes.string,
  carrierNumberBenefits: PropTypes.string,
  carrierNumberClaims: PropTypes.string,
  carrierPortalURL: PropTypes.string,
  carrierPayerID: PropTypes.string
};

export default CarrierCard;