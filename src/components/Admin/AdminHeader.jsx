import { useState } from "react";
import AdminNotification from "./AdminNotification.jsx";

const AdminHeader = () => {
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <header className="bg-white shadow-md">
      <div className="flex items-center justify-end px-6 py-4 border">
        <div className="ms-5 flex items-center space-x-4">
          <AdminNotification
            show={showNotifications}
            toggle={() => setShowNotifications(!showNotifications)}
          />
          <div className="relative">
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full">
                  <img
                    alt="Tailwind CSS Navbar component"
                    src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
