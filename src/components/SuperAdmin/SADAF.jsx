import SASidebar from "./SASidebar";
import { useState, useEffect } from "react";
import supabase from "../supabaseClient";
import jsPDF from "jspdf";
import "jspdf-autotable";

const SADAF = () => {
  const [selectedBarangay, setSelectedBarangay] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [evacuees, setEvacuees] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [senior, setSenior] = useState("");
  const [pwd, setPWD] = useState("");
  const [student, setStudent] = useState("");
  const [ps, set4ps] = useState("");
  const [ip, setIp] = useState("");
  const [barangays, setBarangays] = useState([]);

  const stats = [
    {
      icon: "👴",
      label: "Senior Citizen",
      count: senior,
      textColor: "text-blue-600",
    },
    { icon: "♿", label: "PWD", count: pwd, textColor: "text-red-600" },
    {
      icon: "👨‍🎓",
      label: "Students",
      count: student,
      textColor: "text-blue-600",
    },
    { icon: "👥", label: "4Ps Member", count: ps, textColor: "text-blue-600" },
    {
      icon: "👤",
      label: "Indigenous People",
      count: ip,
      textColor: "text-blue-600",
    },
  ];

  const handleExportPDF = () => {
    if (evacuees.length === 0) {
      alert("No data available to export.");
      return;
    }

    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text(`Evacuees Report - ${selectedBarangay}`, 20, 20);

    const tableData = filteredData.map((evacuee) => [
      evacuee.id,
      evacuee.name,
      evacuee.evacuation_center,
      evacuee.date,
    ]);

    const tableColumnNames = ["No", "Name", "Evacuation Center", "Date"];

    doc.autoTable({
      head: [tableColumnNames],
      body: tableData,
      startY: 30,
      theme: "grid",
      headStyles: { fillColor: [22, 160, 133] },
    });

    doc.save("Evacuees_Report.pdf");
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

      const elder = data.filter((item) => parseInt(item.age) >= 60).length;
      setSenior(elder);

      const pwd = data.filter((item) => item.disability !== "N/A").length;
      setPWD(pwd);

      const student = data.filter(
        (item) => item.occupation === "Student"
      ).length;
      setStudent(student);

      const ps = data.filter((item) => item.status === "4ps").length;
      set4ps(ps);

      const ip = data.filter((item) => item.status === "ip").length;
      setIp(ip);
    } catch (error) {
      alert("An unexpected error occurred.");
      console.error("Error during fetching history:", error.message);
    }
  };

  const fetch_barangays = async () => {
    try {
      const { error, data } = await supabase.from("Barangay").select("name");
      if (error) throw error;
      setBarangays(data);
    } catch (error) {
      alert("Failed to fetch barangays.");
      console.error("Error fetching barangays:", error.message);
    }
  };

  useEffect(() => {
    fetch_data();
    fetch_masterlist();
    fetch_barangays();
  }, []);

  const filteredData = evacuees.filter((user) => {
    const nameMatches =
      user.name && user.name.toLowerCase().includes(searchQuery.toLowerCase());
    const centerMatches = selectedBarangay
      ? user.barangay &&
        user.barangay.toLowerCase().includes(selectedBarangay.toLowerCase())
      : true;
    const dateMatches = selectedDate
      ? user.date && user.date === selectedDate
      : true;

    return nameMatches && centerMatches && dateMatches;
  });

  return (
    <div className="min-h-screen bg-gray-100 font-mono xl:flex">
      <SASidebar />
      <div className="flex-1 flex flex-col">
        <main className="flex-1 sm:p-6 overflow-auto">
          <div className="p-4 max-w-7xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 mb-6">
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

            {/* Filters and Export Section */}
            <div className="flex flex-wrap gap-4 mb-6 justify-end">
              <select
                value={selectedBarangay}
                onChange={(e) => setSelectedBarangay(e.target.value)}
                className="border rounded-md px-3 py-2 w-full sm:w-auto"
              >
                <option value="">Select Barangay</option>
                {barangays.map((barangay) => (
                  <option key={barangay.name} value={barangay.name}>
                    {barangay.name}
                  </option>
                ))}
              </select>

              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="border rounded-md px-3 py-2 w-full sm:w-auto"
              />

              <div className="relative w-full sm:w-auto">
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-full pl-4 pr-10 py-2 border rounded-md"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <button
                onClick={handleExportPDF}
                className="btn btn-success text-white font-bold w-full sm:w-auto"
              >
                <svg
                  className="w-5 h-5 mr-2"
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
                EXPORT AS PDF
              </button>
            </div>

            {/* Evacuee Table */}
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
                        Evacuation Center
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredData.length === 0 ? (
                      <tr>
                        <td
                          colSpan="4"
                          className="px-6 py-4 text-center text-gray-500"
                        >
                          No evacuees found
                        </td>
                      </tr>
                    ) : (
                      filteredData.map((evacuee) => (
                        <tr key={evacuee.id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {evacuee.id}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {evacuee.name}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {evacuee.evacuation_center}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {evacuee.date}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default SADAF;
