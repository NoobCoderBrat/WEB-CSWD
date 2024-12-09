import SASidebar from "./SASidebar";
import { useState } from "react";

const SACenter = () => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedNotification, setSelectedNotification] = useState(null);
  const [notifications] = useState([
    {
      id: 1,
      header: "NOTICE TO EVACUATION",
      description:
        "This is an official notice from your Local Government Unit. Due to rising floodwaters, all residents in Brgy. Buhangin are advised to evacuate immediately for your safety. Please proceed to the designated evacuation center at A.D. Curato Street, Butuan City. Stay safe and follow official updates.",
      datePosted: "June 4, 2024",
    },
  ]);

  const [formData, setFormData] = useState({
    header: "",
    description: "",
    photo: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log(formData);
    setShowCreateModal(false);
    setFormData({ header: "", description: "", photo: null });
  };

  const handleDelete = (id) => {
    // Handle delete logic here
    console.log("Deleting notification:", id);
  };

  const handleView = (notification) => {
    setSelectedNotification(notification);
    setShowViewModal(true);
  };

  const truncateDescription = (text, maxLength = 50) => {
    if (text.length <= maxLength) return text;
    return text.substr(0, maxLength) + "...";
  };

  return (
    <>
      <div className="min-h-screen bg-gray-100 font-mono xl:flex">
        <SASidebar />
        <div className="flex-1 flex flex-col">
          <main className="flex-1 sm:p-6 overflow-auto">
            <div className="p-4">
              <div className="flex justify-between items-center mb-6">
                <div className="relative flex-1 max-w-md">
                  <input
                    type="text"
                    placeholder="Search..."
                    className="w-full px-4 py-2 border rounded-md"
                  />
                </div>
                <button
                  onClick={() => setShowCreateModal(true)}
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 ml-4"
                >
                  Create Notification
                </button>
              </div>

              {/* Table */}
              <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Header
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Description
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Date Posted
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {notifications.map((notification) => (
                        <tr key={notification.id}>
                          <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {notification.header}
                          </td>
                          <td className="px-4 py-4 text-sm text-gray-500">
                            {truncateDescription(notification.description)}
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                            {notification.datePosted}
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap text-sm space-x-2">
                            <button
                              onClick={() => handleView(notification)}
                              className="btn btn-sm bg-bttn hover:bg-bttn text-white font-bold"
                            >
                              View
                            </button>
                            <button
                              onClick={() => handleDelete(notification.id)}
                              className="btn btn-error btn-sm text-white"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Create Notification Modal */}
              {showCreateModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                  <div className="bg-white rounded-lg p-6 w-full max-w-md sm:max-w-lg">
                    <div className="flex justify-between items-center mb-6">
                      <h2 className="text-xl font-bold">CREATE NOTIFICATION</h2>
                      <button
                        onClick={() => setShowCreateModal(false)}
                        className="text-gray-500 hover:text-gray-700"
                      >
                        ✕
                      </button>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div>
                        <label className="block text-sm mb-1">Header</label>
                        <input
                          type="text"
                          name="header"
                          value={formData.header}
                          onChange={handleInputChange}
                          className="w-full p-2 border border-gray-300 rounded-md"
                          placeholder="header"
                        />
                      </div>

                      <div>
                        <label className="block text-sm mb-1">
                          Description
                        </label>
                        <textarea
                          name="description"
                          value={formData.description}
                          onChange={handleInputChange}
                          rows={6}
                          className="w-full p-2 border border-gray-300 rounded-md resize-none"
                          placeholder="description..."
                        />
                      </div>

                      <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 mt-6"
                      >
                        SAVE
                      </button>
                    </form>
                  </div>
                </div>
              )}

              {/* View Notification Modal */}
              {showViewModal && selectedNotification && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                  <div className="bg-white rounded-lg p-8 w-full max-w-md sm:max-w-lg border-2 border-yellow-400">
                    <div className="flex items-center space-x-2 text-yellow-500 mb-4">
                      <svg
                        className="w-8 h-8"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <h2 className="text-2xl font-bold text-yellow-500">
                        {selectedNotification.header}
                      </h2>
                    </div>
                    <p className="font-mono text-gray-800 whitespace-pre-line">
                      {selectedNotification.description}
                    </p>
                    <div className="mt-6 flex justify-end">
                      <button
                        onClick={() => setShowViewModal(false)}
                        className="btn btn-error text-white font-bold"
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default SACenter;
