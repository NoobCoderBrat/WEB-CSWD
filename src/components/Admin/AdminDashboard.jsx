import AdminSidebar from "./AdminSidebar.jsx";
import AdminHeader from "./AdminHeader.jsx";
import { IoIosPeople } from "react-icons/io";
import {
  FaUsers,
  FaPaperPlane,
  FaCheckCircle,
  FaTimesCircle,
} from "react-icons/fa";

const AdminDashboard = () => {
  return (
    <>
      <div className="flex h-screen bg-gray-100 font-mono">
        <AdminSidebar />
        <div className="flex-1 flex flex-col">
          <AdminHeader />
          <main className="flex-1 p-6 overflow-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-8">
              {[
                {
                  title: "No. of Evacuatees",
                  count: 120,
                  icon: <FaUsers className="text-3xl" />,
                  bgColor: "bg-blue-500",
                },
                {
                  title: "Disaster Form Submitted",
                  count: 85,
                  icon: <FaPaperPlane className="text-3xl" />,
                  bgColor: "bg-green-500",
                },
                {
                  title: "Total No. of Verified Form",
                  count: "50",
                  icon: <FaCheckCircle className="text-3xl text-green-400" />,
                  bgColor: "bg-gray-400",
                },
                {
                  title: "Total No. of Non-Verified Form",
                  count: "20",
                  icon: <FaTimesCircle className="text-3xl text-red-400" />,
                  bgColor: "bg-gray-400",
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className={`${item.bgColor} rounded-lg shadow-lg p-4 lg:p-6 text-white`}
                >
                  <div className="flex justify-between items-center">
                    <h3 className="text-2xl lg:text-4xl font-bold">
                      {item.count}
                    </h3>
                    <span className="text-xl lg:text-2xl">{item.icon}</span>
                  </div>
                  <p className="text-xs lg:text-sm mt-2">{item.title}</p>
                </div>
              ))}
            </div>
            <div className="w-full bg-white rounded-lg shadow-xl border p-4 lg:p-6 mb-7">
              <div className="flex items-center mb-4">
                <span className="mr-2">
                  <IoIosPeople size={32} />
                </span>
                <h2 className="text-lg lg:text-xl font-bold tracking-wider">
                  Verified Disaster Assistant Form
                </h2>
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
                      <th>Remarks</th>
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
                      <td>
                        <button className="btn btn-outline btn-success btn-sm">
                          Verified
                        </button>
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

export default AdminDashboard;
