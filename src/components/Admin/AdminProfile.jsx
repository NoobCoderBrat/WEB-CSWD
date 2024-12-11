import AdminSidebar from "./AdminSidebar";
import { useState, useEffect, useRef } from "react";
import supabase from "../supabaseClient";

const AdminProfile = () => {
 const [profile, setProfile] = useState('');
 const [newPassword, setNewPassword]= useState('');
 const id = sessionStorage.getItem('id');
 const [file, setFile] = useState("");
 const fileInputRef = useRef(null);

 const fetch_profile = async () => {
  try {
    const { error, data } = await supabase
      .from("Admin")
      .select("*")
      .eq("id", id)
      .single();
    if (error) throw error;
    setProfile(data);
    console.log(data);
  } catch (error) {
    alert("An unexpected error occurred.");
    console.error("Error during fetching history:", error.message);
  }
};

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

  const handlePasswordSubmit = async (e) => {
       e.preventDefault();
    try {
      const { error } = await supabase
        .from("Admin")
        .update({ password: newPassword })
        .eq("id", id);
      if (error) throw error;
     window.location.reload()
    } catch (error) {
      console.error("Error updating evacuation center:", error);
    }
  };

  useEffect(() => {
    fetch_profile();
  }, []);


  const handleImageClick = () => {
    fileInputRef.current.click(); // Trigger the file input on image click
  };

  const handlePhotoUpload = async (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    if (selectedFile) {
      try {
        const filePath = `${selectedFile.name}`;
        const { data, error } = await supabase.storage
          .from("Images")
          .upload(filePath, selectedFile);
        if (error) throw error;

        const { data: publicURL, error: urlError } = supabase.storage
          .from("Images")
          .getPublicUrl(filePath);
        if (urlError) throw urlError;

        // Update profile picture in the database
        await supabase
          .from("Admin")
          .update({ image: publicURL.publicUrl })
          .eq("id", id);

        // Update the state
        setProfile((prev) => ({ ...prev, image: publicURL.publicUrl }));
        window.location.reload();
      } catch (error) {
        console.error("Error uploading image:", error);
        alert("Error uploading image: " + error.message);
      }
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gray-100 font-mono xl:flex">
        <AdminSidebar />
        <div className="flex-1 flex flex-col">
          <main className="flex-1 p-4 sm:p-6">
            <div className="bg-gray-100">
              <div className="w-full mx-auto bg-white rounded-lg shadow p-8">
                {/* Profile Header */}
                <div className="flex flex-col items-center mb-8">
                <div className="relative">
                    <img
                      src={profile.image}
                      alt="Profile"
                      className="w-24 h-24 rounded-full object-cover border-2 border-white shadow"
                      onClick={handleImageClick}
                    />
                    <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handlePhotoUpload}
                    style={{ display: "none" }} // Hidden file input
                  />
                  </div>
                  <h1 className="mt-4 text-xl font-semibold text-gray-900">
                    {profile.fullname}
                  </h1>
                  <p className="text-gray-500">{profile.position}</p>
                </div>

                {/* Profile Form */}
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="middleName"
                        className="block text-sm font-medium text-blue-900 mb-1"
                      >
                        Full Name
                      </label>
                      <input
                        type="text"
                        id="middleName"
                        value={profile.fullname}
                        className="input input-bordered w-full"
                        disabled
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="middleName"
                        className="block text-sm font-medium text-blue-900 mb-1"
                      >
                       Position
                      </label>
                      <input
                        type="text"
                        id="middleName"
                        value={profile.position}
                        className="input input-bordered w-full"
                        disabled
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Date of Birth */}
                    <div>
                      <label
                        htmlFor="dob"
                        className="block text-sm font-medium text-blue-900 mb-1"
                      >
                        Phone Number
                      </label>
                      <input
                        type="text"
                        id="dob"
                        value={profile.number}
                        className="input input-bordered w-full"
                        disabled
                      />
                    </div>

                    {/* Sex */}
                    <div>
                      <label
                        htmlFor="sex"
                        className="block text-sm font-medium text-blue-900 mb-1"
                      >
                      Barangay
                      </label>
                      <input
                        type="text"
                        id="sex"
                        value={profile.barangay}
                        disabled
                        className="input input-bordered w-full"
                      />
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
                      disabled
                    />
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
                            htmlFor="newPassword"
                            className="block text-sm font-medium text-gray-700"
                          >
                            New Password
                          </label>
                          <input
                            type="password"
                            id="newPassword"
                            onChange={(e) => setNewPassword(e.target.value)}
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

export default AdminProfile;
