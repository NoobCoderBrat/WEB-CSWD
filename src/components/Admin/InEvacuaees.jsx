import AdminSidebar from "./AdminSidebar";
import { useState } from "react";

const INEvacuaees = () => {
  const [selectedBarangay, setSelectedBarangay] = useState("Brgy. Buhangin");
  const [selectedDate, setSelectedDate] = useState("2024-06-05");

  const stats = [
    {
      icon: "👴",
      label: "Senior Citizen",
      count: 26,
      textColor: "text-blue-600",
    },
    { icon: "♿", label: "PWD", count: 15, textColor: "text-red-600" },
    { icon: "👨‍🎓", label: "Students", count: 15, textColor: "text-blue-600" },
    { icon: "👥", label: "4Ps Member", count: 48, textColor: "text-blue-600" },
    {
      icon: "👤",
      label: "Indigenous People",
      count: 3,
      textColor: "text-blue-600",
    },
    { icon: "🤰", label: "Pregnant", count: 8, textColor: "text-blue-600" },
  ];

  const evacuees = [
    {
      id: 1,
      name: "Pepito Manaloto",
      sex: "Male",
      evacuationCenter: "Butuan Central Elementary School",
      submittedDate: "June 5, 2024",
      submittedTime: "9:45AM",
    },
  ];

  const handleExportExcel = () => {
    // Handle Excel export logic here
    console.log("Exporting to Excel...");
  };

  return (
    <>
      <div className="min-h-screen bg-gray-100 font-mono xl:flex">
        <AdminSidebar />
        <div className="flex-1 flex flex-col">
          <main className="flex-1 p-4 sm:p-6 overflow-auto">
            <div className="p-6 max-w-7xl mx-auto">
              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-4 mb-6">
                {stats.map((stat, index) => (
                  <div
                    key={index}
                    className="bg-white p-4 rounded-lg shadow-md flex items-center space-x-4"
                  >
                    <span className="text-2xl">{stat.icon}</span>
                    <div>
                      <span className={`text-2xl font-bold ${stat.textColor}`}>
                        {stat.count}
                      </span>
                      <p className="text-sm text-gray-600">{stat.label}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-between mt-10">
                {/* Filters */}
                <div className="flex flex-wrap gap-4 mb-6 justify-end">
                  <select
                    value={selectedBarangay}
                    onChange={(e) => setSelectedBarangay(e.target.value)}
                    className="border rounded-md px-3 py-2"
                  >
                    <option>Brgy. Buhangin</option>
                    <option>Other Barangays...</option>
                  </select>

                  <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="border rounded-md px-3 py-2"
                  />
                </div>
                {/* Export Button */}
                <div className="flex gap-3">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search..."
                      className="w-full pl-4 pr-10 py-2 border rounded-md"
                    />
                    <button className="absolute right-2 top-1/2 -translate-y-1/2">
                      <svg
                        className="w-6 h-6 text-black"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z"
                        />
                      </svg>
                    </button>
                  </div>
                  <button
                    onClick={handleExportExcel}
                    className="btn btn-success text-white font-bold"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                      />
                    </svg>
                    <span>EXPORT AS EXCEL</span>
                  </button>
                </div>
              </div>

              {/* Table */}
              <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          No
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Name
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Sex
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Evacuation Center
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Date/Time IN
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {evacuees.map((evacuee) => (
                        <tr key={evacuee.id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {evacuee.id}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {evacuee.name}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {evacuee.sex}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {evacuee.evacuationCenter}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {`${evacuee.submittedDate} ${evacuee.submittedTime}`}
                          </td>
                          <td>
                            <button className="btn btn-sm bg-txt hover:bg-txt text-white">
                              Out
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default INEvacuaees;
