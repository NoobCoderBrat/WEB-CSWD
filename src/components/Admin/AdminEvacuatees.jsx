import AdminSidebar from "./AdminSidebar.jsx";
import AdminHeader from "./AdminHeader.jsx";
import { IoIosPeople } from "react-icons/io";
import { FaFileExcel } from "react-icons/fa";

const AdminEvacuatees = () => {
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
                  <span className="mr-2">
                    <IoIosPeople size={32} />
                  </span>
                  <h2 className="text-lg lg:text-xl font-bold tracking-wider mt-1">
                    List of Evacuatees
                  </h2>
                </div>
                <div className="flex gap-3">
                  <select className="select select-bordered">
                    <option value="student">Student</option>
                    <option value="senior-citizen">Senior Citizen</option>
                    <option value="pwd">PWD</option>
                    <option value="4ps">4Ps Member</option>
                    <option value="pregnant">Pregnant</option>
                    <option value="indigenous">Indigenous Person</option>
                  </select>
                  <button className="btn btn-success text-white font-bold">
                    <FaFileExcel />
                    Export as Excel
                  </button>
                </div>
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
                      <th>Classification</th>{" "}
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
                    </tr>
                    <tr>
                      <th>2</th>
                      <td>Jane Doe</td>
                      <td>67</td>
                      <td>Female</td>
                      <td>Brgy. San Juan</td>
                      <td>Senior Citizen</td>
                    </tr>
                    <tr>
                      <th>3</th>
                      <td>Alice Reyes</td>
                      <td>29</td>
                      <td>Female</td>
                      <td>Brgy. Kalayaan</td>
                      <td>Pregnant</td>
                    </tr>
                  </tbody>
                </table>
                <hr />
                <div className="flex justify-end mt-5 me-10">
                  <p>Total No. of Evacuatees: 3</p>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default AdminEvacuatees;
