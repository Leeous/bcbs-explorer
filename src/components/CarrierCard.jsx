import PropTypes from 'prop-types';
import Warning from '../assets/warning.png';
import { NavLink } from 'react-router';

/**
 * @param {string} carrierName - The name of the carrier
 * @param {number[]} [carrierPhoneNumbers] - Phone numbers for the carrier
 * @param {Array<{link_text: string, link_url: string}>} [carrierURLs] - Links for the carrier
 * @param {string} [carrierPayerID] - The payer ID for the carrier
 * @param {boolean} [carrierCustom] - Whether or not a carrier has been overridden
 */
const CarrierCard = ({ carrierName, carrierPhoneNumbers, carrierURLs, carrierPayerID, carrierCustom }) => {
  return (
    <section className='carrier-card'>
      <h3>{carrierName}</h3>
      {carrierPhoneNumbers && 
      <div>
        <h4>Phone numbers</h4>
        <li className='carrier-urls'>{carrierPhoneNumbers.map((number, index) => {
          return <span key={number}><a href={"tel:" + number} >({String(number).slice(0, 3)}) {String(number).slice(3, 6)}-{String(number).slice(6)}</a>{index < carrierPhoneNumbers.length - 1 ? ", " : ""}</span>;
        })}</li>
      </div>}
      {carrierPayerID && 
        <>
          <h4>Carrier Payer ID</h4>
          <p>{carrierPayerID}</p>
        </>
      }
      {carrierURLs && <h4>Links</h4>}
      {carrierURLs && carrierURLs.map((URL, i) => (
        <li className='carrier-urls' key={i}>
          <a target='_blank' href={URL.link_url}>{URL.link_text}</a>
        </li>
      ))}
      <p className="report-issue"><a href={"https://docs.google.com/forms/d/e/1FAIpQLSeKcdJClLpMMFTVRQ6T7u2lJplLQigS-mHTy4w1b_tNCUutHg/viewform?usp=pp_url&entry.1691490468=" + carrierName} target='_blank'>Something&apos;s wrong.</a><img src={Warning} style={{width: "16px", marginLeft: "7.5px"}}/></p>
      {carrierCustom &&
        <p style={{display: "inline-block", margin: 0}} className='report-issue'>This prefix has been overridden.<br/>Visit <NavLink style={{textDecoration: "underline"}} to="/add">carrier overrides</NavLink> to edit this data.</p>
      }
    </section>
  );
};

CarrierCard.propTypes = {
  carrierName: PropTypes.string,
  carrierPhoneNumbers: PropTypes.any,
  carrierNumberClaims: PropTypes.string,
  carrierURLs: PropTypes.any,
  carrierPayerID: PropTypes.string,
  carrierCustom: PropTypes.bool
};

export default CarrierCard;