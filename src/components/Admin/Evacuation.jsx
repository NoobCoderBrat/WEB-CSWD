import AdminSidebar from "./AdminSidebar";
import { useState } from "react";

const Evacuation = () => {
  const [activeView, setActiveView] = useState("cards");
  const [selectedCenter, setSelectedCenter] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [createFormData, setCreateFormData] = useState({
    name: "",
    location: "",
    capacity: "",
    photo: null,
  });

  const evacuationCenters = [
    {
      id: 1,
      name: "Agusan National High School",
      address: "A.D. Curato Street, Butuan City",
      image: "https://placehold.co/600x400",
      status: "available to evacuate",
    },
    {
      id: 2,
      name: "Butuan Central Elementary School",
      address: "A.D. Curato Street, Butuan City",
      image: "https://placehold.co/600x400",
      status: "unavailable to evacuate",
    },
  ];

  const evacuees = [
    {
      id: 4,
      name: "Lizzel Pealanes",
      age: 22,
      sex: "Female",
      address: "Brgy. JP Rizal",
      familyMembers: 1,
      status: "IN",
    },
    {
      id: 3,
      name: "Daniel Padilla",
      age: 29,
      sex: "Male",
      address: "Brgy. Buhungin",
      familyMembers: 3,
      status: "IN",
    },
    {
      id: 2,
      name: "Keith Balentod",
      age: 22,
      sex: "Female",
      address: "Brgy. JP Rizal",
      familyMembers: 1,
      status: "IN",
    },
    {
      id: 1,
      name: "Mariles Suganod",
      age: 48,
      sex: "Female",
      address: "Brgy. Buhungin",
      familyMembers: 5,
      status: "IN",
    },
  ];

  const handleCardClick = (center) => {
    setSelectedCenter(center);
    if (center.status === "unavailable to evacuate") {
      setIsModalOpen(true);
    } else {
      setActiveView("table");
    }
  };

  const handleBackToCards = () => {
    setSelectedCenter(null);
    setActiveView("cards");
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleCreateSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    setShowCreateModal(false);
    setCreateFormData({ name: "", location: "", capacity: "", photo: null });
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

  return (
    <div className="min-h-screen bg-gray-100 font-mono xl:flex">
      <AdminSidebar />
      <div className="flex-1 flex flex-col">
        <main className="flex-1 p-4 sm:p-6 overflow-auto">
          <div className="bg-gray-100 p-6">
            <div className="max-w-7xl mx-auto">
              {/* Header */}
              <div className="flex justify-between items-center mb-6">
                <h1 className="text-xl font-semibold text-gray-800">
                  | List of Evacuation Center
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

              {/* Navigation */}
              {activeView === "table" && (
                <div className="mb-6 mt-8">
                  <div className="flex items-center space-x-2 text-sm text-blue-600">
                    <button onClick={handleBackToCards}>
                      Evacuation center
                    </button>
                    <span>/</span>
                    <span className="text-gray-600">
                      {selectedCenter?.name}
                    </span>
                  </div>
                </div>
              )}

              {/* Cards View */}
              {activeView === "cards" && (
                <div className="grid md:grid-cols-2 gap-6 mt-8">
                  {evacuationCenters.map((center) => (
                    <div
                      key={center.id}
                      className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
                      onClick={() => handleCardClick(center)}
                    >
                      <img
                        src={center.image}
                        alt={center.name}
                        className="w-full h-48 object-cover"
                      />
                      <div className="p-4">
                        <h3 className="text-lg font-semibold mb-2">
                          {center.name}
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
                          {center.address}
                        </div>
                        <div
                          className={`flex items-center ${
                            center.status === "unavailable to evacuate"
                              ? "text-red-600"
                              : "text-green-600"
                          }`}
                        >
                          <span
                            className={`w-2 h-2 ${
                              center.status === "unavailable to evacuate"
                                ? "bg-red-600"
                                : "bg-green-600"
                            } rounded-full mr-2`}
                          ></span>
                          {center.status}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Table View */}
              {activeView === "table" && (
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                  <div className="p-4 border-b flex justify-end">
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Search..."
                        className="w-full pl-4 pr-10 py-2 border rounded-md"
                      />
                      <button className="absolute right-2 top-1/2 -translate-y-1/2">
                        <svg
                          className="w-6 h-6 text-black"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            No
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Name
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Age
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Sex
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Address
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            No. Family member
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Remark
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {evacuees.map((evacuee) => (
                          <tr key={evacuee.id}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {evacuee.id}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {evacuee.name}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {evacuee.age}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {evacuee.sex}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {evacuee.address}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {evacuee.familyMembers}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className="px-2 py-1 text-xs font-semibold text-blue-600 bg-blue-100 rounded-full">
                                {evacuee.status}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              <button className="btn btn-error btn-sm text-white font-bold">
                                Reject
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
          onClick={closeModal}
        >
          <div
            className="bg-white p-6 rounded-lg shadow-xl w-96"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl font-semibold text-red-600">Error</h2>
            <p className="mt-4 text-gray-600">
              This evacuation center is unavailable for evacuation.
            </p>
            <div className="mt-4 text-right">
              <button
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                onClick={closeModal}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Create Evacuation Center Modal */}
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
              {/* Evacuation Center Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Evacuation Center Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={createFormData.name}
                  onChange={handleInputChange}
                  className="input input-bordered w-full"
                  placeholder="Butuan Central Elementary School"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                {/* Location */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Location
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={createFormData.location}
                    onChange={handleInputChange}
                    className="input input-bordered w-full"
                    placeholder="A.D Curato Street, Butuan City"
                  />
                </div>

                {/* Capacity */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Capacity
                  </label>
                  <input
                    type="number"
                    name="capacity"
                    value={createFormData.capacity}
                    onChange={handleInputChange}
                    className="input input-bordered w-full"
                    placeholder="1,200"
                  />
                </div>
              </div>

              {/* Photo */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Photo
                </label>
                <div className="mt-1 flex items-center">
                  <input
                    type="text"
                    value={
                      createFormData.photo ? createFormData.photo.name : ""
                    }
                    readOnly
                    className="input input-bordered w-full"
                    placeholder="No file selected"
                  />
                  <label className="btn bg-bttn text-white font-bold ml-2 cursor-pointer hover:bg-bttn">
                    <span>Upload Photo</span>
                    <input
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={handlePhotoUpload}
                    />
                  </label>
                </div>
              </div>
              <hr />

              {/* Submit Button */}
              <div className="mt-6">
                <button
                  type="submit"
                  className="btn bg-bttn text-white font-bold w-full hover:bg-bttn"
                >
                  Create Evacuation Center
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Evacuation;
