import React, { useState } from "react";

function Appointment() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    alert(`Form submited`);
  };

  return (
    <div className=" tw-w-full tw-h-[825px] tw-flex tw-items-center tw-justify-center">
      <div className="tw-w-[776px] tw-h-full tw-flex tw-text-center tw-flex-col tw-items-center">
        <div>
          <h3 className=" tw-text-5xl tw-font-bold tw-my-20 tw-color-[var(--Primary-black)]">
            Make Appointment
          </h3>
        </div>

        <div>
          <form
            action=""
            className="tw-justify-between tw-flex tw-flex-wrap  tw-gap-y-[50px]"
          >
            <div>
              <input
                type="text"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="tw-w-[372px] tw-h-[50px] tw-rounded-[10px] tw-pl-[20px] tw-bg-[#0000000d] "
                required
              />
            </div>
            <div>
              <input
                type="text"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="tw-w-[372px] tw-h-[50px] tw-rounded-[10px] tw-pl-[20px] tw-bg-[#0000000d]"
              />
            </div>
            <div>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="tw-w-[372px] tw-h-[50px] tw-rounded-[10px] tw-pl-[20px] tw-bg-[#0000000d]"
              />
            </div>
            <div>
              <input
                type="text"
                placeholder="Phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="tw-w-[372px] tw-h-[50px] tw-rounded-[10px] tw-pl-[20px] tw-bg-[#0000000d]"
              />
            </div>
            <div>
              <input
                type="date"
                placeholder="Appointment Date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="tw-w-[372px] tw-h-[50px] tw-rounded-[10px] tw-pl-[20px] tw-bg-[#0000000d]"
              />
            </div>
            <div>
              <input
                type="time"
                placeholder="Appointment Time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="tw-w-[372px] tw-h-[50px] tw-rounded-[10px] tw-pl-[20px] tw-bg-[#0000000d]"
              />
            </div>
            <div>
              <textarea
                name=""
                id=""
                cols="30"
                rows="10"
                className="tw-w-[776px] tw-h-[150px] tw-pl-[20px] tw-bg-[#0000000d] tw-rounded-[10px] tw-pt-7"
                placeholder="Describe what you’re looking for..."
              ></textarea>
            </div>
          </form>
        </div>
        {/* Form */}

        <div className="tw-w-[115px] tw-h-[67px] tw-bg-[#24BEE0] tw-rounded-[47px] tw-py-4 tw-px-8 tw-flex tw-items-center tw-justify-center tw-mt-12">
          <button type="button" className="tw-w-[51px] tw-h-9 ">
            <p className="tw-text-3xl tw-text-white tw-font-medium">Send</p>
          </button>
        </div>

        {/* button */}
      </div>
    </div>
  );
}

export default Appointment;
