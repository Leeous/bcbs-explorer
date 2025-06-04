import { useState } from "react";
import BCBSDB from "../assets/bcbs_data.json";

const AddCarrierForm = () => {
  const [carrier, setCarrier] = useState({
    name: "",
    prefix: "",
    phones: [],
    links: {},
  });
  const [formErrors, setFormErrors] = useState({
    name: '',
    phones: '',
    prefix: '',
    links: ''
  });

  const [carrierMatch, setCarrierMatch] = useState(false);

  let formComplete = carrier.prefix.length !== 0;

  const carriers = Object.keys(BCBSDB).map((key) => ({
    planName: key,
    ...BCBSDB[key],
  }));

  // If prefix exists, prefill data
  if (carrier.prefix.length === 3 && !carrierMatch) {
    const prefix = carrier.prefix;
    const prefixMatch = carriers.find((carrier) =>
      carrier.prefixes.includes(prefix.toLowerCase())
    );

    if (prefixMatch) {
      setCarrierMatch(true);
      setCarrier((prevCarrier) => ({
        ...prevCarrier,
        name: prefixMatch.planName ?? prevCarrier.name,
        phones: prefixMatch.phone_numbers ?? prevCarrier.phones,
        links: prefixMatch.URLs ?? prevCarrier.links,
      }));
      console.log(carrier);
    }

    console.log(prefixMatch?.URLs, carrier);
  }

  const handleCarrierPrefix = ({ target }) => {
    setCarrier((prevCarrier) => ({
      ...prevCarrier,
      prefix: target.value,
    }));

    if (target.value.length < 3) {
      console.info("Cleared form since prefix was edited.");
      setCarrierMatch(false);
    }
  };

  const handleCarrierName = ({ target }) => {
    setCarrier((prevCarrier) => ({
      ...prevCarrier,
      name: target.value,
    }));
  };

  const handleCarrierPhone = (e, index) => {
    const result = e.target.value.replace(/\D/g, "");
    const newPhones = [...carrier.phones];
    newPhones[index] = result;

    setCarrier((prevCarrier) => ({
      ...prevCarrier,
      phones: newPhones,
    }));
  };

  const handleCarrierLinks = ({ e, key, value }) => {
    console.log(e, key, value);
    // setCarrier((prevCarrier) => ({
    //   ...prevCarrier,
    //   links: { ...prevCarrier.links, [target.value]: "" },
    // }));
  };

  const handleCarrierLinkRemove = (keyToRemove) => {
    setCarrier((prevCarrier) => {
      const updatedLinks = { ...prevCarrier.links };
      delete updatedLinks[keyToRemove];

      return {
        ...prevCarrier,
        links: updatedLinks,
      };
    });
  };

  const handleAddLink = () => {
    let index = Object.keys(carrier.links).length + 1;

    // Ensure the key is unique
    while (carrier.links[`New link ${index}`] !== undefined) {
      index++; // Increment until an unused key is found
    }

    setCarrier((prevCarrier) => ({
      ...prevCarrier,
      links: {
        ...prevCarrier.links,
        [`New link ${index}`]: "",
      },
    }));
  };

  const submitForm = (event) => {
    event.preventDefault();
    console.log(carrier)

    const errors = {};

    // Validate carrier name
    if (!carrier.name) {
      errors.name = "Carrier name is required";
    }

    // Validate prefix
    if (carrier.prefix.length !== 3) {
      errors.prefix = "Prefix must be three characters long";
    }

    // Validate phone numbers \\

    carrier.phones.forEach(element => {
      if (element.length < 10) {
        errors.phones = "Ensure all values are a full 10 digit number"
      }
    });

    Object.keys(carrier.links).forEach(element => {
      console.log(element.length)
      if (element.length <= 1) {
        errors.links = "Check your links' text (left side values)."
      }
    });    

    Object.values(carrier.links).forEach(element => {
      console.log(element.length)
      if (element.length <= 1) {
        errors.links = "Check your links' URLs (right side values)."
      }
    });
    

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      console.log(formErrors);
      return;
    }

  };

  return (
    <form autoComplete="off" onSubmit={submitForm} className="add-carrier-form">
      <div>
        <div>
          <label htmlFor="carrierPrefix">Carrier prefix</label>
          <p>(ex. AAA, BBB, CCC, etc.)</p>
          <input
            type="text"
            value={carrier.prefix}
            name="carrierPrefix"
            onChange={handleCarrierPrefix}
            style={{ textTransform: "uppercase" }}
            maxLength={3}
            minLength={3}
          />
        </div>

        {carrier.prefix.length === 3 && (
          <>
            {/* Name */}
            <div>
              <label htmlFor="carrierName">Carrier name</label>
              <p>(ex. Blue Cross Blue Shield of Texas)</p>
              <input
                type="text"
                value={carrier.name}
                name="carrierName"
                onChange={handleCarrierName}
                maxLength={40}
              />
            </div>
            {/* Phone numbers */}
            <div className="carrier-phone-list">
              <label htmlFor="carrierPhone">Carrier phone number(s)</label>
              <p>All numeric. (ex. 1234567890)</p>
              <div>
                {carrier.phones.map((phoneNumber, index) => (
                  <div className="form-list-phone-number" key={index}>
                    <input
                      type="text"
                      className="list-item"
                      value={phoneNumber}
                      name="carrierPhone"
                      onChange={(event) => handleCarrierPhone(event, index)}
                      maxLength={10}
                    />
                    <button
                      type="button"
                      className="delete-element button-normal"
                      onClick={() =>
                        setCarrier((prev) => ({
                          ...prev,
                          phones: prev.phones.filter((_, i) => i !== index),
                        }))
                      }
                    >
                      X
                    </button>
                  </div>
                ))}
              </div>
              {/* Add Phone Number */}
              <input
                type="button"
                className="button-normal"
                defaultValue="Add number"
                onClick={() =>
                  setCarrier((prev) => ({
                    ...prev,
                    phones: [...prev.phones, ""],
                  }))
                }
              />
            </div>
            {/* Links */}
            <div>
              <label htmlFor="carrierLinks">Carrier Links</label>
              <p>(ex. Text: "Example", URL: "https://example.com")</p>
              {Object.entries(carrier.links).map(([key, value]) => (
                <div className="form-list-links" key={key}>
                  <input
                    type="text"
                    placeholder="Link Text"
                    defaultValue={key}
                    onChange={(e) => handleCarrierLinks()}
                    className="link-text"
                    name="carrierLink"
                  />
                  <input
                    type="url"
                    placeholder="URL"
                    defaultValue={value}
                    onChange={(e) => handleCarrierLinks()}
                    className="link-url"
                    name="carrierLink"
                  />
                  <button
                    type="button"
                    className="delete-element button-normal"
                    onClick={() => handleCarrierLinkRemove(key)}
                  >
                    X
                  </button>
                </div>
              ))}
            </div>
            {/* Add Link */}
            <input
              type="button"
              className="button-normal"
              defaultValue="Add link"
              onClick={() => handleAddLink()}
            />
          </>
        )}
      </div>

      {formComplete && (
        <input type="submit" className="button-normal" value="Submit" />
      )}
    </form>
  );
};

export default AddCarrierForm;
