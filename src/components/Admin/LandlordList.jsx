import AdminSidebar from "./AdminSidebar";
import supabase from "../supabaseClient";
import { useState, useEffect } from "react";

const LandlordList = () => {
  const [data, setData] = useState([]);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({
    fullName: "",
    barangay: "",
    age: "",
    sex: "",
  });
  const [viewingRenters, setViewingRenters] = useState(null);
  const [landlordIdForRenters, setLandlordIdForRenters] = useState(null);
  const [renterModal, setRenterModal] = useState(false);
  const [fullname, setFullName] = useState("");
  const [sex, setSex] = useState("");
  const [rental_type, setRentalType] = useState("");
  const [selectedRenter, setSelectedRenter] = useState("");

  const fetch_data = async () => {
    try {
      const { data, error } = await supabase.from("LandLord").select("*");
      if (error) throw error;
      setData(data);
    } catch (error) {
      alert("An unexpected error occurred while fetching data.");
      console.error("Error:", error.message);
    }
  };

  const fetchRenters = async (landlordId) => {
    try {
      const { data, error } = await supabase
        .from("Renters")
        .select("*")
        .eq("landlord_id", landlordId);
      if (error) throw error;
      setViewingRenters(data);
    } catch (error) {
      alert("An unexpected error occurred while fetching renters data.");
      console.error("Error:", error.message);
    }
  };

  useEffect(() => {
    fetch_data();
  }, []);

  const handleDelete = async (id) => {
    try {
      const { error } = await supabase.from("LandLord").delete().eq("id", id);
      if (error) throw error;
      setData(data.filter((item) => item.id !== id));
      alert("Record deleted successfully.");
    } catch (error) {
      alert("An error occurred while deleting the record.");
      console.error("Error:", error.message);
    }
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setFormData({
      fullName: item.fullName,
      barangay: item.barangay,
      age: item.age,
      sex: item.sex,
    });
  };

  const editRenter = (renter) => {
    setSelectedRenter(renter);
    setFullName(renter.fullname || "");
    setSex(renter.sex || "");
    setRentalType(renter.rental_type || "");
    setRenterModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { error } = await supabase
        .from("LandLord")
        .update(formData)
        .eq("id", editingItem.id);
      if (error) throw error;
      setData(
        data.map((item) =>
          item.id === editingItem.id ? { ...item, ...formData } : item
        )
      );
      setEditingItem(null);
      alert("Record updated successfully.");
    } catch (error) {
      alert("An error occurred while updating the record.");
      console.error("Error:", error.message);
    }
  };

  const handleViewRenters = (landlordId) => {
    setLandlordIdForRenters(landlordId);
    fetchRenters(landlordId);
  };

  const handleUpdateRenter = async () => {
    try {
      const { error } = await supabase
        .from("Renters")
        .update({ fullname, rental_type, sex })
        .eq("id", selectedRenter.id);
      if (error) throw error;
      window.location.reload();
    } catch (error) {
      console.error("Error updating evacuation center:", error);
      alert("Error updating Data .");
    }
  };

  const handleDeleteRenter = async (id) => {
    try {
      const { error } = await supabase.from("Renters").delete().eq("id", id);
      if (error) throw error;
      window.location.reload();
    } catch (error) {
      console.error("Error deleting record:", error.message);
      alert("An error occurred while deleting the record.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 font-mono xl:flex">
      <AdminSidebar />
      <div className="flex-1 flex flex-col">
        <main className="flex-1 sm:p-6 overflow-auto">
          <div className="bg-gray-100 min-h-screen p-3">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="flex justify-between items-center mb-6 mt-5 p-4">
                <h1 className="text-xl font-semibold text-gray-800">
                  | List of Landlords
                </h1>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="py-2 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        No
                      </th>
                      <th className="py-2 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Full Name
                      </th>
                      <th className="py-2 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Barangay
                      </th>
                      <th className="py-2 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Age
                      </th>
                      <th className="py-2 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Sex
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
                        <td className="py-2 px-4 text-sm">{item.fullName}</td>
                        <td className="py-2 px-4 text-sm">{item.barangay}</td>
                        <td className="py-2 px-4 text-sm">{item.age}</td>
                        <td className="py-2 px-4 text-sm">{item.sex}</td>
                        <td className="py-2 px-4 text-sm">
                          <div className="flex flex-wrap justify-start gap-2">
                            <button
                              className="btn btn-sm bg-bttn hover:bg-bttn text-white w-auto sm:w-24"
                              onClick={() => handleEdit(item)}
                            >
                              Edit
                            </button>
                            <button
                              className="btn btn-sm btn-error text-white w-auto sm:w-24"
                              onClick={() => handleDelete(item.id)}
                            >
                              Delete
                            </button>
                            <button
                              className="btn btn-sm bg-blue-500 hover:bg-blue-600 text-white w-auto sm:w-24"
                              onClick={() => handleViewRenters(item.id)}
                            >
                              View Renters
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Edit Form Modal */}
              {editingItem && (
                <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
                  <div className="bg-white p-6 rounded-md shadow-lg w-full sm:w-96">
                    <h3 className="text-lg font-semibold">Edit Record</h3>
                    <form onSubmit={handleSubmit}>
                      <div className="grid grid-cols-1 gap-4">
                        {Object.keys(formData).map((key) => (
                          <div key={key}>
                            <label className="block capitalize">{key}</label>
                            <input
                              type="text"
                              value={formData[key]}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  [key]: e.target.value,
                                })
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

              {/* View Renters Modal */}
              {viewingRenters && (
                <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
                  <div className="bg-white p-6 rounded-md shadow-lg w-full sm:w-96">
                    <h3 className="text-lg font-semibold">Renters List</h3>
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="py-2 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Renter Name
                            </th>
                            <th className="py-2 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Renter Gender
                            </th>
                            <th className="py-2 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Actions
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {viewingRenters.map((renter, index) => (
                            <tr key={renter.id} className="border-b">
                              <td className="py-2 px-4 text-sm">
                                {renter.fullname}
                              </td>
                              <td className="py-2 px-4 text-sm">
                                {renter.sex}
                              </td>
                              <td>
                                <div className="flex space-x-4">
                                  <button
                                    className="text-bttn"
                                    onClick={() => editRenter(renter)}
                                  >
                                    Edit
                                  </button>
                                  <button
                                    className="text-error"
                                    onClick={() =>
                                      handleDeleteRenter(renter.id)
                                    }
                                  >
                                    Delete
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    <div className="mt-6 flex justify-end">
                      <button
                        onClick={() => setViewingRenters(null)}
                        className="bg-gray-500 text-white px-4 py-2 rounded"
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Renter Edit Modal */}
              {renterModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                  <div className="bg-white p-6 rounded-lg shadow-xl w-full sm:w-96">
                    <h2 className="text-xl font-semibold">
                      Edit Renter Details
                    </h2>
                    <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label>FullName</label>
                        <input
                          type="text"
                          value={fullname}
                          onChange={(e) => setFullName(e.target.value)}
                          className="w-full border p-2 rounded mt-2"
                        />
                      </div>
                      <div>
                        <label>Sex</label>
                        <input
                          type="text"
                          value={sex}
                          onChange={(e) => setSex(e.target.value)}
                          className="w-full border p-2 rounded mt-2"
                        />
                      </div>
                      <div>
                        <label>Rental Type</label>
                        <input
                          type="text"
                          value={rental_type}
                          onChange={(e) => setRentalType(e.target.value)}
                          className="w-full border p-2 rounded mt-2"
                        />
                      </div>
                    </div>
                    <div className="mt-4 flex justify-end gap-2">
                      <button
                        className="bg-gray-500 text-white px-4 py-2 rounded-md"
                        onClick={() => setRenterModal(false)}
                      >
                        Close
                      </button>
                      <button
                        className="bg-blue-500 text-white px-4 py-2 rounded-md"
                        onClick={handleUpdateRenter}
                      >
                        Update
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
  );
};

export default LandlordList;
