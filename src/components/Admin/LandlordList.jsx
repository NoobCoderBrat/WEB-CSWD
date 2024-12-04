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

  // Fetch data from the LandLord table
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

  useEffect(() => {
    fetch_data(); // Fetch data on component mount
  }, []);

  // Handle deleting a record
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

  // Handle editing a record
  const handleEdit = (item) => {
    setEditingItem(item);
    setFormData({
      fullName: item.fullName,
      barangay: item.barangay,
      age: item.age,
      sex: item.sex,
    });
  };

  // Handle form submission for editing
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

  return (
    <div className="min-h-screen bg-gray-100 font-mono xl:flex">
      <AdminSidebar />
      <div className="flex-1 flex flex-col">
        <main className="flex-1 p-4 sm:p-6 overflow-auto">
          <div className="bg-gray-100 min-h-screen p-4">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="flex justify-end p-4 border-b gap-3">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search..."
                    className="w-full pl-4 pr-10 py-2 border rounded-md"
                  />
                </div>
              </div>
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
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default LandlordList;
