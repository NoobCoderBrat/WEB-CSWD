import React, { useState } from "react";
import UserSidebar from "./UserSidebar";

const EvacuationCenter = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCardClick = (center) => {
    // Open modal with the selected center's information
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const evacuationCenters = [
    {
      id: 1,
      name: "Agusan National High School",
      image: "https://via.placeholder.com/600x300",
      address: "A.D. Curato Street, Butuan City",
      status: "Available to Evacuate",
    },
    {
      id: 2,
      name: "Another Evacuation Center",
      image: "https://via.placeholder.com/600x300",
      address: "Another Address, Butuan City",
      status: "Unavailable to Evacuate",
    },
    // Add more centers here as needed
  ];

  return (
    <>
      <div className="h-screen bg-gray-100 font-mono lg:flex">
        <UserSidebar />
        <div className="flex-1 flex flex-col">
          <main className="flex-1 p-8 overflow-auto">
            <div className="flex flex-col sm:flex-row justify-between items-center mb-4 sm:mb-8 space-y-4 sm:space-y-0">
              <p className="text-gray-600 text-base sm:text-xl font-bold text-center sm:text-left w-full sm:w-auto">
                | Find your assigned Evacuation Center
              </p>
              <label className="input input-bordered flex items-center gap-2 w-full sm:w-1/3 max-w-md">
                <input
                  type="text"
                  className="grow"
                  placeholder="Search here. . ."
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="h-4 w-4 opacity-70"
                >
                  <path
                    fillRule="evenodd"
                    d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                    clipRule="evenodd"
                  />
                </svg>
              </label>
            </div>
            <hr />
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
                    <div className="flex items-center text-green-600">
                      {center.status === "Available to Evacuate" ? (
                        <>
                          <span className="w-2 h-2 bg-green-600 rounded-full mr-2"></span>
                          <p className="text-sm text-green-600 font-bold">
                            Available to Evacuate
                          </p>
                        </>
                      ) : (
                        <>
                          <span className="w-2 h-2 bg-red-600 rounded-full mr-2"></span>
                          <p className="text-sm text-red-600 font-bold">
                            Unavailable to Evacuate
                          </p>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </main>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50 px-4 sm:px-0">
          <div className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer w-full sm:w-2/3 md:w-1/2 lg:w-1/3 max-w-md">
            <img
              src="https://placehold.co/600x400"
              alt="Agusan National High School"
              className="w-full object-cover h-48 sm:h-56 md:h-64 lg:h-72"
            />
            <div className="p-4 w-full">
              <div className="flex justify-center space-x-2 mb-3">
                <p className="text-xs sm:text-sm tracking-widest font-bold">
                  Assigned Baranggays
                </p>
              </div>
              <hr />
              <div className="mb-5 mt-3 space-y-3 grid grid-cols-2">
                <div className="flex items-center space-x-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 h-4 sm:w-5 sm:h-5 text-red-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 2C8.13 2 5 5.13 5 8.5C5 11.42 7.35 14.23 9.97 16.46C10.69 17.2 11.84 18.01 12 18.19C12.16 18.01 13.31 17.2 14.03 16.46C16.65 14.23 19 11.42 19 8.5C19 5.13 15.87 2 12 2zM12 11C10.34 11 9 9.66 9 8.5C9 7.34 10.34 6 12 6C13.66 6 15 7.34 15 8.5C15 9.66 13.66 11 12 11z"
                    />
                  </svg>
                  <p className="text-xs sm:text-sm text-gray-600 font-bold">
                    Brgy. Masao
                  </p>
                </div>
              </div>
              <hr />
              <div className="flex justify-end">
                <button
                  className="btn w-full sm:w-1/2 md:w-1/3 bg-bttn hover:bg-bttn text-white font-bold tracking-wider btn-md mt-5"
                  onClick={handleCloseModal}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EvacuationCenter;
