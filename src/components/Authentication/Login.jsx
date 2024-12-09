import { useState } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "../supabaseClient";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const superadmin = async () => {
    const { data } = await supabase
      .from("SuperAdmin")
      .select("*")
      .eq("email", email)
      .single();
    if (data && data.password === password && data.email === email) {
      const id = data.id;
      sessionStorage.setItem("id", id);
      navigate("/sadashboard");
    } else {
      alert("Wrong Credentials");
      setIsLoading(false);
    }
  };

  const admin = async () => {
    const { data } = await supabase
      .from("Admin")
      .select("*")
      .eq("email", email)
      .single();
    if (data && data.password === password && data.email === email) {
      const id = data.id;
      sessionStorage.setItem("id", id);
      const barangay = data.barangay;
      sessionStorage.setItem("barangay", barangay);
      navigate("/admindashboard");
    } else {
      alert("Wrong Credentials");
      setIsLoading(false);
    }
  };

  const check = async () => {
    setIsLoading(true);
    try {
      if (email === "superadmin@gmail.com") {
        await superadmin();
      } else {
        await admin();
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="flex justify-center items-center font-mono p-4 sm:p-10 bg-base-200 min-h-screen">
        <div className="w-full sm:w-96 md:w-1/3 p-6 sm:p-10 rounded-lg text-black shadow-2xl border bg-white">
          <div className="flex justify-center">
            <img src="logo.png" alt="gabay-image-logo" className="h-24 w-26" />
          </div>
          <h1 className="mb-6 sm:mb-8 text-3xl sm:text-4xl md:text-5xl font-bold tracking-wide mt-3 text-center">
            Gabay
          </h1>
          <div className="mt-6">
            <div className="mb-2">
              <label className="input input-bordered flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="h-4 w-4 opacity-70"
                >
                  <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                  <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                </svg>
                <input
                  type="text"
                  className="grow"
                  placeholder="example@gmail.com"
                  required
                  onChange={(e) => setEmail(e.target.value)}
                />
              </label>
            </div>
            <div className="mb-6">
              <label className="input input-bordered flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="h-4 w-4 opacity-70"
                >
                  <path
                    fillRule="evenodd"
                    d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                    clipRule="evenodd"
                  />
                </svg>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter a password"
                  className="grow"
                  required
                  onChange={(e) => setPassword(e.target.value)}
                />
              </label>
            </div>
            <div className="flex items-center justify-between mb-4">
              <label className="flex items-center text-sm">
                <input
                  type="checkbox"
                  onChange={() => setShowPassword(!showPassword)}
                  className="mr-2 border-gray-300 rounded focus:ring-blue-500"
                />
                Show Password
              </label>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={check}
                className={`w-full btn bg-bttn hover:bg-dark text-white font-bold ${
                  isLoading ? "cursor-not-allowed" : ""
                }`}
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="loading loading-spinner rounded-full w-3 h-3 bg-white"></div>
                    <span>Loading...</span>
                  </div>
                ) : (
                  "Sign in"
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
