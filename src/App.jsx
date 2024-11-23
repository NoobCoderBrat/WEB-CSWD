import { Routes, Route } from "react-router-dom";
import Auth from "./components/Auth.jsx";
import AdminDashboard from "./components/Admin/AdminDashboard.jsx";
import AdminEvacuatees from "./components/Admin/AdminEvacuatees.jsx";
import AssistanceForm from "./components/Admin/AssistanceForm.jsx";
import PostNotification from "./components/Admin/PostNotification.jsx";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Auth />} />
      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="/evacuatees" element={<AdminEvacuatees />} />
      <Route path="/assistance" element={<AssistanceForm />} />
      <Route path="/notification" element={<PostNotification />} />
    </Routes>
  );
};

export default App;
