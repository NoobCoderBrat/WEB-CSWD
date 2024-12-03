import React, { useState } from "react";
import UserSidebar from "./UserSidebar";
import { BsQrCode } from "react-icons/bs";
import { IoArrowBackCircle } from "react-icons/io5";
import { NavLink } from "react-router-dom";
import { LuSend } from "react-icons/lu";
import { FaFileDownload } from "react-icons/fa";
import { IoMdPersonAdd } from "react-icons/io";

const Landlord = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [submitModalOpen, setSubmitModalOpen] = useState(false);

  const handleSubmit = () => {
    setModalOpen(true);
  };

  const handleFormSubmit = () => {
    setSubmitModalOpen(true);
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
              <div className="flex justify-between mb-6">
                <h2 className="text-2xl font-semibold italic flex gap-5 mt-1">
                  <NavLink to="/forms">
                    <button className="mt-1">
                      <IoArrowBackCircle />
                    </button>
                  </NavLink>
                  Landlord Information
                </h2>
              </div>
              <hr />
              <div className="mb-6 mt-5">
                <h3 className="text-md font-bold italic text-gray-600 mb-4">
                  Landlord's Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-7">
                  <div>
                    <label
                      htmlFor="surname"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="surname"
                      className="input input-bordered w-full"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="surname"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Baranggay
                    </label>
                    <input
                      type="text"
                      id="surname"
                      className="input input-bordered w-full"
                      placeholder="ex. Brgy. Lumbocan"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-7">
                  <div>
                    <label
                      htmlFor="surname"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Age
                    </label>
                    <input
                      type="number"
                      id="surname"
                      className="input input-bordered w-full"
                      placeholder="edad"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Sex
                    </label>
                    <select className="select select-bordered w-full">
                      <option>Male</option>
                      <option>Female</option>
                    </select>
                  </div>
                  <div>
                    <label
                      htmlFor="surname"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      /*Unknown*/
                    </label>
                    <input
                      type="text"
                      id="surname"
                      className="input input-bordered w-full"
                      placeholder="naa sa proto pero walay label awts gege"
                    />
                  </div>
                </div>
                <br />
                <hr />

                <div className="flex justify-end mt-10 gap-3">
                  <button
                    className="w-1/4 px-4 py-2 btn text-blue-500 border-blue-500 hover:text-white font-bold hover:bg-bttn"
                    onClick={handleSubmit}
                  >
                    Generate QR Code
                  </button>
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

            {/* Modal for Submit Button */}
            {submitModalOpen && (
              <div className="fixed inset-0 flex justify-center items-center bg-gray-500 bg-opacity-75 z-50 font-mono">
                <div className="bg-white p-6 rounded-lg shadow-lg w-1/4 text-center">
                  <h2 className="text-2xl font-bold text-green-600 mb-4">
                    Successfully Submitted!
                  </h2>
                  <p className="text-md mb-6">
                    Your Landlord Information form has been successfully
                    submitted.
                  </p>
                  <div className="space-y-2">
                    <NavLink to="/renters">
                      <button className="w-full btn bg-bttn font-bold text-white hover:bg-bttn">
                        <IoMdPersonAdd size={18} />
                        Renters/Boarders
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
          </main>
        </div>
      </div>
    </>
  );
};

export default Landlord;
