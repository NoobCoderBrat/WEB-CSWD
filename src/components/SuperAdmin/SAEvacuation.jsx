import SASidebar from "./SASidebar";
import { useState, useEffect } from "react";
import supabase from "../supabaseClient";

const SAEvacuation = () => {
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
  const [selectedId, setselectedID] = useState('');
  const [brgyData, setBrgyData] = useState([]);

  const fetch_data = async () => {
    try {
      const { error, data } = await supabase.from("EvacuationCenter").select("*");
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

  const submitBarangay = async () => {
    const { data, error } = await supabase.from("Barangay").insert([
      {
      center_id : selectedId,
      name : brgy,
      },
    ]);
    if (error) {
      console.error("Error inserting data:", error);
      alert("Error inserting data");
    } else {
      console.log("Data inserted successfully:", data);
      window.location.reload();
    }
  };

  const fetch_barangay = async (center) => {
    try {
      const { error, data } = await supabase.from("Barangay").select("*")
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



  const handlePhotoUpload = async (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    if (selectedFile) {
      try {
        const filePath = `${selectedFile.name}`;
        const { data, error } = await supabase.storage
          .from("Images")
          .upload(filePath, selectedFile);
        if (error) {
          throw error;
        }
        const { data: publicURL, error: urlError } = supabase.storage
          .from("Images")
          .getPublicUrl(filePath);
        if (urlError) {
          throw urlError;
        }
        console.log("Image URL:", publicURL.publicUrl);
        setImage(publicURL.publicUrl);
      } catch (error) {
        console.error("Error uploading image:", error);
        alert("Error uploading image: " + error.message);
      }
    }
  };

  const handleSubmit = async () => {
    const { data, error } = await supabase.from("EvacuationCenter").insert([
      {
       name,
       location,
       capacity,
       image,
       status : 'Open'
      },
    ]);
    if (error) {
      console.error("Error inserting data:", error);
      alert("Error inserting data");
    } else {
      console.log("Data inserted successfully:", data);
      window.location.reload();
    }
  };
  


  useEffect(() => {
    fetch_data();
  }, []);
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
                  | List of Evacuation Center
                </h1>
                <div className="space-x-2">
                  <button
                    className="bg-bttn text-white px-4 py-2 rounded-md hover:bg-bttn"
                    onClick={() => setShowCreateModal(true)}
                  >
                    Create Evacuation Center
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
                          {center.location}
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

            <div className="space-y-4">
              {/* Evacuation Center Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Evacuation Center Name
                </label>
                <input
                  type="text"
                  name="name"
                  onChange={(e) => setName(e.target.value)}
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
                    onChange={(e) => setLocation(e.target.value)}
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
                    onChange={(e) => setCapacity(e.target.value)}
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
                      image
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
                  onClick={handleSubmit}
                  className="btn bg-bttn text-white font-bold w-full hover:bg-bttn"
                >
                  Create Evacuation Center
                </button>
              </div>
            </div>
          </div>
        </div>
      )}



      {showBarangay && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-[500px] p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">EVACUATION CENTER</h2>
              <button
                onClick={closeBarangay}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">
            
              <div className="">
              <div className="mt-4">
                {brgyData.map((brgy, index) => (
                  <div
                    key={index}
                    className="p-3  rounded-md mb-2 flex items-center justify-between"
                  >
                    <span>{brgy.name}</span>
                  </div>
                ))}
              </div>
              </div>
              <hr />

              {/* Submit Button */}
                <div className="mt-6 flex items-center space-x-4">
            
                <input
                  type="text"
                  name="brgy"
                  onChange={(e) => setBrgy(e.target.value)}
                  className="input input-bordered flex-grow"
                  placeholder="Add Barangay"
                />
                <button
                  onClick={submitBarangay}
                  className="btn bg-bttn text-white font-bold hover:bg-bttn"
                >
                  Add Barangay
                </button>
              </div>

            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SAEvacuation;
