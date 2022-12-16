import React, { useState } from "react";
import InputControl from "./InputControl";
import { companyCode, currency, approver1, approver2 } from "../data/dropdown";
import Attachments from "./Attachments";


function Form() {
  const [formData, setFormData] = useState({});
  const [show, setShow] = useState(false);


  function handleChange(event) {
    setFormData((formData) => {
      return {
        ...formData,
        [event.target.name]: event.target.value,
      };
    });
  }

  const showData = (event) => {
    event.preventDefault();
    console.log(formData);
    console.log(event);
  };

  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  var yyyy = today.getFullYear();
  today = mm + '/' + dd + '/' + yyyy;

  return (
    <div className="control-pane">
      <div className="md:px-5 py-5 shadow-lg rounded-lg m-5">
        <form>
          <div>
            <div className=" flex text-sm">
              <button
                type="button"
                className="siemens-paterol py-1 px-5 mr-2 mb-3 rounded-sm text-white font-Montserrat-test shadow-sm hover:siemens-paterol-500"
              >
                Save
              </button>
              <button
                type="button"
                className="siemens-paterol py-1 px-5 mr-2 mb-3 rounded-sm text-white  font-Montserrat-test shadow-sm hover:bg-slate-400"
              >
                Cancel
              </button>
              <button
                type="button"
                className="siemens-paterol py-1 px-5 mr-2 mb-3 rounded-sm text-white font-Montserrat-test shadow-sm hover:bg-slate-400"
              >
                Submit
              </button>
              <button
                type="button"
                className="siemens-paterol py-1 px-5 mr-2 mb-3 rounded-sm text-white font-Montserrat-test shadow-sm hover:bg-slate-400"
                onClick={() => setShow(true)}
              >
                Attachments
              </button>
              <button
                type="button"
                className="siemens-paterol py-1 px-5 mb-3 rounded-sm text-white font-Montserrat-test shadow-sm hover:bg-slate-400"
              >
                Repost
              </button>
            </div>
            <h2 className="font-Montserrat-test text-lg font-bold mb-2 text-teal-600">
              Header
            </h2>
            <div className="grid gap-3 md:grid-cols-6 sm:grid-cols-2 max-2xl:grid-cols-1">
              <div className="material-textfield">
                <select
                  name="documentype"
                  id="documentype"
                  placeholder="Document Type"
                  defaultValue=""
                  onChange={handleChange}
                >
                  <option value="" disabled defaultValue>
                    SA
                  </option>
                  <option value="SA">SA</option>
                  <option value="AB">AB</option>
                </select>
                <label>Document Type</label>
              </div>
              <div className="material-textfield">
                <select
                  name="companycode"
                  id="companycode"
                  placeholder="Company Code"
                  defaultValue=""
                  onChange={handleChange}
                >
                  <option value="" disabled defaultValue>
                    ---SELECT---
                  </option>
                  {companyCode.map((item) => {
                    return (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    );
                  })}
                </select>
                <label>Company Code</label>
              </div>
              <InputControl
                name="postingdate"
                type="date"
                label="Posting Date"
                handleEvent={handleChange}
              />
              <InputControl
                name="period"
                type="text"
                label="Period"
                handleEvent={handleChange}
              />
              <InputControl
                name="documentdate"
                type="date"
                label="Document Date"
                handleEvent={handleChange}
              />
              <InputControl
                name="reference"
                type="text"
                label="Reference"
                handleEvent={handleChange}
              />
              <div className="material-textfield">
                <select
                  name="documentcurrency"
                  id="documentcurrency"
                  placeholder="Document Currency"
                  defaultValue=""
                  onChange={handleChange}
                >
                  <option value="" disabled defaultValue>
                    ---SELECT---
                  </option>
                  {currency.map((item) => {
                    return (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    );
                  })}
                </select>
                <label>Document Currency</label>
              </div>
              <InputControl
                name="calculatetax"
                type="text"
                label="Calculate Tax"
                handleEvent={handleChange}
              />
              <InputControl
                name="documentheadertext"
                type="text"
                label="Document Header Text"
                handleEvent={handleChange}
              />
              <InputControl
                name="ledgergroup"
                type="text"
                label="Ledeger Group"
                handleEvent={handleChange}
              />
              {/* <InputControl
                name="scheduledreversalindicator"
                type="text"
                label="Scheduled Reversal Indicator"
                handleEvent={handleChange}
              /> */}
              <InputControl
                name="reveseraldate"
                type="date"
                label="Reveseral Date"
                handleEvent={handleChange}
              />
              <InputControl
                name="reveseraldocno"
                type="text"
                label="Reversal Doc No"
                handleEvent={handleChange}
              />

              <InputControl
                name="standardjename"
                type="text"
                label="Standard JE Name(CFR)"
                handleEvent={handleChange}
              />
              <InputControl
                name="preparer"
                type="text"
                label="Preparer"
                handleEvent={handleChange}
              />
              <InputControl
                name="preparerdate"
                type="text"
                label="Preparer Date"
                handleEvent={handleChange}
                value={today}
              />
              <div className="material-textfield">
                <select
                  name="Approver 1"
                  id="approver1"
                  placeholder="Approver 1"
                  defaultValue=""
                  onChange={handleChange}
                >
                  <option value="" disabled defaultValue>
                    ---SELECT---
                  </option>
                  {approver1.map((item) => {
                    return (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    );
                  })}
                </select>
                <label>Approver 1</label>
              </div>

              <div className="material-textfield">
                <select
                  name="Approver 2"
                  id="approver2"
                  placeholder="Approver 2"
                  defaultValue=""
                  onChange={handleChange}
                >
                  <option value="" disabled defaultValue>
                    ---SELECT---
                  </option>
                  {approver2.map((item) => {
                    return (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    );
                  })}
                </select>
                <label>Approver 2</label>
              </div>

            </div>
          </div>
        </form>
      </div>

      <Attachments trigger={show} setTrigger={setShow} />
    </div>
  );
}

export default Form;
