import { useState } from 'react';
import BCBSDB from "../assets/bcbs_data.json";

const AddCarrierForm = () => {

  const [carrier, setCarrier] = useState({
    name: "",
    prefix: "",
    phones: [],
    links: []
  })
  const [carrierMatch, setCarrierMatch] = useState(false);

  let formComplete = false;
  const carriers = Object.keys(BCBSDB).map(key => ({
    planName: key,
    ...BCBSDB[key]
  }));

  if (carrier.length == 3 && carrier.name.length != 0) {
    formComplete = true;
  } else {
    formComplete = false;
  }

  // If prefix exists, prefill data
  console.log(carrier.prefix.length, carrierMatch)
  if (carrier.prefix.length == 3 && !carrierMatch) {
    let prefix = carrier.prefix;
    let prefixMatch = carriers.find(carrier => carrier.prefixes.includes(prefix.toLowerCase()));

    if (prefixMatch) {
      prefixMatch.planName != undefined ? setCarrier(prevCarrier => ({ ...prevCarrier, name: prefixMatch.planName })) : null;
      prefixMatch.phone_numbers != undefined ? setCarrier(prevCarrier => ({ ...prevCarrier, phones: prefixMatch.phone_numbers }))  : null;
    }

    // setCarrierPhone(Object.keys(prefixMatch.phone_numbers));
    setCarrierMatch(true);
  }


  const handleCarrierPrefix = ({ target }) => {
    setCarrier(prevCarrier => ({
      ...prevCarrier,
      prefix: target.value 
    }));
    if (carrier.prefix.length < 3) {
      console.info("Cleared form since prefix was edited.")
      setCarrier(prevCarrier => ({
        ...prevCarrier,
        prefix: target.value 
      }));
      setCarrierMatch(false);
    }
  }

  const handleCarrierName = ({ target }) => {
    setCarrier(prevCarrier => ({
      ...prevCarrier,
      name: target.value
    }));
  }

  const handleCarrierPhone = (e, index) => {
    // Remove any non-numeric values from phone number input
    const result = e.target.value.replace(/\D/g, '');
  
    const newPhones = [...carrier.phones];
    newPhones[index] = result;

    setCarrier(prevCarrier => ({
      ...prevCarrier,
      phones: newPhones
    }));
  };

  const handleCarrierLinks = ({ target }) => {
    setCarrier({...carrier, Links: [...carrier.Links, target.value]});
  }

  // function AddCarrier(newCarrierData) {
  //   console.log(newCarrierData);
  //   let newPhoneNumber = [...carrierPhones];
  //   newPhoneNumber = newPhoneNumber.filter((number) => {
  //     return number != "";
  //   });
  //   setCarrierPhones(newPhoneNumber);
  // }

  return (
    <form autoComplete="off" /*action={AddCarrier}*/ className="add-carrier-form">
      <div>
        <div>
          <label htmlFor="carrierPrefix">Carrier prefix</label>
          <p>(ex. AAA, BBB, CCC, etc.)</p>
          <input type="text" value={carrier.prefix} name="carrierPrefix" onChange={handleCarrierPrefix} style={{textTransform: 'uppercase'}} maxLength={3} minLength={3} />
        </div>

        {carrier.prefix.length == 3 ?
          <>
            <div>
              <label htmlFor="carrierName">Carrier name</label>
              <p>(ex. Blue Cross Blue Shield of Texas)</p>
              <input type="text" value={carrier.name} name="carrierName" onChange={handleCarrierName} maxLength={40} />
            </div>
            <div>
              <label htmlFor="carrierPhone">Carrier phone number(s)</label>
              <p>All numeric. (ex. 1234567890)</p>
              {carrier.phones ? carrier.phones.map((phoneNumber, index) => <input type="text" key={index} value={carrier.phones[index]} name="carrierPhone" onChange={(event) => handleCarrierPhone(event, index)} maxLength={10} />) : null}
            </div>
            <input type='button' defaultValue={"add number"} onClick={() => {
              setCarrier(prev => ({
                ...prev,
                phones: [...prev.phones, ""] // replace with the actual number or variable
              }));
            }} />
            <div>
            <label htmlFor="carrierLinks">Carrier Links</label>
            <input type="text" value={carrier.links} name="carrierLinks" onChange={handleCarrierLinks} />
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