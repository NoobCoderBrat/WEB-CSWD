import SASidebar from "./SASidebar";
import React, { useState, useEffect } from "react";
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

import supabase from "../supabaseClient";

const SADashboard = () => {
  const [selectedMonth, setSelectedMonth] = useState("JUNE 2024");
  const [weeklyComparisonView, setWeeklyComparisonView] =
    useState("Weekly Comparison");
  const [familyComparisonView, setFamilyComparisonView] =
    useState("Weekly Comparison");
  const [evacueeDate, setEvacueeDate] = useState(new Date("2024-06-05"));
  const [dafFormsWeek, setDafFormsWeek] = useState(new Date("2024-06-03"));

  useEffect(() => {
    const fetchMonthlyData = async () => {
      const currentDate = new Date();
      const currentMonth = currentDate.getMonth() + 1;
      const lastMonth = currentMonth === 1 ? 12 : currentMonth - 1;

      const currentYear = currentDate.getFullYear();
      const lastMonthYear = lastMonth === 12 ? currentYear - 1 : currentYear;

      const currentMonthStart = new Date(currentYear, currentMonth - 1, 1).toISOString().split('T')[0];
      const currentMonthEnd = new Date(currentYear, currentMonth, 0).toISOString().split('T')[0];

      const lastMonthStart = new Date(lastMonthYear, lastMonth - 1, 1).toISOString().split('T')[0];
      const lastMonthEnd = new Date(lastMonthYear, lastMonth, 0).toISOString().split('T')[0];


      const { data: currentMonthData, error: currentMonthError } = await supabase
        .from('Evacuees')
        .select('date')
        .gte('date', currentMonthStart)
        .lte('date', currentMonthEnd);

      const { data: lastMonthData, error: lastMonthError } = await supabase
        .from('Evacuees')
        .select('date')
        .gte('date', lastMonthStart)
        .lte('date', lastMonthEnd);

      if (currentMonthError || lastMonthError) {
        console.error('Error fetching data:', currentMonthError || lastMonthError);
        return;
      }


      const currentMonthCounts = Array(31).fill(0); 
      const lastMonthCounts = Array(31).fill(0);


      currentMonthData.forEach(record => {
        const day = new Date(record.date).getDate();
        currentMonthCounts[day - 1]++;
      });


      lastMonthData.forEach(record => {
        const day = new Date(record.date).getDate();
        lastMonthCounts[day - 1]++;
      });


      const newMonthlyData = {
        labels: Array.from({ length: 31 }, (_, i) => `${i + 1}/${currentMonth}`),
        datasets: [
          {
            label: "This month",
            data: currentMonthCounts.slice(0, currentDate.getDate()), 
            borderColor: "rgb(59, 130, 246)",
            tension: 0.4,
          },
          {
            label: "Last month",
            data: lastMonthCounts.slice(0, currentDate.getDate()), 
            borderColor: "rgb(147, 197, 253)",
            tension: 0.4,
          },
        ],
      };

      setMonthlyData(newMonthlyData); 
    };

    fetchMonthlyData();
  }, []);
  
  const [monthlyData, setMonthlyData] = useState({
    labels: [],
    datasets: [
      {
        label: "This month",
        data: [],
        borderColor: "rgb(59, 130, 246)",
        tension: 0.4,
      },
      {
        label: "Last month",
        data: [],
        borderColor: "rgb(147, 197, 253)",
        tension: 0.4,
      },
    ],
  });

  useEffect(() => {
    const fetchWeeklyData = async () => {

      const currentDate = new Date();
      const currentDay = currentDate.getDay(); 
  
      const startOfWeek = new Date(currentDate);
      startOfWeek.setDate(currentDate.getDate() - currentDay); 
  
      const startOfLastWeek = new Date(startOfWeek);
      startOfLastWeek.setDate(startOfWeek.getDate() - 7); 
  

      const endOfWeek = new Date(startOfWeek);
      endOfWeek.setDate(startOfWeek.getDate() + 6);
  

      const endOfLastWeek = new Date(startOfLastWeek);
      endOfLastWeek.setDate(startOfLastWeek.getDate() + 6); 
  

      const thisWeekStart = startOfWeek.toISOString().split('T')[0];
      const thisWeekEnd = endOfWeek.toISOString().split('T')[0];
      const lastWeekStart = startOfLastWeek.toISOString().split('T')[0];
      const lastWeekEnd = endOfLastWeek.toISOString().split('T')[0];
  

      const formatDate = (date) => {
        return `${date.getDate()} ${date.toLocaleString('en-US', { weekday: 'short' })}`;
      };
  
      const thisWeekLabels = [];
      const lastWeekLabels = [];

      for (let i = 0; i < 7; i++) {
        const date = new Date(startOfWeek);
        date.setDate(startOfWeek.getDate() + i);
        thisWeekLabels.push(formatDate(date));
      }
  

      for (let i = 0; i < 7; i++) {
        const date = new Date(startOfLastWeek);
        date.setDate(startOfLastWeek.getDate() + i);
        lastWeekLabels.push(formatDate(date));
      }
  

      const { data: thisWeekData, error: thisWeekError } = await supabase
        .from('Evacuees')
        .select('date')
        .gte('date', thisWeekStart)
        .lte('date', thisWeekEnd);
  
      const { data: lastWeekData, error: lastWeekError } = await supabase
        .from('Evacuees')
        .select('date')
        .gte('date', lastWeekStart)
        .lte('date', lastWeekEnd);
  
      if (thisWeekError || lastWeekError) {
        console.error('Error fetching data:', thisWeekError || lastWeekError);
        return;
      }
  

      const thisWeekCounts = Array(7).fill(0); 
      const lastWeekCounts = Array(7).fill(0);
  

      thisWeekData.forEach(record => {
        const dayOfWeek = new Date(record.date).getDay();
        thisWeekCounts[dayOfWeek]++;
      });

      lastWeekData.forEach(record => {
        const dayOfWeek = new Date(record.date).getDay();
        lastWeekCounts[dayOfWeek]++;
      });
  

      const newWeeklyData = {
        labels: thisWeekLabels, 
        datasets: [
          {
            label: "This week",
            data: thisWeekCounts,
            backgroundColor: "rgb(16, 185, 129)",
          },
          {
            label: "Last week",
            data: lastWeekCounts,
            backgroundColor: "rgb(209, 213, 219)",
          },
        ],
      };
  
      setWeeklyData(newWeeklyData);
    };
  
    fetchWeeklyData(); 
  }, []);
  

  const [weeklyData, setWeeklyData] = useState({
    labels: ["17 Sun", "18 Mon", "19 Tue", "20 Wed", "21 Thu", "22 Fri", "23 Sat"],
    datasets: [
      {
        label: "This week",
        data: [],
        backgroundColor: "rgb(16, 185, 129)",
      },
      {
        label: "Last week",
        data: [],
        backgroundColor: "rgb(209, 213, 219)",
      },
    ],
  });


  const [dafData, setDafData] = useState({
    labels: [], 
    datasets: [
      {
        label: "Submitted Forms",
        data: [0, 0, 0, 0, 0, 0, 0], 
        backgroundColor: "rgb(59, 130, 246)",
      },
    ],
  });

  useEffect(() => {
    const fetchDafData = async () => {

      const currentDate = new Date();
      const currentDay = currentDate.getDay(); 


      const startOfWeek = new Date(currentDate);
      startOfWeek.setDate(currentDate.getDate() - (currentDay === 0 ? 6 : currentDay - 1));

      const thisWeekStart = startOfWeek.toISOString();


      const weekLabels = [];
      for (let i = 0; i < 7; i++) {
        const day = new Date(startOfWeek);
        day.setDate(startOfWeek.getDate() + i);
        weekLabels.push(day.toLocaleDateString('en-US', { weekday: 'short' }));
      }


      const { data, error } = await supabase
        .from('DAF') 
        .select('created_at') 
        .gte('created_at', thisWeekStart); 

      if (error) {
        console.error('Error fetching DAF data:', error);
        return;
      }


      const dayCounts = [0, 0, 0, 0, 0, 0, 0]; 


      data.forEach((item) => {
        const createdDate = new Date(item.created_at);
        const dayOfWeek = createdDate.getDay(); 
        if (dayOfWeek === 0) {
          dayCounts[6] += 1; 
        } else {
          dayCounts[dayOfWeek - 1] += 1; 
        }
      });

  
      setDafData((prevData) => ({
        ...prevData,
        labels: weekLabels, 
        datasets: [
          {
            ...prevData.datasets[0],
            data: dayCounts, 
          },
        ],
      }));
    };

    fetchDafData();
  }, []);

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
                  </div>
                  <Bar data={weeklyData} options={chartOptions} />
                </div>


                <div className="bg-white p-4 rounded-lg shadow">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold">
                      Submitted DAF Forms
                    </h2>
                  </div>
                  <Bar data={dafData} options={chartOptions} height={200} />
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
