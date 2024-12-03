import SASidebar from "./SASidebar";
import { useState } from "react";

const SAProfile = () => {
  const [profile, setProfile] = useState({
    surname: "Gerasmio",
    firstName: "Marc Dominic",
    middleName: "diko knows",
    email: "marcgerasmio@gmail.com",
    dob: "diko knows",
    sex: "Male",
    phone: "diko knows",
    password: "kriziaMarie143_4ever",
  });

  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setProfile((prev) => ({ ...prev, [id]: value }));
  };

  const handlePasswordChange = (e) => {
    const { id, value } = e.target;
    setPasswordForm((prev) => ({ ...prev, [id]: value }));
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();

    if (passwordForm.newPassword === passwordForm.confirmPassword) {
      setProfile((prev) => ({ ...prev, password: passwordForm.newPassword }));
      setShowPasswordModal(false);
      alert("Password updated successfully!");
    } else {
      alert("Passwords do not match!");
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gray-100 font-mono xl:flex">
        <SASidebar />
        <div className="flex-1 flex flex-col">
          <main className="flex-1 p-4 sm:p-6">
            <div className="bg-gray-100">
              <div className="w-full mx-auto bg-white rounded-lg shadow p-8">
                {/* Profile Header */}
                <div className="flex flex-col items-center mb-8">
                  <div className="relative">
                    <img
                      src="https://placehold.co/400"
                      alt="Profile"
                      className="w-24 h-24 rounded-full object-cover border-2 border-white shadow"
                    />
                  </div>
                  <h1 className="mt-4 text-xl font-semibold text-gray-900">
                    {profile.firstName} {profile.surname}
                  </h1>
                  <p className="text-gray-500">Backend Web Developer</p>
                </div>

                {/* Profile Form */}
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Surname */}
                    <div>
                      <label
                        htmlFor="surname"
                        className="block text-sm font-medium text-blue-900 mb-1"
                      >
                        Surname
                      </label>
                      <input
                        type="text"
                        id="surname"
                        value={profile.surname}
                        onChange={handleInputChange}
                        className="input input-bordered w-full"
                      />
                    </div>

                    {/* First Name */}
                    <div>
                      <label
                        htmlFor="firstName"
                        className="block text-sm font-medium text-blue-900 mb-1"
                      >
                        First Name
                      </label>
                      <input
                        type="text"
                        id="firstName"
                        value={profile.firstName}
                        onChange={handleInputChange}
                        className="input input-bordered w-full"
                      />
                    </div>

                    {/* Middle Name */}
                    <div>
                      <label
                        htmlFor="middleName"
                        className="block text-sm font-medium text-blue-900 mb-1"
                      >
                        Middle Name
                      </label>
                      <input
                        type="text"
                        id="middleName"
                        value={profile.middleName}
                        onChange={handleInputChange}
                        className="input input-bordered w-full"
                      />
                    </div>
                  </div>

                  {/* Password */}
                  <div>
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium text-blue-900 mb-1"
                    >
                      Password
                    </label>
                    <div className="flex items-center gap-4">
                      <input
                        type={isPasswordVisible ? "text" : "password"}
                        id="password"
                        value={profile.password}
                        readOnly
                        className="input input-bordered w-full bg-gray-50"
                      />
                      <button
                        type="button"
                        onClick={() => setIsPasswordVisible((prev) => !prev)}
                        className="btn btn-outline btn-secondary"
                      >
                        {isPasswordVisible ? "Hide" : "Show"}
                      </button>
                      <button
                        type="button"
                        onClick={() => setShowPasswordModal(true)}
                        className="btn btn-outline btn-success"
                      >
                        CHANGE PASSWORD
                      </button>
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-blue-900 mb-1"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={profile.email}
                      onChange={handleInputChange}
                      className="input input-bordered w-full"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Date of Birth */}
                    <div>
                      <label
                        htmlFor="dob"
                        className="block text-sm font-medium text-blue-900 mb-1"
                      >
                        Date of Birth
                      </label>
                      <input
                        type="text"
                        id="dob"
                        value={profile.dob}
                        onChange={handleInputChange}
                        className="input input-bordered w-full"
                      />
                    </div>

                    {/* Sex */}
                    <div>
                      <label
                        htmlFor="sex"
                        className="block text-sm font-medium text-blue-900 mb-1"
                      >
                        Sex
                      </label>
                      <input
                        type="text"
                        id="sex"
                        value={profile.sex}
                        onChange={handleInputChange}
                        className="input input-bordered w-full"
                      />
                    </div>

                    {/* Phone */}
                    <div>
                      <label
                        htmlFor="phone"
                        className="block text-sm font-medium text-blue-900 mb-1"
                      >
                        Phone
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        value={profile.phone}
                        onChange={handleInputChange}
                        className="input input-bordered w-full"
                      />
                    </div>
                  </div>
                </form>

                {/* Password Change Modal */}
                {showPasswordModal && (
                  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white rounded-lg p-6 w-full max-w-md">
                      <h2 className="text-xl font-semibold mb-4">
                        Change Password
                      </h2>
                      <form
                        onSubmit={handlePasswordSubmit}
                        className="space-y-4"
                      >
                        <div>
                          <label
                            htmlFor="currentPassword"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Current Password
                          </label>
                          <input
                            type="password"
                            id="currentPassword"
                            value={passwordForm.currentPassword}
                            onChange={handlePasswordChange}
                            className="input input-bordered w-full"
                          />
                        </div>
                        <div>
                          <label
                            htmlFor="newPassword"
                            className="block text-sm font-medium text-gray-700"
                          >
                            New Password
                          </label>
                          <input
                            type="password"
                            id="newPassword"
                            value={passwordForm.newPassword}
                            onChange={handlePasswordChange}
                            className="input input-bordered w-full"
                          />
                        </div>
                        <div>
                          <label
                            htmlFor="confirmPassword"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Confirm New Password
                          </label>
                          <input
                            type="password"
                            id="confirmPassword"
                            value={passwordForm.confirmPassword}
                            onChange={handlePasswordChange}
                            className="input input-bordered w-full"
                          />
                        </div>
                        <div className="flex justify-end gap-4 mt-6">
                          <button
                            type="button"
                            onClick={() => setShowPasswordModal(false)}
                            className="btn btn-outline"
                          >
                            Cancel
                          </button>
                          <button type="submit" className="btn btn-primary">
                            Save Changes
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default SAProfile;
