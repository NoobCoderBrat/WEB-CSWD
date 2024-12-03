import SASidebar from "./SASidebar";
import { useState } from "react";

const SAEvacuation = () => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [createFormData, setCreateFormData] = useState({
    name: "",
    location: "",
    capacity: "",
    photo: null,
    barangays: [],
  });

  const handleCreateSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    setShowCreateModal(false);
    setCreateFormData({
      name: "",
      location: "",
      capacity: "",
      photo: null,
      barangays: [],
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCreateFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    setCreateFormData((prev) => ({
      ...prev,
      photo: file,
    }));
  };

  const handleAddBarangay = () => {
    setCreateFormData((prev) => ({
      ...prev,
      barangays: [...prev.barangays, ""],
    }));
  };

  const handleBarangayChange = (index, value) => {
    const newBarangays = [...createFormData.barangays];
    newBarangays[index] = value;
    setCreateFormData((prev) => ({
      ...prev,
      barangays: newBarangays,
    }));
  };

  const handleRemoveBarangay = (index) => {
    setCreateFormData((prev) => ({
      ...prev,
      barangays: prev.barangays.filter((_, i) => i !== index),
    }));
  };

  return (
    <div className="min-h-screen bg-gray-100 font-mono xl:flex">
      <SASidebar />
      <div className="flex-1 flex flex-col">
        <main className="flex-1 p-4 sm:p-6 overflow-auto">
          <div className="bg-gray-100 p-6">
            <div className="max-w-7xl mx-auto">
              {/* Header */}
              <div className="flex justify-between items-center mb-6">
                <h1 className="text-xl font-semibold text-gray-800">
                  | List of Evacuation Centers
                </h1>
                <div className="space-x-2">
                  <button
                    className="bg-bttn text-white px-4 py-2 rounded-md hover:bg-bttn"
                    onClick={() => setShowCreateModal(true)}
                  >
                    Create Evacuation Center
                  </button>
                  <button className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600">
                    Delete
                  </button>
                </div>
              </div>
              <hr />

              {/* Simple View - Cards */}
              <div className="grid md:grid-cols-2 gap-6 mt-8">
                <div className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow">
                  <img
                    src="https://placehold.co/600x400"
                    alt="Evacuation Center"
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="text-lg font-semibold mb-2">
                      Agusan National High School
                    </h3>
                    <div className="flex items-center text-gray-600 mb-2">
                      <svg
                        className="w-4 h-4 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                      A.D. Curato Street, Butuan City
                    </div>
                    <div className="flex items-center text-green-600">
                      <span className="w-2 h-2 bg-green-600 rounded-full mr-2"></span>
                      available to evacuate
                    </div>
                  </div>
                </div>
                <div className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow">
                  <img
                    src="https://placehold.co/600x400"
                    alt="Evacuation Center"
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="text-lg font-semibold mb-2">
                      Butuan Central Elementary School
                    </h3>
                    <div className="flex items-center text-gray-600 mb-2">
                      <svg
                        className="w-4 h-4 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                      A.D. Curato Street, Butuan City
                    </div>
                    <div className="flex items-center text-red-600">
                      <span className="w-2 h-2 bg-red-600 rounded-full mr-2"></span>
                      unavailable to evacuate
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Updated Create Evacuation Center Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-[500px] p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">CREATE EVACUATION CENTER</h2>
              <button
                onClick={() => setShowCreateModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateSubmit} className="space-y-4">
              <div>
                <label className="block text-sm mb-1">
                  Evacuation Center Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={createFormData.name}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="Butuan Central Elementary School"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm mb-1">Location</label>
                  <input
                    type="text"
                    name="location"
                    value={createFormData.location}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    placeholder="A.D Curato Street, Butuan City"
                  />
                </div>

                <div>
                  <label className="block text-sm mb-1">Capacity</label>
                  <input
                    type="number"
                    name="capacity"
                    value={createFormData.capacity}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    placeholder="1,200"
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="block text-sm">List of Barangay</label>
                  <button
                    type="button"
                    onClick={handleAddBarangay}
                    className="text-blue-500 text-sm hover:text-blue-600"
                  >
                    + Add Barangay
                  </button>
                </div>
                <div className="space-y-2 mb-5">
                  {createFormData.barangays.map((barangay, index) => (
                    <div key={index} className="flex gap-2">
                      <input
                        type="text"
                        value={barangay}
                        onChange={(e) =>
                          handleBarangayChange(index, e.target.value)
                        }
                        className="w-full p-2 border border-gray-300 rounded-md"
                        placeholder={`Brgy. ${index + 1}`}
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveBarangay(index)}
                        className="text-red-500 hover:text-red-600"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              </div>
              <hr />

              <div>
                <label className="block text-sm mb-1">Photo</label>
                <input
                  type="file"
                  name="photo"
                  onChange={handlePhotoUpload}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  accept="image/*"
                />
                {createFormData.photo && (
                  <p className="mt-2 text-sm text-gray-600">
                    Selected: {createFormData.photo.name}
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="w-full p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 mt-6"
              >
                CREATE
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default SAEvacuation;
