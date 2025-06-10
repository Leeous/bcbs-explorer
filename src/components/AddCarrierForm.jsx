import { useState, useEffect } from "react";
import BCBSDB from "../assets/bcbs_data.json";

const AddCarrierForm = () => {
  const [carrier, setCarrier] = useState({
    name: "",
    prefix: "",
    phones: [],
    links: [],
  });
  const [formErrors, setFormErrors] = useState({
    name: '',
    phones: '',
    prefix: '',
    links: ''
  });

  let formComplete = carrier.prefix.length == 3;

  const carriers = Object.keys(BCBSDB).map((key) => ({
    planName: key,
    ...BCBSDB[key],
  }));

  useEffect(() => {
    if (carrier.prefix.length === 3) {
      const prefix = carrier.prefix;
      const prefixMatch = carriers.find((carrier) =>
        carrier.prefixes.includes(prefix.toLowerCase())
      );

      const overrideData = JSON.parse(localStorage.getItem(`${prefix}-override`));
      
      setCarrier(prevCarrier => ({
        ...prevCarrier,
        name: overrideData?.name || prefixMatch?.planName || prevCarrier.name,
        phones: overrideData?.phones || prefixMatch?.phone_numbers || prevCarrier.phones,
        links: overrideData?.links || prefixMatch?.URLs || prevCarrier.links,
      }));
    }
  }, [carrier.prefix]);
  
  const handleCarrierPrefix = ({ target }) => {
    setCarrier((prevCarrier) => ({
      ...prevCarrier,
      prefix: target.value,
    }));

    if (target.value.length < 3) {
      console.info("Cleared form since prefix was edited.");
    setCarrier((prevCarrier) => ({
      ...prevCarrier,
      name: "",
      phones: [],
      links: []
    }));
      setFormErrors({name: "", prefix: "", phones: "", links: ""});
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

  const handleCarrierLinks = (e, index, field) => {
    const updatedLinks = carrier.links.map((link, i) =>
      i === index ? { ...link, [field]: e.target.value } : link
    );

    setCarrier({ ...carrier, links: updatedLinks });
  };

  const handleCarrierLinkRemove = (i) => {
    setCarrier((prevCarrier) => ({
      ...prevCarrier,
      links: prevCarrier.links.filter((_, index) => index !== i),
    }));
  };

  const handleAddLink = () => {
    setCarrier((prevCarrier) => ({
      ...prevCarrier,
      links: [
        ...prevCarrier.links,
        { link_text: "", link_url: "" }, // New empty link object
      ],
    }));
  };

  const submitForm = (event) => {
    event.preventDefault();

    setFormErrors({name: "", prefix: "", phones: "", links: ""});

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
    if (carrier.phones) {
      carrier.phones.forEach(element => {
        if (element.length < 10) {
          errors.phones = "Ensure all values are a full 10 digit number, and retry"
        }
      });
    }

    carrier.links.forEach(element => {
      if (element.link_text.length <= 1) {
        errors.links = "Check your links' text (left side values), and retry"
      }
      
      if (element.link_url.length <= 1) {
        errors.links = "Check your links' URLs (right side values), and retry."
      }
    });

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    let JSONReadyCarrier = {...carrier};
    // Remove keys if they're empty
    if (!JSONReadyCarrier.phones?.length) {
      delete JSONReadyCarrier.phones;
    }

    if (!JSONReadyCarrier.links?.length) {
      delete JSONReadyCarrier.links;
    }

    // Add carrier to localStorage
    localStorage.setItem(`${JSONReadyCarrier.prefix}-override`, JSON.stringify(JSONReadyCarrier));
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
              {formErrors.name && <p className="error">{formErrors.name}</p>}

            </div>
            {/* Phone numbers */}
            <div className="carrier-phone-list">
              <label htmlFor="carrierPhone">Carrier phone number(s)</label>
              <p>All numeric. (ex. 1234567890)</p>
              <div>
                {carrier.phones && carrier.phones.map((phoneNumber, index) => (
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
              {formErrors.phones && <p className="error">{formErrors.phones}</p>}
            </div>
            Links
            <div>
              <label htmlFor="carrierLinks">Carrier Links</label>
              <p>(ex. Text: &quot;Example&quot;, URL: &quot;https://example.com&quot;)</p>
              {carrier.links && carrier.links.map((URL, i) => (
                <div className="form-list-links" key={i}>
                  <input
                    type="text"
                    placeholder="Link Text"
                    value={URL.link_text}
                    onChange={(e) => handleCarrierLinks(e, i, "link_text")}
                    className="link-text"
                  />
                  <input
                    type="url"
                    placeholder="URL"
                    value={URL.link_url}
                    onChange={(e) => handleCarrierLinks(e, i, "link_url")}
                    className="link-url"
                  />
                  <button
                    type="button"
                    className="delete-element button-normal"
                    onClick={() => handleCarrierLinkRemove(i)}
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
        {formErrors.links && <p className="error">{formErrors.links}</p>}
      </div>

      {formComplete && (
        <input type="submit" className="button-normal" value="Submit" />
      )}
    </form>
  );
};

export default AddCarrierForm;
