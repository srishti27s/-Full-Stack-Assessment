import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../services/api";
import Navbar from "../components/Navbar";
export default function ProjectBoard() {
  const { id } = useParams();
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");

  // fetch tasks
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await API.get(`/tasks?projectId=${id}`);
        setTasks(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, [id]);

  // create task
  const createTask = async () => {
    if (!title.trim()) return alert("Enter task title");

    try {
      await API.post("/tasks", {
        title,
        projectId: id
      });

      setTitle("");

      const res = await API.get(`/tasks?projectId=${id}`);
      setTasks(res.data);

    } catch (err) {
      console.log(err);
      alert("Failed to create task");
    }
  };

  // update status
  const updateStatus = async (taskId, status) => {
    try {
      await API.put(`/tasks/${taskId}`, { status });

      const res = await API.get(`/tasks?projectId=${id}`);
      setTasks(res.data);

    } catch (err) {
      console.log(err);
    }
  };

  const columns = ["todo", "in-progress", "done"];

 return (
  <>
    <Navbar />

    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 p-6">

      <h2 className="text-2xl font-bold mb-6">📋 Task Board</h2>

      <div className="flex gap-3 mb-6">
        <input
          className="border p-2 rounded w-64 shadow"
          placeholder="Task title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <button
          onClick={createTask}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 shadow"
        >
          Add
        </button>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {columns.map((col) => (
          <div key={col} className="bg-white p-4 rounded-xl shadow">

            <h3 className="font-bold mb-4 capitalize text-gray-700">
              {col}
            </h3>

            {tasks
              .filter((t) => t.status === col)
              .map((t) => (
                <div
                  key={t._id}
                  className="bg-gray-100 p-3 mb-3 rounded shadow-sm hover:shadow-md transition"
                >
                  <p className="font-medium">{t.title}</p>

                  <div className="flex flex-wrap gap-2 mt-2">
                    {columns.map((c) => (
                      <button
                        key={c}
                        onClick={() => updateStatus(t._id, c)}
                        className="text-xs bg-blue-200 px-2 py-1 rounded hover:bg-blue-300"
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
          </div>
        ))}
      </div>

    </div>
  </>
);
}