import React, { useState } from "react";
import UserSidebar from "./UserSidebar";
import { NavLink } from "react-router-dom";
import { IoArrowBackCircle } from "react-icons/io5";
import { LuSend } from "react-icons/lu";
import { IoMdPersonAdd } from "react-icons/io";
import { IoMdClose } from "react-icons/io";
import supabase from "../supabaseClient";
import { useNavigate } from "react-router-dom";

const FamilyMembers = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const head_id = sessionStorage.getItem("id");
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [familyMembers, setFamilyMembers] = useState([
    {
      id: 1,
      fullname: "",
      relation: "",
      dob: "",
      age: "",
      sex: "",
      education: "",
      occupation: "",
      health: "",
      remarks: "",
    },
  ]);

  const addFamilyMember = () => {
    setFamilyMembers((prevMembers) => [
      ...prevMembers,
      {
        id: prevMembers.length + 1,
        fullname: "",
        relation: "",
        dob: "",
        age: "",
        sex: "",
        education: "",
        occupation: "",
        health: "",
        remarks: "",
      },
    ]);
  };

  const deleteFamilyMember = (id) => {
    setFamilyMembers((prevMembers) =>
      prevMembers.filter((member) => member.id !== id)
    );
  };

  const handleInputChange = (id, field, value) => {
    setFamilyMembers((prevMembers) =>
      prevMembers.map((member) =>
        member.id === id ? { ...member, [field]: value } : member
      )
    );
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const familyData = familyMembers.map(({ id, ...member }) => ({
        ...member,
        head_id,
      }));
  
      const { data, error } = await supabase
        .from("FamilyMembers")
        .insert(familyData);
  
      if (error) {
        throw new Error(error.message);
      }
  
      console.log("Successfully inserted Family Members:", data);
  
      setFamilyMembers([
        {
          fullname: "",
          relation: "",
          dob: "",
          age: "",
          sex: "",
          education: "",
          occupation: "",
          health: "",
          remarks: "",
        },
      ]);
  
      alert("YOU’VE SUCCESSFULLY SUBMITTED LIST OF YOUR FAMILY MEMBERS !");
      navigate("/");
      setShowModal(true);
    } catch (error) {
      console.error("Submission failed:", error);
      setModalMessage(`Error: ${error.message}`);
      setShowModal(true);
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="h-screen bg-gray-100 font-mono lg:flex">
      <UserSidebar />
      <div className="flex-1 flex flex-col">
        <main className="flex-1 p-4 overflow-auto">
          <div className="w-full mx-auto bg-white rounded shadow-lg p-6 md:p-10 border border-blue-100">
            <div className="flex flex-col md:flex-row justify-between mb-6">
              <h2 className="text-xl md:text-2xl font-semibold mt-1 mb-4 md:mb-0">
                <NavLink to="/daf">
                  <button className="mt-1">
                    <IoArrowBackCircle />
                  </button>
                </NavLink>
                List of Family Members
              </h2>
              <button
                className="btn bg-bttn text-white font-bold"
                onClick={addFamilyMember}
              >
                <IoMdPersonAdd />
                Add Family Member
              </button>
            </div>
            <hr />

            {familyMembers.map((member) => (
              <div key={member.id} className="mb-8 mt-5">
                <div className="flex justify-between items-center">
                  <div className="mb-4">
                    <h3 className="text-md font-bold text-gray-700 ">
                      Family #{member.id}
                    </h3>
                  </div>
                  <button
                    className="text-red-500 font-bold hover:text-red-700"
                    onClick={() => deleteFamilyMember(member.id)}
                    aria-label="Delete Family Member"
                  >
                    <IoMdClose size={20} />
                  </button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                  <div>
                    <label
                      htmlFor={`fullname-${member.id}`}
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Fullname
                    </label>
                    <input
                      type="text"
                      id={`fullname-${member.id}`}
                      value={member.fullname}
                      onChange={(e) =>
                        handleInputChange(member.id, "fullname", e.target.value)
                      }
                      className="input input-bordered w-full"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor={`relation-${member.id}`}
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Relation to the Family Head
                    </label>
                    <input
                      type="text"
                      id={`relation-${member.id}`}
                      value={member.relation}
                      onChange={(e) =>
                        handleInputChange(member.id, "relation", e.target.value)
                      }
                      className="input input-bordered w-full"
                      placeholder="e.g., Son"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor={`dob-${member.id}`}
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Date of Birth
                    </label>
                    <input
                      type="date"
                      id={`dob-${member.id}`}
                      value={member.dob}
                      onChange={(e) =>
                        handleInputChange(member.id, "dob", e.target.value)
                      }
                      className="input input-bordered w-full"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div>
                    <label
                      htmlFor={`age-${member.id}`}
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Age
                    </label>
                    <input
                      type="number"
                      id={`age-${member.id}`}
                      value={member.age}
                      onChange={(e) =>
                        handleInputChange(member.id, "age", e.target.value)
                      }
                      className="input input-bordered w-full"
                      placeholder="Age"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor={`sex-${member.id}`}
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Sex
                    </label>
                    <select
                      id={`sex-${member.id}`}
                      value={member.sex}
                      onChange={(e) =>
                        handleInputChange(member.id, "sex", e.target.value)
                      }
                      className="select select-bordered w-full"
                    >
                      <option value="">Select</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </select>
                  </div>
                  <div>
                    <label
                      htmlFor={`education-${member.id}`}
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Educational Level
                    </label>
                    <input
                      type="text"
                      id={`education-${member.id}`}
                      value={member.education}
                      onChange={(e) =>
                        handleInputChange(
                          member.id,
                          "education",
                          e.target.value
                        )
                      }
                      className="input input-bordered w-full"
                      placeholder="e.g., College Level"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor={`occupation-${member.id}`}
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Occupation
                    </label>
                    <input
                      type="text"
                      id={`occupation-${member.id}`}
                      value={member.occupation}
                      onChange={(e) =>
                        handleInputChange(
                          member.id,
                          "occupation",
                          e.target.value
                        )
                      }
                      className="input input-bordered w-full"
                      placeholder="e.g., Engineer"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                  <div>
                    <label
                      htmlFor={`health-${member.id}`}
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Health Status
                    </label>
                    <input
                      type="text"
                      id={`health-${member.id}`}
                      value={member.health}
                      onChange={(e) =>
                        handleInputChange(member.id, "health", e.target.value)
                      }
                      className="input input-bordered w-full"
                      placeholder="e.g., Healthy"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor={`remarks-${member.id}`}
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Remarks
                    </label>
                    <select
                      id={`remarks-${member.id}`}
                      value={member.remarks}
                      onChange={(e) =>
                        handleInputChange(member.id, "remarks", e.target.value)
                      }
                      className="select select-bordered w-full"
                    >
                      <option value="">Select</option>
                      <option value="Elderly">Elderly</option>
                      <option value="PWD">PWD</option>
                      <option value="with Children">With Children</option>
                      <option value="Pregnant">Pregnant</option>
                      <option value="Lactating Mother">Lactating Mother</option>
                    </select>
                  </div>
                </div>
                <hr />
              </div>
            ))}

            <div className="flex justify-end mt-10 gap-3">
              <button
                className={`w-full sm:w-1/4 text-white btn font-bold ${
                  isLoading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-success hover:bg-success"
                }`}
                onClick={handleSubmit}
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="w-6 h-6 border-4 border-t-4 border-gray-200 border-t-blue-600 rounded-full animate-spin"></div>
                ) : (
                  <>
                    <LuSend />
                    Submit
                  </>
                )}
              </button>
            </div>
          </div>
        </main>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded shadow-lg max-w-md w-full">
            <div className="text-center">
              <p className="text-lg font-semibold">{modalMessage}</p>
              <div className="mt-4">
                <button
                  onClick={() => setShowModal(false)} // Close the modal
                  className="btn bg-blue-500 text-white"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FamilyMembers;
