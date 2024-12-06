import SASidebar from "./SASidebar";
import { useState, useEffect } from "react";
import supabase from "../supabaseClient";

const AdminAccounts = () => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [fullname, setFullname] = useState("");
  const [position, setPosition] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [password, setPassword] = useState("");
  const [barangay, setBarangay] = useState("");
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState(""); // State for search query
  const [showPassword, setShowPassword] = useState(false); // State for show password

  const fetch_data = async () => {
    try {
      const { error, data } = await supabase.from("Admin").select("*");
      if (error) throw error;
      setUsers(data);
    } catch (error) {
      alert("An unexpected error occurred.");
      console.error("Error during fetching history:", error.message);
    }
  };

  const handleSubmit = async () => {
    const { data, error } = await supabase.from("Admin").insert([{
      fullname,
      position,
      email,
      number,
      password,
      barangay,
    }]);
    if (error) {
      console.error("Error inserting data:", error);
      alert("Error inserting data");
    } else {
      console.log("Data inserted successfully:", data);
      window.location.reload();
    }
  };

  useEffect(() => {
    fetch_data();
  }, []);

  // Filtered users based on search query
  const filteredUsers = users.filter((user) =>
    user.fullname.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <div className="min-h-screen bg-gray-100 font-mono xl:flex">
        <SASidebar />
        <div className="flex-1 flex flex-col">
          <main className="flex-1 p-4 sm:p-6 overflow-auto">
            <div className="p-4 border-b flex justify-end gap-3">
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
                className="bg-bttn text-white px-4 py-2 rounded-md hover:bg-bttn"
                onClick={() => setShowCreateModal(true)}
              >
                Create Account
              </button>
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
                        Number
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Email
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Barangay
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Barangay Position
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredUsers.map((user, index) => (
                      <tr key={user.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {index + 1}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {user.fullname}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {user.number}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {user.email}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {user.barangay}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {user.position}
                        </td>
                        <td>
                          <button className="btn btn-sm btn-error text-white font-bold">
                            delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </main>
        </div>

        {/* Create Account Modal */}
        {showCreateModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-[500px]">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold">Create Admin Account</h2>
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm mb-1">Fullname</label>
                    <input
                      type="text"
                      name="fullname"
                      onChange={(e) => setFullname(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-sm mb-1">
                      Barangay Position
                    </label>
                    <input
                      type="text"
                      name="barangayPosition"
                      onChange={(e) => setPosition(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-md"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm mb-1">Barangay</label>
                    <input
                      type="text"
                      name="barangay"
                      onChange={(e) => setBarangay(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-sm mb-1">Phone</label>
                    <input
                      type="tel"
                      name="phone"
                      onChange={(e) => setNumber(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-md"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm mb-1">Email</label>
                    <input
                      type="email"
                      name="email"
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-md"
                    />
                  </div>

                  <div>
                    <label className="block text-sm mb-1">Password</label>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md"
                      />
                      <button
                        type="button"
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? "Hide" : "Show"}
                      </button>
                    </div>
                  </div>
                </div>

                <hr />
                <button
                  onClick={handleSubmit}
                  className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
                >
                  Create Account
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default AdminAccounts;
