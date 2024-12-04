import React, { useState } from "react";
import UserSidebar from "./UserSidebar";
import { LuSend } from "react-icons/lu";
import { IoMdPersonAdd } from "react-icons/io";
import { BsQrCode } from "react-icons/bs";
import { FaFileDownload } from "react-icons/fa";
import { IoArrowBackCircle } from "react-icons/io5";
import { NavLink } from "react-router-dom";
import supabase from "../supabaseClient";

const DAF = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [submitModalOpen, setSubmitModalOpen] = useState(false);

  const [surname, setSurname] = useState("");
  const [firstname, setFirstname] = useState("");
  const [middlename, setMiddlename] = useState("");
  const [age, setAge] = useState("");
  const [occupation, setOccupation] = useState("");
  const [income, setIncome] = useState("");
  const [dob, setDob] = useState("");
  const [sex, setSex] = useState("");
  const [disability, setDisability] = useState("");
  const [status, setStatus] = useState("");
  const [housing, setHousing] = useState("");

  const handleSubmit = () => {
    setModalOpen(true);
  };

  const handleFormSubmit = async () => {
      const { data, error } = await supabase
      .from("DAF")
      .insert([
      {
        surname,
        firstname,
        middlename,
        age,
        occupation,
        income,
        dob,
        sex,
        disability,
        status,
        housing
      },
    ])
    .select();
    if (error) {
      console.error("Error inserting data:", error);
      alert("Error inserting data");
    } else {
      setSubmitModalOpen(true);
      const id = data[0].id;
      sessionStorage.setItem('id', id);
     
    }
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleCloseSubmitModal = () => {
    setSubmitModalOpen(false);
  };

  return (
    <>
      <div className="h-screen bg-gray-100 font-mono lg:flex">
        <UserSidebar />
        <div className="flex-1 flex flex-col">
          <main className="flex-1 p-4 overflow-auto">
            <div className="w-full mx-auto bg-white rounded shadow-lg p-10 border border-blue-100">
              <div className="flex justify-start">
                <h2 className="text-2xl font-semibold mb-6 italic flex gap-5">
                  <NavLink to="/">
                    <button className="mt-1">
                      <IoArrowBackCircle />
                    </button>
                  </NavLink>
                  Disaster Assistance Form
                </h2>
              </div>
              <hr />
              <div className="mb-6 mt-5">
                <h3 className="text-md font-bold italic text-gray-600 mb-4">
                  Head of the family
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div>
                    <label
                      htmlFor="surname"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Surname
                    </label>
                    <input
                      type="text"
                      id="surname"
                      className="input input-bordered w-full"
                      placeholder="Apelyido"
                      value={surname}
                      onChange={(e) => setSurname(e.target.value)}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="firstname"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      First name
                    </label>
                    <input
                      type="text"
                      id="firstname"
                      className="input input-bordered w-full"
                      placeholder="Pangalan"
                      value={firstname}
                      onChange={(e) => setFirstname(e.target.value)}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="middlename"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Middle name
                    </label>
                    <input
                      type="text"
                      id="middlename"
                      className="input input-bordered w-full"
                      placeholder="Middle initial"
                      value={middlename}
                      onChange={(e) => setMiddlename(e.target.value)}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div>
                    <label
                      htmlFor="age"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Age
                    </label>
                    <input
                      type="text"
                      id="age"
                      className="input input-bordered w-full"
                      placeholder="Edad"
                      value={age}
                      onChange={(e) => setAge(e.target.value)}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="occupation"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Occupation
                    </label>
                    <input
                      type="text"
                      id="occupation"
                      className="input input-bordered w-full"
                      placeholder="Trabaho"
                      value={occupation}
                      onChange={(e) => setOccupation(e.target.value)}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="income"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Monthly net income
                    </label>
                    <input
                      type="text"
                      id="income"
                      className="input input-bordered w-full"
                      placeholder="Bulanang kinatibuk-ang kita"
                      value={income}
                      onChange={(e) => setIncome(e.target.value)}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div>
                    <label
                      htmlFor="dob"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Date of birth
                    </label>
                    <input
                      type="date"
                      id="dob"
                      className="input input-bordered w-full"
                      value={dob}
                      onChange={(e) => setDob(e.target.value)}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="sex"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Sex
                    </label>
                    <select
                      className="select select-bordered w-full max-w-xs"
                      value={sex}
                      onChange={(e) => setSex(e.target.value)}
                    >
                      <option>Male</option>
                      <option>Female</option>
                    </select>
                  </div>
                  <div>
                    <label
                      htmlFor="disability"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      If you have disability
                    </label>
                    <input
                      type="text"
                      id="disability"
                      className="input input-bordered w-full"
                      placeholder="What type of disability"
                      value={disability}
                      onChange={(e) => setDisability(e.target.value)}
                    />
                  </div>
                </div>
                <div className="mb-6">
                  <div className="flex flex-wrap gap-6">
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        className="form-radio text-blue-600"
                        name="status"
                        value="single"
                        checked={status === "single"}
                        onChange={(e) => setStatus(e.target.value)}
                      />
                      <span className="ml-2">Single Mom</span>
                    </label>
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        className="form-radio text-blue-600"
                        name="status"
                        value="4ps"
                        checked={status === "4ps"}
                        onChange={(e) => setStatus(e.target.value)}
                      />
                      <span className="ml-2">4p's Beneficiary</span>
                    </label>
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        className="form-radio text-blue-600"
                        name="status"
                        value="ip"
                        checked={status === "ip"}
                        onChange={(e) => setStatus(e.target.value)}
                      />
                      <span className="ml-2">
                        IP - Type of Ethnicity (Indigenous People)
                      </span>
                    </label>
                  </div>
                </div>
                <hr />
                <div className="space-y-4 mt-5 mb-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        className="form-radio text-blue-600"
                        name="housing"
                        value="owner"
                        checked={housing === "owner"}
                        onChange={(e) => setHousing(e.target.value)}
                      />
                      <span className="ml-2">House & lot owner</span>
                    </label>
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        className="form-radio text-blue-600"
                        name="housing"
                        value="renter"
                        checked={housing === "renter"}
                        onChange={(e) => setHousing(e.target.value)}
                      />
                      <span className="ml-2">House/room & lot renter</span>
                    </label>
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        className="form-radio text-blue-600"
                        name="housing"
                        value="informal"
                        checked={housing === "informal"}
                        onChange={(e) => setHousing(e.target.value)}
                      />
                      <span className="ml-2">Informal settler</span>
                    </label>
                  </div>
                </div>
                <hr />
                <div className="flex justify-center mt-10 gap-3">
                  <button
                    className="w-1/4 px-4 py-2 bg-success text-white btn font-bold hover:bg-success"
                    onClick={handleFormSubmit}
                  >
                    <LuSend />
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>

      {/* Modal for QR Code */}
      {modalOpen && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-500 bg-opacity-75 z-50 font-mono">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/4">
            <div className="flex justify-center mb-10 text-txt">
              <BsQrCode size={300} />
            </div>
            <hr />
            <br />
            <button className="flex w-full bg-bttn text-white btn justify-center items-center font-bold hover:bg-bttn">
              <FaFileDownload size={20} />
              Download
            </button>
            <button
              className="flex btn btn-error text-white font-bold w-full mt-2"
              onClick={handleCloseModal}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Modal for Submit Button */}
      {submitModalOpen && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-500 bg-opacity-75 z-50 font-mono">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/4 text-center">
            <h2 className="text-2xl font-bold text-green-600 mb-4">
              Successfully Submitted!
            </h2>
            <p className="text-md mb-6">
              Your Disaster Assistance Form has been successfully submitted.
            </p>
            <div className="space-y-2">
              <NavLink to="/familymembers">
                <button className="w-full btn bg-bttn font-bold text-white hover:bg-bttn">
                  <IoMdPersonAdd size={18} />
                  Family Members
                </button>
              </NavLink>
              <button
                className="w-full btn btn-error font-bold text-white"
                onClick={handleCloseSubmitModal}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DAF;
