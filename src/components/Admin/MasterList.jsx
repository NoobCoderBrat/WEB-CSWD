import AdminSidebar from "./AdminSidebar";
import React, { useState, useEffect } from "react";
import supabase from "../supabaseClient";

const MasterList = () => {
  const [data, setData] = useState([]);
  const [editingItem, setEditingItem] = useState(null); // For handling the edit form
  const [formData, setFormData] = useState({
    surname: "",
    firstname: "",
    middlename: "",
    age: "",
    occupation: "",
    income: "",
    dob: "",
    sex: "",
  });
  const [viewingFamilyMember, setViewingFamilyMember] = useState(null); // For the family member modal
  const [familyMemberData, setFamilyMemberData] = useState([]); // To hold fetched family member data

  // Fetch data from the DAF table
  const fetch_data = async () => {
    try {
      const { error, data } = await supabase.from("DAF").select("*");
      if (error) throw error;
      setData(data); // Set the data to state
    } catch (error) {
      alert("An unexpected error occurred.");
      console.error("Error during fetching history:", error.message);
    }
  };

  useEffect(() => {
    fetch_data(); // Fetch data on component mount
  }, []);

  // Fetch family members based on the selected DAF row
  const fetchFamilyMembers = async (id) => {
    try {
      const { error, data } = await supabase
        .from("FamilyMembers")
        .select("*")
        .eq("head_id", id); // Assuming "daf_id" is the foreign key in the FamilyMembers table
      if (error) throw error;
      setFamilyMemberData(data); // Set the family member data to state
      setViewingFamilyMember(true); // Open the modal
    } catch (error) {
      console.error("Error fetching family members:", error.message);
      alert("An error occurred while fetching the family members.");
    }
  };

  // Handle deleting a record
  const handleDelete = async (id) => {
    try {
      const { error } = await supabase.from("DAF").delete().eq("id", id);
      if (error) throw error;
      setData(data.filter((item) => item.id !== id)); // Remove the deleted item from the state
      alert("Record deleted successfully.");
    } catch (error) {
      console.error("Error deleting record:", error.message);
      alert("An error occurred while deleting the record.");
    }
  };

  // Handle editing a record
  const handleEdit = (item) => {
    setEditingItem(item); // Set the item to be edited
    setFormData({
      surname: item.surname,
      firstname: item.firstname,
      middlename: item.middlename,
      age: item.age,
      occupation: item.occupation,
      income: item.income,
      dob: item.dob,
      sex: item.sex,
    });
  };

  // Handle form submission for editing
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { error } = await supabase
        .from("DAF")
        .update(formData)
        .eq("id", editingItem.id);
      if (error) throw error;
      setData(
        data.map((item) =>
          item.id === editingItem.id ? { ...item, ...formData } : item
        )
      ); // Update the state
      setEditingItem(null); // Close the editing form
      alert("Record updated successfully.");
    } catch (error) {
      console.error("Error updating record:", error.message);
      alert("An error occurred while updating the record.");
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gray-100 font-mono xl:flex">
        <AdminSidebar />
        <div className="flex-1 flex flex-col">
          <main className="flex-1 p-4 sm:p-6 overflow-auto">
            <div className="bg-gray-100 min-h-screen p-4">
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="flex justify-between items-center mb-6 mt-5 p-4">
                  <h1 className="text-xl font-semibold text-gray-800">
                    | MasterList of DAF
                  </h1>
                </div>
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="py-2 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        No
                      </th>
                      <th className="py-2 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Name
                      </th>
                      <th className="py-2 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Age
                      </th>
                      <th className="py-2 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((item, index) => (
                      <tr key={item.id} className="border-b">
                        <td className="py-2 px-4 text-sm">{index + 1}</td>
                        <td className="py-2 px-4 text-sm">
                          {item.firstname} {item.surname}
                        </td>
                        <td className="py-2 px-4 text-sm">{item.age}</td>
                        <td className="py-2 px-4 text-sm">
                          <div className="flex space-x-2">
                            <button
                              className="btn btn-sm bg-bttn hover:bg-bttn text-white"
                              onClick={() => handleEdit(item)}
                            >
                              Edit
                            </button>
                            <button
                              className="btn btn-sm btn-error text-white"
                              onClick={() => handleDelete(item.id)}
                            >
                              Delete
                            </button>
                            <button
                              className="btn btn-sm bg-blue-500 text-white"
                              onClick={() => fetchFamilyMembers(item.id)}
                            >
                              View Family
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {/* Edit Form Modal */}
                {editingItem && (
                  <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded-md shadow-lg w-96">
                      <h3 className="text-lg font-semibold">Edit Record</h3>
                      <form onSubmit={handleSubmit}>
                        <div className="grid grid-cols-2 gap-4">
                          {Object.keys(formData).map((key) => (
                            <div className="mt-4" key={key}>
                              <label className="block capitalize">{key}</label>
                              <input
                                type={key === "dob" ? "date" : "text"}
                                value={formData[key]}
                                onChange={(e) =>
                                  setFormData({ ...formData, [key]: e.target.value })
                                }
                                className="w-full mt-2 p-2 border border-gray-300 rounded"
                              />
                            </div>
                          ))}
                        </div>
                        <div className="mt-6 flex justify-end">
                          <button
                            type="submit"
                            className="bg-bttn text-white px-4 py-2 rounded"
                          >
                            Save Changes
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                )}

                {/* View Family Modal */}
                {viewingFamilyMember && (
                  <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded-md shadow-lg w-96">
                      <h3 className="text-lg font-semibold">Family Members</h3>
                      <ul>
                        {familyMemberData.map((member) => (
                          <li key={member.id} className="py-2">
                            {member.fullname} - {member.relation}
                          </li>
                        ))}
                      </ul>
                      <div className="mt-6 flex justify-end">
                        <button
                          className="bg-bttn text-white px-4 py-2 rounded"
                          onClick={() => setViewingFamilyMember(false)}
                        >
                          Close
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default MasterList;
