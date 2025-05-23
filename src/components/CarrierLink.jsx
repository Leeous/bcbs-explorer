import PropTypes from 'react';

const CarrierLink = ({linkText, linkURL}) => {
    console.log(linkText, linkURL);
}


CarrierLink.propTypes = {
  linkText: PropTypes.string,
  linkURL: PropTypes.string
};
export default CarrierLink;
