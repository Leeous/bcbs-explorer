import { useState } from 'react';
import BCBSDB from "../assets/bcbs_data.json";

const AddCarrierForm = () => {
  const [carrierName, setCarrierName] = useState('');
  const [carrierPrefix, setCarrierPrefix] = useState('');
  const [carrierPhones, setCarrierPhones] = useState([]);
  const [carrierLinks, setCarrierLinks] = useState('');
  const [carrierMatch, setCarrierMatch] = useState(false);

  let formComplete = false;
  const carriers = Object.keys(BCBSDB).map(key => ({
    planName: key,
    ...BCBSDB[key]
  }));

  if (carrierPrefix.length == 3 && carrierName.length != 0) {
    formComplete = true;
  } else {
    formComplete = false;
  }

  // If prefix exists, prefill data
  console.log(carrierPrefix.length, carrierMatch)
  if (carrierPrefix.length == 3 && !carrierMatch) {
    let prefixMatch = carriers.find(carrier => carrier.prefixes.includes(carrierPrefix.toLowerCase()));
    console.log(prefixMatch);


    prefixMatch.planName != undefined ? setCarrierName(prefixMatch.planName) : null;
    // prefixMatch.phone_numbers != undefined ? setCarrierName(prefixMatch.planName) : null;
    // setCarrierPhone(Object.keys(prefixMatch.phone_numbers));
    setCarrierMatch(true);
  }


  const handleCarrierPrefix = ({ target }) => {
    setCarrierPrefix(target.value.toUpperCase());
    if (carrierPrefix.length < 2) {
      console.info("Cleared form since prefix was edited.")
      setCarrierName('');
      setCarrierPhones('');
      setCarrierLinks('');
      setCarrierMatch(false);
    }
  }

  const handleCarrierName = ({ target }) => {
    setCarrierName(target.value);
  }

  const handleCarrierPhone = ({ target }) => {
    const re = /^[0-9\b]+$/;
    console.log(re.test(target.value));

    if (target.value === '' || re.test(target.value)) {
      setCarrierPhones(target.value)
    }
  }

  const handleCarrierLinks = ({ target }) => {
    setCarrierPhones(target.value);
  }

  function AddCarrier(newCarrierData) {
    console.log("!!!", newCarrierData);
  }

  return (
    <form autoComplete="off" action={AddCarrier} className="add-carrier-form">
      <div>
        <div>
          <label htmlFor="carrierPrefix">Carrier Prefix</label>
          <input type="text" value={carrierPrefix} name="carrierPrefix" onChange={handleCarrierPrefix} maxLength={3} minLength={3} />
        </div>

        {carrierPrefix.length == 3 ?
          <>
            <div>
              <label htmlFor="carrierName">Carrier Name</label>
              <input type="text" value={carrierName} name="carrierName" onChange={handleCarrierName} maxLength={40} />
            </div>
            <div>
              <label htmlFor="carrierPhone">Carrier Phone number(s)</label>
              <input type="text" value={carrierPhones} name="carrierPhone" onChange={handleCarrierPhone} maxLength={10} />
            </div>
            <div>
            <label htmlFor="carrierLinks">Carrier Links</label>
            <input type="text" value={carrierLinks} name="carrierLinks" onChange={handleCarrierLinks} />
          </div> 
          </>
          : null}
      </div>
      {formComplete ?
        <input type="submit" className='button-normal' value="Submit" /> : null
      }
    </form>
  )
}

export default AddCarrierForm;