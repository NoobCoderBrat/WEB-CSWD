import AdminSidebar from "./AdminSidebar";

const AdminForms = () => {
  return (
    <>
      <div className="min-h-screen bg-gray-100 font-mono xl:flex">
        <AdminSidebar />
        <div className="flex-1 flex flex-col">
          <main className="flex-1 p-4 sm:p-6 overflow-auto">
            <p>forms</p>
          </main>
        </div>
      </div>
    </>
  );
};

export default AdminForms;
