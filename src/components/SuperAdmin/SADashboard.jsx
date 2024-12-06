import SASidebar from "./SASidebar";
import React, { useState } from "react";
import { Line, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const SADashboard = () => {
  const [selectedMonth, setSelectedMonth] = useState("JUNE 2024");
  const [weeklyComparisonView, setWeeklyComparisonView] =
    useState("Weekly Comparison");
  const [familyComparisonView, setFamilyComparisonView] =
    useState("Weekly Comparison");
  const [evacueeDate, setEvacueeDate] = useState(new Date("2024-06-05"));
  const [dafFormsWeek, setDafFormsWeek] = useState(new Date("2024-06-03"));

  // Monthly comparison data
  const monthlyData = {
    labels: ["16/04", "17/04", "18/04", "19/04", "20/04", "21/04", "22/04"],
    datasets: [
      {
        label: "This month",
        data: [1000, 1050, 1000, 1100, 1200, 1100, 1050],
        borderColor: "rgb(59, 130, 246)",
        tension: 0.4,
      },
      {
        label: "Last month",
        data: [900, 950, 900, 950, 1000, 950, 900],
        borderColor: "rgb(147, 197, 253)",
        tension: 0.4,
      },
    ],
  };

  // Weekly comparison data
  const weeklyData = {
    labels: [
      "17 Sun",
      "18 Mon",
      "19 Tue",
      "20 Wed",
      "21 Thu",
      "22 Fri",
      "23 Sat",
    ],
    datasets: [
      {
        label: "This week",
        data: [150, 100, 75, 125, 125, 150, 125],
        backgroundColor: "rgb(16, 185, 129)",
      },
      {
        label: "Last week",
        data: [125, 75, 50, 100, 100, 125, 100],
        backgroundColor: "rgb(209, 213, 219)",
      },
    ],
  };

  // Family data
  const familyData = {
    labels: [
      "17 Sun",
      "18 Mon",
      "19 Tue",
      "20 Wed",
      "21 Thu",
      "22 Fri",
      "23 Sat",
    ],
    datasets: [
      {
        label: "This week",
        data: [200, 150, 100, 175, 175, 200, 175],
        backgroundColor: "rgb(16, 185, 129)",
      },
      {
        label: "Last week",
        data: [175, 125, 75, 150, 150, 175, 150],
        backgroundColor: "rgb(209, 213, 219)",
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  const handleDateChange = (date, setter) => {
    setter(new Date(date.getTime() + date.getTimezoneOffset() * 60000));
  };

  return (
    <>
      <div className="min-h-screen bg-gray-100 font-mono xl:flex">
        <div className="w-64 fixed top-0 left-0 h-full bg-white shadow-lg z-10">
          <SASidebar />
        </div>
        <div className="flex-1 flex flex-col ml-64 pl-6 pt-4">
          <main className="flex-1 overflow-auto">
            <div className="max-w-6xl mx-auto space-y-6 mb-5">
              {/* Monthly Comparison */}
              <div className="bg-white p-4 rounded-lg shadow">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-semibold">Monthly Comparison</h2>
                  <select
                    className="border rounded px-2 py-1 text-sm"
                    value={selectedMonth}
                    onChange={(e) => setSelectedMonth(e.target.value)}
                  >
                    <option>JUNE 2024</option>
                    <option>JULY 2024</option>
                    <option>AUGUST 2024</option>
                  </select>
                </div>
                <Line data={monthlyData} options={chartOptions} />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {/* Weekly Comparison */}
                <div className="bg-white p-4 rounded-lg shadow">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold">
                      Number of Individuals Who Evacuated
                    </h2>
                    <select
                      className="border rounded px-2 py-1 text-sm"
                      value={weeklyComparisonView}
                      onChange={(e) => setWeeklyComparisonView(e.target.value)}
                    >
                      <option>Weekly Comparison</option>
                      <option>Monthly Comparison</option>
                      <option>Yearly Comparison</option>
                    </select>
                  </div>
                  <Bar data={weeklyData} options={chartOptions} />
                </div>

                {/* Total Evacuees Card */}
                <div className="bg-white p-4 rounded-lg shadow flex flex-col items-center justify-center">
                  <h2 className="text-6xl font-bold text-blue-900">43</h2>
                  <p className="text-gray-600 mt-2">Total Number of Evacuees</p>
                  <div className="flex items-center mt-4">
                    <button
                      className="px-2"
                      onClick={() =>
                        handleDateChange(
                          new Date(
                            evacueeDate.setDate(evacueeDate.getDate() - 1)
                          ),
                          setEvacueeDate
                        )
                      }
                    >
                      ←
                    </button>
                    <p className="mx-4 text-sm">
                      {evacueeDate.toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                    <button
                      className="px-2"
                      onClick={() =>
                        handleDateChange(
                          new Date(
                            evacueeDate.setDate(evacueeDate.getDate() + 1)
                          ),
                          setEvacueeDate
                        )
                      }
                    >
                      →
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default SADashboard;
