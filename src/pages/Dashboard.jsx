import { useEffect, useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
export default function Dashboard() {
  const [projects, setProjects] = useState([]);
  const [name, setName] = useState("");
  const nav = useNavigate();

  // fetch projects
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await API.get("/projects");
        setProjects(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);

  // create project
  const createProject = async () => {
    if (!name.trim()) return alert("Enter project name");

    try {
      await API.post("/projects", { name });
      setName("");

      // refresh projects
      const res = await API.get("/projects");
      setProjects(res.data);
    } catch (err) {
      console.log(err);
      alert("Failed to create project");
    }
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-linear-to-br from-blue-100 to-purple-100 p-6">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">📊 Projects</h1>

        <div className="flex gap-3 mb-6">
          <input
            className="border p-2 rounded w-64 shadow"
            placeholder="Enter project name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <button
            onClick={createProject}
            className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700 shadow"
          >
            Create
          </button>
        </div>

        <div className="grid grid-cols-3 gap-5">
          {projects.map((p) => (
            <div
              key={p._id}
              onClick={() => nav(`/project/${p._id}`)}
              className="bg-white p-5 rounded-xl shadow-md hover:shadow-xl transition cursor-pointer"
            >
              <h2 className="text-lg font-semibold text-gray-700">{p.name}</h2>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
