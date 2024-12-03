import UserSidebar from "./UserSidebar";
import { IoWarning } from "react-icons/io5";
import { useState } from "react";

const EvacuationNotice = () => {
  const [notice, setNotice] = useState(true);

  return (
    <div className="min-h-screen bg-gray-100 font-mono xl:flex">
      <UserSidebar />
      <div className="flex-1 flex flex-col">
        <main className="flex-1 flex justify-center items-center p-4 sm:p-6 md:p-8 lg:p-10">
          {notice ? (
            <div className="w-full sm:w-3/4 md:w-2/3 lg:w-1/2 xl:w-2/3 bg-white shadow-lg border border-yellow-500 p-4 sm:p-5 md:p-6 rounded-lg">
              <div className="card-body">
                <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl mb-4 tracking-wide flex items-center gap-2 text-warning">
                  <IoWarning className="text-lg sm:text-xl md:text-2xl lg:text-3xl mt-1" />
                  Evacuation Notice
                </p>
                <p className="text-sm sm:text-base">
                  This is an official notice from your Local Government Unit.
                  Due to rising floodwaters, all residents in Brgy, Buhangin are
                  advised to evacuate immediately for your safety. Please
                  proceed to the designated evacuation center at A.D. Curato
                  Street, Butuan City. Stay safe and follow official updates.
                </p>
              </div>
            </div>
          ) : (
            <div className="flex flex-col justify-center items-center text-gray-500 italic text-center">
              <p>There's no notice as of the moment</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default EvacuationNotice;
