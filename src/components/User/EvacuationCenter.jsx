import UserSidebar from "./UserSidebar";
import { useState, useEffect } from "react";
import supabase from "../supabaseClient";

const EvacuationCenter = () => {
  const [activeView, setActiveView] = useState("cards");
  const [selectedCenter, setSelectedCenter] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showBarangay, setShowBarangay] = useState(false);
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [capacity, setCapacity] = useState("");
  const [image, setImage] = useState("");
  const [status, setStatus] = useState("");
  const [file, setFile] = useState("");
  const [evacuationCenters, setEvacuationCenters] = useState([]);
  const [brgy, setBrgy] = useState("");
  const [selectedId, setselectedID] = useState("");
  const [brgyData, setBrgyData] = useState([]);

  const fetch_data = async () => {
    try {
      const { error, data } = await supabase
        .from("EvacuationCenter")
        .select("*");
      if (error) throw error;
      setEvacuationCenters(data);
    } catch (error) {
      alert("An unexpected error occurred.");
      console.error("Error during fetching history:", error.message);
    }
  };

  const handleCardClick = (center) => {
    fetch_barangay(center);
    setShowBarangay(true);
  };

  const fetch_barangay = async (center) => {
    try {
      const { error, data } = await supabase
        .from("Barangay")
        .select("*")
        .eq("center_id", center.id);
      if (error) throw error;
      setBrgyData(data);
    } catch (error) {
      alert("An unexpected error occurred.");
      console.error("Error during fetching history:", error.message);
    }
  };

  const handleBackToCards = () => {
    setSelectedCenter(null);
    setActiveView("cards");
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const closeBarangay = () => {
    window.location.reload();
  };

  useEffect(() => {
    fetch_data();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 font-mono xl:flex">
      <UserSidebar />
      <div className="flex-1 flex flex-col">
        <main className="flex-1 p-4 sm:p-6 overflow-auto">
          <div className="bg-gray-100 p-4 sm:p-6">
            <div className="max-w-7xl mx-auto">
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 sm:mb-6">
                <h1 className="text-lg sm:text-xl font-semibold text-gray-800">
                  | List of Evacuation Center
                </h1>
              </div>
              <hr />

              {/* Navigation */}
              {activeView === "table" && (
                <div className="mb-4 sm:mb-6 mt-4 sm:mt-8">
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
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mt-4 sm:mt-8">
                  {evacuationCenters.map((center) => (
                    <div
                      key={center.id}
                      className={`bg-white rounded-lg shadow-md overflow-hidden ${
                        center.status === "Closed"
                          ? "cursor-not-allowed"
                          : "cursor-pointer hover:shadow-lg transition-shadow"
                      }`}
                      onClick={
                        center.status !== "Closed"
                          ? () => handleCardClick(center)
                          : undefined
                      }
                    >
                      <img
                        src={center.image}
                        alt={center.name}
                        className="w-full h-40 sm:h-48 object-cover"
                      />
                      <div className="p-4">
                        <h3 className="text-base sm:text-lg font-semibold mb-2">
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
                          {center.location}
                        </div>
                        <div
                          className={`flex items-center ${
                            center.status === "Closed"
                              ? "text-red-600"
                              : "text-green-600"
                          }`}
                        >
                          <span
                            className={`w-2 h-2 ${
                              center.status === "Closed"
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
            className="bg-white p-6 rounded-lg shadow-xl w-11/12 max-w-md sm:w-96"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-lg sm:text-xl font-semibold text-red-600">
              Error
            </h2>
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
      {showBarangay && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-11/12 max-w-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg sm:text-xl font-bold">
                LIST OF BARANGAYS
              </h2>
              <button
                onClick={closeBarangay}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            <div className="space-y-4">
              {brgyData.map((brgy, index) => (
                <div
                  key={index}
                  className="p-3 bg-gray-100 rounded-md flex items-center justify-between"
                >
                  <span>{brgy.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EvacuationCenter;
