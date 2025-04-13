import PropTypes from 'prop-types';
import Warning from '../assets/warning.png';


const CarrierCard = ({ carrierName, carrierPhoneNumbers, carrierURLs, carrierPayerID }) => {
  // TODO: Change this to a table to accommodate uncommon data
  return (
    <section className='carrier-card'>
      <h3>{carrierName}</h3>
      {carrierPhoneNumbers && 
      <div>
        <h4>Phone numbers</h4>
        <li>{carrierPhoneNumbers.benefits_phone_number}</li>
      </div>}
      {carrierURLs && <h4>Links</h4>}
      {carrierURLs && Object.keys(carrierURLs).map((keyName, i) => (
        <li className='carrier-urls' key={i}>
          <a target='_blank' href={carrierURLs[keyName]}>{keyName}</a>
        </li>
      ))}
      <p className="report-issue"><a href="#">Something's wrong.</a><img src={Warning} style={{width: "20px", marginLeft: "7.5px"}}/></p>
    </section>
  );
};

CarrierCard.propTypes = {
  carrierName: PropTypes.string,
  carrierPhoneNumbers: PropTypes.any,
  carrierNumberClaims: PropTypes.string,
  carrierURLs: PropTypes.any,
  carrierPayerID: PropTypes.string
};

export default CarrierCard;