import AdminSidebar from "./AdminSidebar.jsx";
import AdminHeader from "./AdminHeader.jsx";
import { IoIosPaper } from "react-icons/io";
import { useState } from "react";

const AssistanceForm = () => {
  const [isConfirmed, setIsConfirmed] = useState(false);

  const toggleConfirmStatus = () => {
    setIsConfirmed((prevState) => !prevState);
  };

  return (
    <>
      <div className="flex h-screen bg-gray-100 font-mono">
        <AdminSidebar />
        <div className="flex-1 flex flex-col">
          <AdminHeader />
          <main className="flex-1 p-6 overflow-auto">
            <div className="w-full bg-white rounded-lg shadow-xl border p-4 lg:p-6 mb-7">
              <div className="flex justify-between mb-4">
                <div className="flex">
                  <span className="mr-2 mt-1">
                    <IoIosPaper size={25} />
                  </span>
                  <h2 className="text-lg lg:text-xl font-bold tracking-wide mt-1">
                    List of Submitted Disaster Assistance Form
                  </h2>
                </div>
                <label className="input input-bordered flex items-center gap-2 w-1/3">
                  <input type="text" className="grow" placeholder="Search" />
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
              <div className="overflow-x-auto bg-white p-5 border rounded">
                <table className="table bg-white">
                  <thead className="bg-base-200">
                    <tr>
                      <th></th>
                      <th>Name</th>
                      <th>Age</th>
                      <th>Sex</th>
                      <th>Address</th>
                      <th>Classification</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th>1</th>
                      <td>Marion Jotohot</td>
                      <td>23</td>
                      <td>Male</td>
                      <td>Brgy. Lumbocan Butuan City</td>
                      <td>Student</td>
                      <td className="flex gap-3">
                        <button className="btn btn-sm btn-primary btn-outline text-white">
                          View
                        </button>

                        {!isConfirmed ? (
                          <button
                            onClick={toggleConfirmStatus}
                            className="btn btn-sm btn-primary text-white"
                          >
                            Confirm
                          </button>
                        ) : (
                          <button
                            onClick={toggleConfirmStatus}
                            className="btn btn-sm btn-success text-white"
                          >
                            Approved
                          </button>
                        )}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default AssistanceForm;
