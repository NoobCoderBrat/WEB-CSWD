import UserSidebar from "./UserSidebar";
import { FiFileText } from "react-icons/fi";
import { NavLink } from "react-router-dom";

const Forms = () => {
  return (
    <div className="min-h-screen bg-gray-100 font-mono xl:flex">
      <UserSidebar />
      <div className="flex-1 flex flex-col">
        <main className="flex-1 p-4 sm:p-6 overflow-auto">
          <div className="hidden sm:block">
            <p className="text-gray-600 text-lg sm:text-xl font-bold mt-2 mb-5 p-4">
              | Gabay Forms
            </p>
            <hr />
          </div>
          <div className="flex flex-col sm:flex-row justify-center content-center gap-4 sm:gap-10 mt-6 sm:mt-10">
            <NavLink to="/daf" className="w-full sm:w-auto">
              <div className="card shadow-xl border cursor-pointer bg-white h-full">
                <div className="card-body text-center">
                  <div className="flex justify-center text-txt mb-3">
                    <FiFileText className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 lg:w-[150px] lg:h-[150px]" />
                  </div>
                  <p className="text-txt font-bold text-xl sm:text-2xl mb-2">
                    Disaster Assistance Form
                  </p>
                  <div className="flex justify-center">
                    <span className="text-sm sm:text-base">See Form</span>
                  </div>
                </div>
              </div>
            </NavLink>
            <NavLink to="/landlord" className="w-full sm:w-auto">
              <div className="card shadow-xl border cursor-pointer bg-white h-full">
                <div className="card-body text-center">
                  <div className="flex justify-center text-txt mb-3">
                    <FiFileText className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 lg:w-[150px] lg:h-[150px]" />
                  </div>
                  <p className="text-txt font-bold text-xl sm:text-2xl mb-2">
                    Landlords/Renter Form
                  </p>
                  <div className="flex justify-center">
                    <span className="text-sm sm:text-base">See Form</span>
                  </div>
                </div>
              </div>
            </NavLink>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Forms;
