import { useState } from "react";

const Register = ({ onToggle, openModal }) => {
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
    <div className="w-full p-10 rounded-lg text-black bg-white/30 backdrop-blur-lg shadow-lg border border-gray-200">
      <div className="flex gap-1 justify-center">
        <img src="logo.png" alt="gabay-image-logo" className="h-16 w-26 mt-1" />
        <h1 className="mb-5 text-5xl text-white sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-wide mt-3">
          Gabay
          <span className="text-sm">Admin</span>
        </h1>
      </div>
      <form
        onSubmit={handleSubmit}
        className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2"
      >
        <div className="col-span-1">
          <label className="input input-bordered flex items-center gap-2 w-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70"
            >
              <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm4.5 7a.5.5 0 0 0 .5-.5c0-1.597-1.01-3.07-2.663-3.868C9.682 10.257 8.876 10 8 10c-.876 0-1.682.257-2.337.632C4.01 11.43 3 12.903 3 14.5a.5.5 0 0 0 .5.5h9z" />
            </svg>
            <input
              type="text"
              className="grow"
              placeholder="Full Name"
              required
            />
          </label>
        </div>

        <div className="col-span-1">
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
              type="email"
              className="grow"
              placeholder="example@gmail.com"
              required
            />
          </label>
        </div>

        <div className="col-span-1">
          <label className="input input-bordered flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70"
            >
              <path d="M3.654 1.328a.678.678 0 0 1 .558-.311h7.576c.23 0 .443.12.558.311l.015.03 1.438 2.577a.678.678 0 0 1-.002.645L9.372 14.1a.678.678 0 0 1-.558.31H3.186a.678.678 0 0 1-.558-.31L.607 5.287a.678.678 0 0 1-.002-.645l3.05-5.314zM7.246 7.5h1.508a.75.75 0 0 0 .742-.644L10.5 4H5.5l.742 2.856a.75.75 0 0 0 .742.644h1.508H7.246z" />
            </svg>
            <input
              type="tel"
              className="grow"
              placeholder="Phone Number"
              required
            />
          </label>
        </div>

        <div className="col-span-1">
          <label className="input input-bordered flex items-center gap-2">
            <select className="grow" required>
              <option value="" disabled selected>
                Select Sex
              </option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </label>
        </div>

        <div className="col-span-1">
          <label className="input input-bordered flex items-center gap-2">
            <input
              type="text"
              className="grow"
              placeholder="Address"
              rows="2"
              required
            />
          </label>
        </div>

        <div className="col-span-1">
          <label className="input input-bordered flex items-center gap-2">
            <input type="number" className="grow" placeholder="Age" required />
          </label>
        </div>

        <div className="col-span-1">
          <label className="input input-bordered flex items-center gap-2">
            <input type="date" className="grow" required />
          </label>
        </div>

        <div className="col-span-1">
          <label className="input input-bordered flex items-center gap-2">
            <input
              type="text"
              className="grow"
              placeholder="CSWD Position"
              required
            />
          </label>
        </div>

        <div className="col-span-1">
          <label className="input input-bordered flex items-center gap-2">
            <input
              type={showPassword ? "text" : "password"}
              className="grow"
              placeholder="Password"
              required
            />
          </label>
        </div>

        <div className="col-span-1">
          <label className="input input-bordered flex items-center gap-2">
            <input
              type={showPassword ? "text" : "password"}
              className="grow"
              placeholder="Confirm Password"
              required
            />
          </label>
        </div>

        <div className="flex gap-4 mt-6">
          <button
            className="w-full py-3 font-bold text-white btn btn-error bg-red-500 rounded-lg"
            onClick={onToggle}
          >
            Cancel
          </button>
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
              "Register"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Register;
