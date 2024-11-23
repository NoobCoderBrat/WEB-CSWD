import React from "react";
import { IoNotificationsOutline } from "react-icons/io5";

const StudentNotif = ({ show, toggle }) => {
  const notifications = [
    { id: 1, message: "Sample Notification from SuperAdmin 1" },
    { id: 2, message: "Sample Notification from SuperAdmin 2" },
    { id: 3, message: "Sample Notification from SuperAdmin 3" },
  ];

  return (
    <div className="relative">
      <button className="p-2 hover:bg-gray-100 rounded-full" onClick={toggle}>
        <IoNotificationsOutline className="w-6 h-6 text-gray-600" />
      </button>
      {show && (
        <div className="absolute right-0 mt-2 w-64 bg-white rounded-md shadow-lg py-1 z-10 border p-3">
          {notifications.map((notification) => (
            <>
              <a
                key={notification.id}
                href="#"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                {notification.message}
              </a>
              <hr />
            </>
          ))}
        </div>
      )}
    </div>
  );
};

export default StudentNotif;
