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

  if (carrier.prefix.length != 0) {
    formComplete = true;
  } else {
    formComplete = false;
  }

  // If prefix exists, prefill data
  if (carrier.prefix.length == 3 && !carrierMatch) {
    let prefix = carrier.prefix;
    let prefixMatch = carriers.find(carrier => carrier.prefixes.includes(prefix.toLowerCase()));

    if (prefixMatch) {
      prefixMatch.planName != undefined ? setCarrier(prevCarrier => ({ ...prevCarrier, name: prefixMatch.planName })) : null;
      prefixMatch.phone_numbers != undefined ? setCarrier(prevCarrier => ({ ...prevCarrier, phones: prefixMatch.phone_numbers })) : null;
      prefixMatch.links != undefined ? setCarrier(prevCarrier => ({ ...prevCarrier, links: prefixMatch.URLs })) : null;
    }

    console.log(carrier)
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
    setCarrier({ ...carrier, Links: [...carrier.Links, target.value] });
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
          <input type="text" value={carrier.prefix} name="carrierPrefix" onChange={handleCarrierPrefix} style={{ textTransform: 'uppercase' }} maxLength={3} minLength={3} />
        </div>
        {carrier.prefix.length == 3 ?
          <>
            <div>
              <label htmlFor="carrierName">Carrier name</label>
              <p>(ex. Blue Cross Blue Shield of Texas)</p>
              <input type="text" value={carrier.name} name="carrierName" onChange={handleCarrierName} maxLength={40} />
            </div>
            <div className='carrier-phone-list'>
              <label htmlFor="carrierPhone">Carrier phone number(s)</label>
              <p>All numeric. (ex. 1234567890)</p>
              <div>
                {carrier.phones ? carrier.phones.map((phoneNumber, index) =>
                  <>
                    <div className='form-list-phone-numbers' key={index}>
                      <input type="text" className="list-item" value={carrier.phones[index]} name="carrierPhone" onChange={(event) => handleCarrierPhone(event, index)} maxLength={10} />
                      <button type='button' className='delete-element button-normal' onClick={() => {
                        setCarrier(prev => ({
                          ...prev,
                          phones: prev.phones.filter((_, i) => i !== index)
                        }))
                      }
                      }>X</button>
                    </div >
                  </>
                )
                  : null}
              </div>
              <input type='button' className='button-normal' defaultValue={"add number"} onClick={() => {
                setCarrier(prev => ({
                  ...prev,
                  phones: [...prev.phones, ""]
                }));
              }} />
            </div>
            <div>
              <label htmlFor="carrierLinks">Carrier Links</label>
              <p>(ex. Text: "Example", URL: "https://example.com")</p>
              {carrier.phones ?
                carrier.phones.map((phoneNumber, index) =>
                  <>
                    <div className='form-list-links' key={index}>
                      <input type="text" placeholder='Link Text' className='link-text' name="carrierLink" />
                      <input type="url" placeholder='URL' className='link-url' name="carrierLink" />
                      <button type='button' className='delete-element button-normal' onClick={() => {
                        // setCarrier(prev => ({
                        //   ...prev,
                        //   phones: prev.phones.filter((_, i) => i !== index)
                        // }))
                      }
                      }>X</button>
                    </div>
                  </>)

                : null}
            </div>
          </>
          : null}
      </div>
      {
        formComplete ?
          <input type="submit" className='button-normal' value="Submit" /> : null
      }
    </form >
  )
}

export default AddCarrierForm;