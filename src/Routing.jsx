import { Routes, Route } from "react-router-dom";
import Login from "./components/Authentication/Login";
import Register from "./components/Authentication/Register";
import Forms from "./components/User/Forms";
import DAF from "./components/User/DAF";
import FamilyMembers from "./components/User/FamilyMembers";
import Landlord from "./components/User/Landlord";
import ListOfRenters from "./components/User/ListOfRenters";
import EmergencyHotline from "./components/User/EmergencyHotlines";
import EvacuationCenter from "./components/User/EvacuationCenter";
import EvacuationNotice from "./components/User/EvacuationNotice";
import FAQs from "./components/User/FAQs";
import AdminDashboard from "./components/Admin/AdminDashboard";
import Evacuation from "./components/Admin/Evacuation";
import AdminForms from "./components/Admin/AdminForms";
import Hotlines from "./components/Admin/Hotlines";
import AdminProfile from "./components/Admin/AdminProfile";
import SADashboard from "./components/SuperAdmin/SADashboard";
import SAEvacuation from "./components/SuperAdmin/SAEvacuation";
import SADAF from "./components/SuperAdmin/SADAF";
import AdminAccounts from "./components/SuperAdmin/AdminAccounts";
import SACenter from "./components/SuperAdmin/SACenter";
import SAHotlines from "./components/SuperAdmin/SAHotlines";
import SAProfile from "./components/SuperAdmin/SAProfile";
import MasterList from "./components/Admin/MasterList";
import INEvacuaees from "./components/Admin/InEvacuaees";
import OutEvacuaees from "./components/Admin/OutEvacuaees";
import LandlordList from "./components/Admin/LandlordList";

const Routing = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/" element={<Forms />} />
      <Route path="/daf" element={<DAF />} />
      <Route path="/familymembers" element={<FamilyMembers />} />
      <Route path="/landlord" element={<Landlord />} />
      <Route path="/renters" element={<ListOfRenters />} />
      <Route path="/emergencyhotlines" element={<EmergencyHotline />} />
      <Route path="/evacuationcenter" element={<EvacuationCenter />} />
      <Route path="/evacuationnotice" element={<EvacuationNotice />} />
      <Route path="/faqs" element={<FAQs />} />


      
      <Route path="/admindashboard" element={<AdminDashboard />} />
      <Route path="/adminevacuation" element={<Evacuation />} />
      <Route path="/adminforms" element={<AdminForms />} />
      <Route path="/hotlines" element={<Hotlines />} />
      <Route path="/adminprofile" element={<AdminProfile />} />
      <Route path="/sadashboard" element={<SADashboard />} />
      <Route path="/saevacuation" element={<SAEvacuation />} />
      <Route path="/sadaf" element={<SADAF />} />
      <Route path="/adminaccounts" element={<AdminAccounts />} />
      <Route path="/notice" element={<SACenter />} />
      <Route path="/sahotlines" element={<SAHotlines />} />
      <Route path="/saprofile" element={<SAProfile />} />
      <Route path="/master-list-daf" element={<MasterList />} />
      <Route path="/in-evacuaees" element={<INEvacuaees />} />
      <Route path="/out-evacuaees" element={<OutEvacuaees />} />
      <Route path="/list-of-landlords" element={<LandlordList />} />
    </Routes>
  );
};

export default Routing;
