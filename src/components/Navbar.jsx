export default function Navbar() {
  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <div className="sticky top-0 z-50 backdrop-blur-lg bg-white/30 border-b border-white/20 shadow-sm px-6 py-3 flex justify-between items-center">
      <h1 className="text-lg font-semibold text-gray-800">
        🚀 Team Task Manager
      </h1>

      <button
        onClick={logout}
        className="bg-red-500 text-white px-4 py-1.5 rounded-lg hover:bg-red-600 transition"
      >
        Logout
      </button>
    </div>
  );
}