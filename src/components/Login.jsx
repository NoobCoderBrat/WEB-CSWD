import { useState } from "react";

const Login = ({ onToggle, openModal }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      openModal();
    }, 2000);
  };

  return (
    <div className="w-2/3 p-10 rounded-lg text-black bg-white/30 backdrop-blur-lg shadow-lg border border-gray-200">
      <div className="flex gap-1 justify-center">
        <img src="logo.png" alt="gabay-image-logo" className="h-16 w-26 mt-1" />
        <h1 className="mb-5 text-5xl text-white sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-wide mt-3">
          Gabay
          <span className="text-sm">Admin</span>
        </h1>
      </div>
      <form onSubmit={handleSubmit} className="mt-6">
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
            />
          </label>
        </div>

        <div className="flex items-center justify-between mb-4">
          <label className="flex items-center text-sm text-white">
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
            type="submit"
            className="w-full btn btn-primary font-bold text-white"
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <div className="loading loading-spinner bg-white rounded-full w-3 h-3"></div>
                <span className="ml-2 text-white">Loading...</span>
              </div>
            ) : (
              "Login"
            )}
          </button>
        </div>
      </form>
      <div className="divider before:bg-white after:bg-white text-white">
        or
      </div>
      <button
        className="w-full py-3 font-bold text-white btn btn-error bg-red-500 rounded-lg"
        onClick={onToggle}
      >
        Create an Account
      </button>
    </div>
  );
};

export default Login;
