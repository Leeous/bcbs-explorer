import { useState } from 'react';
import BCBSDB from "../assets/bcbs_data.json";

const AddCarrierForm = () => {
  const [carrierName, setCarrierName] = useState('');
  const [carrierPrefix, setCarrierPrefix] = useState('');
  const [carrierPhones, setCarrierPhones] = useState([""]);
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

    prefixMatch.planName != undefined ? setCarrierName(prefixMatch.planName) : null;
    prefixMatch.phone_numbers != undefined ? setCarrierPhones(prefixMatch.phone_numbers) : null;
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

  const handleCarrierPhone = (target, index) => {
    const re = /^[0-9\b]+$/;
    console.log(re.test(target.value))

    if (target.value === '' || re.test(target.value)) {
      const newPhoneNumber = [...carrierPhones];
      newPhoneNumber[index] = target.value;
      setCarrierPhones(newPhoneNumber);
    }
    console.log(carrierPhones)
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
              {carrierPhones ? carrierPhones.map((phoneNumber, index) => <input type="text" key={index} defaultValue={phoneNumber} name="carrierPhone" onChange={(event) => handleCarrierPhone(event.target, index)} maxLength={10} />) : null}
            </div>
            <button onClick={() => {
              setCarrierPhones([
                ...carrierPhones,
                ""
              ]);
            }}>add number</button>
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