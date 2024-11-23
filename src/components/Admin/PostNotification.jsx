import { useState } from "react";
import AdminSidebar from "./AdminSidebar.jsx";
import AdminHeader from "./AdminHeader.jsx";

const PostNotification = () => {
  const [notifications, setNotifications] = useState([]);
  const [newNotification, setNewNotification] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddNotification = () => {
    if (newNotification.trim() !== "") {
      const newNotificationObj = {
        id: Date.now(),
        text: newNotification,
      };
      setNotifications([newNotificationObj, ...notifications]);
      setNewNotification("");
      setIsModalOpen(false);
    }
  };

  const handleDeleteNotification = (id) => {
    const updatedNotifications = notifications.filter(
      (notification) => notification.id !== id
    );
    setNotifications(updatedNotifications);
  };

  return (
    <>
      <div className="flex h-screen bg-gray-100 font-mono">
        <AdminSidebar />
        <div className="flex-1 flex flex-col">
          <AdminHeader />
          <main className="flex-1 p-6 overflow-auto">
            <div className="space-y-8">
              <div className="bg-white p-6 rounded-md shadow-md w-full">
                <div className="mb-6">
                  <div className="flex justify-between">
                    <h3 className="text-xl font-semibold text-gray-700">
                      Posted Notifications
                    </h3>
                    <div>
                      <button
                        className="bg-blue-500 text-white px-5 py-2 rounded-md hover:bg-blue-600"
                        onClick={() => setIsModalOpen(true)} // Open modal
                      >
                        Create Notification
                      </button>
                    </div>
                  </div>
                </div>
                <hr />

                {notifications.length === 0 ? (
                  <p className="text-center text-gray-500 py-6">
                    No notifications yet.
                  </p>
                ) : (
                  <div className="mt-6 space-y-4">
                    {notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className="flex justify-between items-center p-4 bg-gray-50 rounded-md shadow-sm"
                      >
                        <p className="text-gray-800">{notification.text}</p>
                        <button
                          className="text-red-500 hover:text-red-600"
                          onClick={() =>
                            handleDeleteNotification(notification.id)
                          }
                        >
                          Delete
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </main>
        </div>
      </div>

      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 font-mono"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="bg-white p-6 rounded-md shadow-md w-3/4 md:w-2/3 lg:w-1/2 xl:w-1/3"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">
              Create Notification
            </h2>
            <textarea
              className="w-full p-3 border-2 border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              rows="4"
              value={newNotification}
              onChange={(e) => setNewNotification(e.target.value)}
              placeholder="Enter notification text..."
            ></textarea>
            <input
              type="file"
              className="file-input file-input-bordered grow w-full"
            />
            <div className="mt-4 text-right">
              <button
                className="bg-blue-500 text-white px-5 py-2 rounded-md hover:bg-blue-600"
                onClick={handleAddNotification}
              >
                Post Notification
              </button>
              <button
                className="ml-2 bg-gray-300 text-gray-700 px-5 py-2 rounded-md hover:bg-gray-400"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PostNotification;
