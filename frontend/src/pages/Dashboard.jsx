import { useEffect, useState } from "react";
import api from "../services/api";

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [editingTaskId, setEditingTaskId] = useState(null);

  const role = localStorage.getItem("role");
  const name = localStorage.getItem("name");

  const fetchTasks = async () => {
    try {
      const res = await api.get("/tasks");
      setTasks(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleSubmit = async () => {
    if (!title || !description) {
      alert("Please fill all fields");
      return;
    }

    try {
      if (editingTaskId) {
        await api.put(`/tasks/${editingTaskId}`, {
          title,
          description,
        });

        alert("Task Updated");
        setEditingTaskId(null);
      } else {
        await api.post("/tasks", {
          title,
          description,
        });

        alert("Task Created");
      }

      setTitle("");
      setDescription("");
      fetchTasks();
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = (task) => {
    setTitle(task.title);
    setDescription(task.description);
    setEditingTaskId(task._id);
  };

  const deleteTask = async (id) => {
    const ok = window.confirm("Delete this task?");
    if (!ok) return;

    try {
      await api.delete(`/tasks/${id}`);
      fetchTasks();
    } catch (error) {
      console.log(error);
    }
  };

  const logout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0b1220",
        color: "white",
        padding: "30px",
        fontFamily: "Arial",
      }}
    >
      {/* HEADER */}
     {/* NAVBAR */}
<div
  style={{
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "15px 20px",
    borderRadius: "12px",
    background: "#111a2e",
    border: "1px solid #1f2a44",
    marginBottom: "20px",
  }}
>
  {/* LEFT */}
  <div>
    <h2 style={{ margin: 0 }}>
      Task Manager
    </h2>
    <p style={{ margin: 0, color: "#aaa", fontSize: "13px" }}>
      {role === "admin"
        ? "Admin Dashboard"
        : "User Dashboard"}
    </p>
  </div>

  {/* CENTER BUTTONS */}
  <div style={{ display: "flex", gap: "10px" }}>
    <button
      onClick={() => (window.location.href = "/")}
      style={{
        background: "transparent",
        color: "white",
        border: "1px solid #2b3a5a",
        padding: "8px 14px",
        borderRadius: "8px",
        cursor: "pointer",
      }}
    >
      Home
    </button>

    <button
      onClick={() => (window.location.href = "/dashboard")}
      style={{
        background: "#f97316",
        color: "white",
        border: "none",
        padding: "8px 14px",
        borderRadius: "8px",
        cursor: "pointer",
      }}
    >
      Refresh
    </button>
  </div>

  {/* RIGHT */}
  <button
    onClick={() => {
      localStorage.clear();
      window.location.href = "/";
    }}
    style={{
      background: "#ef4444",
      color: "white",
      border: "none",
      padding: "8px 14px",
      borderRadius: "8px",
      cursor: "pointer",
    }}
  >
    Logout
  </button>
</div>

      {/* ROLE BADGE */}
      <div
        style={{
          background: "#111a2e",
          padding: "15px",
          borderRadius: "12px",
          marginBottom: "20px",
          border: "1px solid #1f2a44",
        }}
      >
        <h3>
          Role:{" "}
          <span style={{ color: "#f97316" }}>
            {role?.toUpperCase()}
          </span>
        </h3>
      </div>

      {/* ADMIN PANEL */}
      {role === "admin" && (
        <div
          style={{
            background: "#1a2238",
            border: "1px solid #f97316",
            padding: "15px",
            borderRadius: "12px",
            marginBottom: "20px",
          }}
        >
          <h3 style={{ color: "#f97316" }}>
            Admin Panel
          </h3>
          <p>
            Admin can delete and manage all tasks.
          </p>
        </div>
      )}

      {/* FORM */}
      <div
        style={{
          background: "#111a2e",
          padding: "20px",
          borderRadius: "12px",
          marginBottom: "20px",
        }}
      >
        <h3>
          {editingTaskId
            ? "Update Task"
            : "Create Task"}
        </h3>

        <input
          placeholder="Title"
          value={title}
          onChange={(e) =>
            setTitle(e.target.value)
          }
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "10px",
            borderRadius: "8px",
            border: "1px solid #2b3a5a",
            background: "#0b1220",
            color: "white",
          }}
        />

        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) =>
            setDescription(e.target.value)
          }
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "10px",
            borderRadius: "8px",
            border: "1px solid #2b3a5a",
            background: "#0b1220",
            color: "white",
          }}
        />

        <button
          onClick={handleSubmit}
          style={{
            background: "#f97316",
            color: "white",
            border: "none",
            padding: "10px 16px",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          {editingTaskId
            ? "Update Task"
            : "Create Task"}
        </button>
      </div>

      {/* TASKS */}
      <h2>Tasks</h2>

      {tasks.map((task) => (
        <div
          key={task._id}
          style={{
            background: "#111a2e",
            padding: "15px",
            borderRadius: "12px",
            marginBottom: "10px",
            border: "1px solid #1f2a44",
          }}
        >
          <h3>{task.title}</h3>
          <p style={{ color: "#aaa" }}>
            {task.description}
          </p>

          <div style={{ display: "flex", gap: "10px" }}>
            <button
              onClick={() => handleEdit(task)}
              style={{
                background: "#f97316",
                color: "white",
                border: "none",
                padding: "8px 12px",
                borderRadius: "6px",
                cursor: "pointer",
              }}
            >
              Edit
            </button>

            {role === "admin" && (
              <button
                onClick={() => deleteTask(task._id)}
                style={{
                  background: "#ef4444",
                  color: "white",
                  border: "none",
                  padding: "8px 12px",
                  borderRadius: "6px",
                  cursor: "pointer",
                }}
              >
                Delete
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Dashboard;