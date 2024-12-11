import UserSidebar from "./UserSidebar";
import { IoWarning } from "react-icons/io5";
import { useState, useEffect } from "react";
import supabase from "../supabaseClient";

const EvacuationNotice = () => {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch notices from the database
  useEffect(() => {
    const fetchNotices = async () => {
      const { data, error } = await supabase.from("Notifications").select("*");
      if (error) {
        console.error("Error fetching notices:", error.message);
      } else {
        setNotices(data);
      }
      setLoading(false);
    };

    fetchNotices();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 font-mono xl:flex">
      <UserSidebar />
      <div className="flex-1 flex flex-col">
        <main className="flex-1 flex justify-center items-center p-4 sm:p-6 md:p-8 lg:p-10">
          {loading ? (
            <p>Loading notices...</p>
          ) : notices.length === 0 ? (
            <div className="flex flex-col justify-center items-center text-gray-500 text-center">
              <p>There's no notice as of the moment</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {notices.map((notice) => (
                <div
                  key={notice.id}
                  className="bg-white shadow-lg border border-yellow-500 p-4 sm:p-5 md:p-6 rounded-lg"
                >
                  <div className="card-body">
                    <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl mb-4 tracking-wide flex items-center gap-2 text-warning">
                      <IoWarning className="text-lg sm:text-xl md:text-2xl lg:text-3xl mt-1" />
                      Evacuation Notice
                    </p>
                    <p className="text-sm sm:text-base">{notice.header}</p>
                    <p className="text-sm sm:text-base">{notice.description}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default EvacuationNotice;
