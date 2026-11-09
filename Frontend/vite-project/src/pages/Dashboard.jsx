import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

  // Task States
  const [tasks, setTasks] = useState([]);

  const [showForm, setShowForm] = useState(false);
  const [activeFilter, setActiveFilter] = useState("All");
  const [search, setSearch] = useState("");

  // Form States
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("MEDIUM");
  const [status, setStatus] = useState("PENDING");

  // Statistics
  const completedTasks = tasks.filter(
    (task) => task.status === "COMPLETED"
  ).length;

  const inProgressTasks = tasks.filter(
    (task) => task.status === "IN_PROGRESS"
  ).length;

  const pendingTasks = tasks.filter((task) => task.status === "PENDING").length;

  const completionPercentage = tasks.length
    ? Math.round((completedTasks / tasks.length) * 100)
    : 0;

  // Create Task
  function handleCreateTask(e) {
    e.preventDefault();

    if (title.trim() === "") {
      return;
    }
    const newTask = {
      id: crypto.randomUUID(),
      title: title.trim(),
      description: description.trim(),
      priority,
      status,
    };
    setTasks((previousTasks) => [...previousTasks, newTask]);
    // Reset Form
    setTitle("");
    setDescription("");
    setPriority("MEDIUM");
    setStatus("PENDING");
    setShowForm(false);
  }

  // Toggle Task Completion
  function toggleTask(id) {
    setTasks((previousTasks) =>
      previousTasks.map((task) =>
        task.id === id
          ? {
              ...task,
              status: task.status === "COMPLETED" ? "PENDING" : "COMPLETED",
            }
          : task
      )
    );
  }

  // Delete Task
  function deleteTask(id) {
    setTasks((previousTasks) => previousTasks.filter((task) => task.id !== id));
  }

  // Search and Filter
  const filteredTasks = tasks.filter((task) => {
    const matchesSearch = task.title
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesFilter =
      activeFilter === "All" || task.status === activeFilter;
    return matchesSearch && matchesFilter;
  });

  // Logout
  function handleLogout() {
    sessionStorage.removeItem("token");
    navigate("/login");
  }

  return (
    <div className="min-h-screen flex bg-[#080d18] text-white font-mono">
      {/* Sidebar */}
      <aside className="hidden md:flex w-64 flex-col bg-[#0b1220] border-r border-slate-800/70 p-6">
        <div className="flex items-center gap-3 mb-12">
          <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-400/20 flex items-center justify-center">
            <span className="text-2xl font-bold text-blue-400">D.</span>
          </div>
          <h1 className="text-xl font-bold">Devboard</h1>
        </div>

        <p className="text-xs text-slate-500 uppercase tracking-widest mb-4">
          Workspace
        </p>

        <nav className="space-y-2">
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg bg-blue-600/10 border border-blue-500/20 text-blue-400 text-sm text-left">
            ▦ Dashboard
          </button>

          <button
            onClick={() => setActiveFilter("All")}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-slate-400 hover:bg-slate-800/60 hover:text-white transition text-sm text-left"
          >
            ▤ My Tasks
          </button>

          <button
            onClick={() => setActiveFilter("COMPLETED")}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-slate-400 hover:bg-slate-800/60 hover:text-white transition text-sm text-left"
          >
            ✓ Completed
          </button>
        </nav>

        <div className="mt-auto">
          <div className="border-t border-slate-800 pt-6 mb-6">
            <p className="text-xs text-slate-500 mb-4 uppercase tracking-widest">
              Account
            </p>

            <button className="w-full px-4 py-3 rounded-lg text-slate-400 hover:bg-slate-800/60 hover:text-white transition text-sm text-left">
              ⚙ Settings
            </button>
          </div>

          <button
            onClick={handleLogout}
            className="w-full px-4 py-3 rounded-lg text-red-400 hover:bg-red-500/10 transition text-sm text-left"
          >
            ↪ Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 min-w-0 p-5 sm:p-8 lg:p-10">
        {/* Header */}
        <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5 mb-10">
          <div>
            <p className="text-sm text-blue-400 mb-2">DEVBOARD / WORKSPACE</p>

            <h1 className="text-2xl sm:text-3xl font-bold">Welcome Back!</h1>

            <p className="text-sm text-slate-400 mt-2">
              Organize your work. Track your progress.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <input
              type="text"
              placeholder="Search tasks..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full sm:w-52 lg:w-64 px-4 py-3 rounded-lg bg-[#111827] border border-slate-700 text-sm text-white placeholder:text-slate-500 outline-none focus:border-blue-400"
            />

            <div className="w-11 h-11 shrink-0 rounded-xl bg-blue-600/20 border border-blue-400/30 flex items-center justify-center">
              <span className="text-blue-400 font-bold">U</span>
            </div>
          </div>
        </header>

        {/* Statistics */}
        <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-10">
          <div className="bg-[#111827] border border-slate-800 rounded-xl p-6">
            <p className="text-sm text-slate-400">Total Tasks</p>
            <h2 className="text-3xl font-bold mt-4">{tasks.length}</h2>
            <p className="text-xs text-blue-400 mt-3">All your tasks</p>
          </div>

          <div className="bg-[#111827] border border-slate-800 rounded-xl p-6">
            <p className="text-sm text-slate-400">Completed</p>
            <h2 className="text-3xl font-bold text-green-400 mt-4">
              {completedTasks}
            </h2>
            <p className="text-xs text-green-400 mt-3">Successfully finished</p>
          </div>

          <div className="bg-[#111827] border border-slate-800 rounded-xl p-6">
            <p className="text-sm text-slate-400">In Progress</p>
            <h2 className="text-3xl font-bold text-blue-400 mt-4">
              {inProgressTasks}
            </h2>
            <p className="text-xs text-blue-400 mt-3">Currently working on</p>
          </div>

          <div className="bg-[#111827] border border-slate-800 rounded-xl p-6">
            <p className="text-sm text-slate-400">Pending</p>
            <h2 className="text-3xl font-bold text-yellow-400 mt-4">
              {pendingTasks}
            </h2>
            <p className="text-xs text-yellow-400 mt-3">
              Waiting to be started
            </p>
          </div>
        </section>

        {/* Progress */}
        <section className="bg-[#111827] border border-slate-800 rounded-xl p-6 mb-10">
          <div className="flex justify-between items-center mb-5">
            <div>
              <h2 className="text-lg font-bold">Overall Progress</h2>
              <p className="text-xs text-slate-400 mt-2">
                Track your productivity
              </p>
            </div>

            <span className="text-2xl font-bold text-blue-400">
              {completionPercentage}%
            </span>
          </div>

          <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-500 rounded-full transition-all duration-500"
              style={{ width: `${completionPercentage}%` }}
            ></div>
          </div>

          <p className="text-xs text-slate-500 mt-4">
            {completedTasks} out of {tasks.length} tasks completed.
          </p>
        </section>

        {/* Tasks Header */}
        <section>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div>
              <h2 className="text-xl font-bold">My Tasks</h2>
              <p className="text-sm text-slate-400 mt-2">
                Create and manage your tasks.
              </p>
            </div>

            <button
              onClick={() => setShowForm(!showForm)}
              className="px-5 py-3 bg-blue-600 hover:bg-blue-500 rounded-lg text-sm font-semibold transition shadow-lg shadow-blue-600/20"
            >
              {showForm ? "Close Form" : "+ New Task"}
            </button>
          </div>

          {/* Create Task Form */}
          {showForm && (
            <form
              onSubmit={handleCreateTask}
              className="bg-[#111827] border border-slate-800 rounded-xl p-6 mb-8 space-y-5"
            >
              <h3 className="text-lg font-bold text-white">Create New Task</h3>

              {/* Title */}
              <div>
                <label className="block text-sm text-slate-300 mb-2">
                  Task Title
                </label>

                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter task title..."
                  required
                  className="w-full px-4 py-3 bg-[#0b1220] border border-slate-700 rounded-lg text-white text-sm outline-none focus:border-blue-400"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm text-slate-300 mb-2">
                  Description
                </label>

                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe your task..."
                  rows={3}
                  className="w-full px-4 py-3 bg-[#0b1220] border border-slate-700 rounded-lg text-white text-sm outline-none focus:border-blue-400 resize-none"
                />
              </div>

              {/* Priority and Status */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm text-slate-300 mb-2">
                    Priority
                  </label>

                  <select
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                    className="w-full px-4 py-3 bg-[#0b1220] border border-slate-700 rounded-lg text-white text-sm outline-none focus:border-blue-400"
                  >
                    <option value="LOW">Low</option>
                    <option value="MEDIUM">Medium</option>
                    <option value="HIGH">High</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm text-slate-300 mb-2">
                    Status
                  </label>

                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="w-full px-4 py-3 bg-[#0b1220] border border-slate-700 rounded-lg text-white text-sm outline-none focus:border-blue-400"
                  >
                    <option value="PENDING">Pending</option>
                    <option value="IN_PROGRESS">In Progress</option>
                    <option value="COMPLETED">Completed</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto px-6 py-3 bg-blue-600 hover:bg-blue-500 rounded-lg text-white text-sm font-semibold transition"
              >
                Create Task →
              </button>
            </form>
          )}

          {/* Filters */}
          <div className="flex flex-wrap gap-3 mb-6">
            {["All", "PENDING", "IN_PROGRESS", "COMPLETED"].map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-4 py-2 rounded-lg text-xs transition ${
                  activeFilter === filter
                    ? "bg-blue-600 text-white"
                    : "bg-[#111827] border border-slate-800 text-slate-400 hover:text-white"
                }`}
              >
                {filter === "All" ? "All Tasks" : filter.replace("_", " ")}
              </button>
            ))}
          </div>

          {/* Task List */}
          <div className="space-y-4">
            {filteredTasks.length > 0 ? (
              filteredTasks.map((task) => (
                <div
                  key={task.id}
                  className="bg-[#111827] border border-slate-800 rounded-xl p-5 hover:border-slate-600 transition"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <input
                        type="checkbox"
                        checked={task.status === "COMPLETED"}
                        onChange={() => toggleTask(task.id)}
                        className="mt-1 w-4 h-4 accent-blue-500 cursor-pointer"
                      />

                      <div>
                        <h3
                          className={`font-semibold text-sm ${
                            task.status === "COMPLETED"
                              ? "text-slate-500 line-through"
                              : "text-white"
                          }`}
                        >
                          {task.title}
                        </h3>

                        <p className="text-xs text-slate-400 mt-2">
                          {task.description}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 flex-wrap">
                      <span
                        className={`px-3 py-1 rounded-md text-xs ${
                          task.priority === "HIGH"
                            ? "bg-red-500/10 text-red-400"
                            : task.priority === "MEDIUM"
                            ? "bg-yellow-500/10 text-yellow-400"
                            : "bg-green-500/10 text-green-400"
                        }`}
                      >
                        {task.priority}
                      </span>

                      <span
                        className={`px-3 py-1 rounded-md text-xs ${
                          task.status === "COMPLETED"
                            ? "bg-green-500/10 text-green-400"
                            : task.status === "IN_PROGRESS"
                            ? "bg-blue-500/10 text-blue-400"
                            : "bg-slate-700/50 text-slate-400"
                        }`}
                      >
                        {task.status.replace("_", " ")}
                      </span>

                      <button
                        onClick={() => deleteTask(task.id)}
                        className="px-3 py-1 text-xs text-red-400 hover:bg-red-500/10 rounded-md transition"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="bg-[#111827] border border-slate-800 rounded-xl p-10 text-center">
                <div className="text-4xl text-slate-600 mb-4">+</div>

                <h3 className="text-lg font-semibold text-slate-300">
                  {tasks.length === 0
                    ? "No tasks created yet"
                    : "No matching tasks found"}
                </h3>

                <p className="text-sm text-slate-500 mt-2">
                  {tasks.length === 0
                    ? "Create your first task to get started."
                    : "Try changing your search or filter."}
                </p>

                {tasks.length === 0 && (
                  <button
                    onClick={() => setShowForm(true)}
                    className="mt-5 px-5 py-3 bg-blue-600 hover:bg-blue-500 rounded-lg text-sm transition"
                  >
                    + Create Your First Task
                  </button>
                )}
              </div>
            )}
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-12 pt-6 border-t border-slate-800 text-center">
          <p className="text-xs text-slate-600 tracking-wider">
            DEVBOARD // BUILT FOR DEVELOPERS
          </p>
        </footer>
      </main>
    </div>
  );
}

export default Dashboard;
