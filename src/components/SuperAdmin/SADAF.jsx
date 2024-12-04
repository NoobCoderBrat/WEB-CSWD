import SASidebar from "./SASidebar";
import { useState, useEffect } from "react";
import supabase from "../supabaseClient";
import * as XLSX from "xlsx";
const SADAF = () => {
  const [selectedBarangay, setSelectedBarangay] = useState("Brgy. Buhangin");
  const [selectedDate, setSelectedDate] = useState("2024-06-05");
  const [evacuees, setEvacuees] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [senior, setSenior] = useState("");
  const [pwd, setPWD] = useState("");
  const [student, setStudent] = useState("");
  const [ps, set4ps] = useState("");
  const [ip, setIp] = useState("");
  
   

  const stats = [
    {
      icon: "👴",
      label: "Senior Citizen",
      count: senior,
      textColor: "text-blue-600",
    },
    { icon: "♿", label: "PWD", count: pwd, textColor: "text-red-600" },
    { icon: "👨‍🎓", label: "Students", count: student, textColor: "text-blue-600" },
    { icon: "👥", label: "4Ps Member", count: ps, textColor: "text-blue-600" },
    {
      icon: "👤",
      label: "Indigenous People",
      count: ip,
      textColor: "text-blue-600",
    },
  ];



  const handleExportExcel = () => {
    if (evacuees.length === 0) {
      alert("No data available to export.");
      return;
    }
  
    // Prepare the data for Excel
    const worksheetData = evacuees.map((evacuee) => ({
      No: evacuee.id,
      Name: evacuee.name,
      Sex: evacuee.sex,
      "Evacuation Center": evacuee.evacuation_center,
      Date: evacuee.date,
      "Time IN": evacuee.time_in,
      "Time OUT": evacuee.time_out,
    }));
  
    // Create a worksheet
    const worksheet = XLSX.utils.json_to_sheet(worksheetData);
  
    // Create a workbook and append the worksheet
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Evacuees");
  
    // Export to Excel
    XLSX.writeFile(workbook, "Evacuees.xlsx");
  };

  const fetch_data = async () => {
    try {
      const { error, data } = await supabase.from("Evacuees").select("*");
      if (error) throw error;
      setEvacuees(data); 
    } catch (error) {
      alert("An unexpected error occurred.");
      console.error("Error during fetching history:", error.message);
    }
  };

  const fetch_masterlist = async () => {
    try {
      const { error, data } = await supabase.from("DAF").select("*");
      if (error) throw error;

      const elder = data.filter(item => {
        const age = parseInt(item.age);
        return age >= 60;
      }).length;
      setSenior(elder);

      const pwd = data.filter(item => {return item.disability !== 'N/A' ;}).length;
      setPWD(pwd);
      const student = data.filter(item => {return item.occupation == 'Student' ;}).length;
      setStudent(student);
      const ps = data.filter(item => {return item.status == '4ps' ;}).length;
      set4ps(ps);
      const ip = data.filter(item => {return item.status == 'ip' ;}).length;
      setIp(ip);

    } catch (error) {
      alert("An unexpected error occurred.");
      console.error("Error during fetching history:", error.message);
    }
  };


  useEffect(() => {
    fetch_data(); 
    fetch_masterlist();
  }, []);

  const filteredData = evacuees.filter((user) =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );


  return (
    <>
      <div className="min-h-screen bg-gray-100 font-mono xl:flex">
        <SASidebar />
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
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
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
                          Date
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                         Time IN
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Time Out
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {filteredData.map((evacuee) => (
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
                            {evacuee.evacuation_center}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {evacuee.date}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {evacuee.time_in}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {evacuee.time_out}
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

export default SADAF;
