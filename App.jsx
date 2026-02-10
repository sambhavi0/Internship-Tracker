import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [applications, setApplications] = useState(() => {
  const stored = localStorage.getItem("applications");
  return stored ? JSON.parse(stored) : [];
});
 
  useEffect(() => {
  localStorage.setItem(
    "applications",
    JSON.stringify(applications)
  );
}, [applications]);

  const [statusFilter, setStatusFilter] = useState("all");


  function handleDelete(index) {
    setApplications(applications.filter((_, idx) => idx !== index));
  }

  const [formData, setFormData] = useState({
    company: "",
    role: "",
    status: "",
    date: ""
  });

  function handleSubmit(e) {
    e.preventDefault();
    setApplications([...applications, formData]);
  }
  const filteredApplications =
  statusFilter === "all"
    ? applications
    : applications.filter(app => app.status === statusFilter);


return (
  <>
    <form className="form" onSubmit={handleSubmit}>
      <input
        placeholder="Company Name"
        value={formData.company}
        onChange={(e) =>
          setFormData({ ...formData, company: e.target.value })
        }
        required
      />

      <input
        placeholder="Role"
        value={formData.role}
        onChange={(e) =>
          setFormData({ ...formData, role: e.target.value })
        }
        required
      />
      <input
        placeholder="Status"
        value={formData.status}
        onChange={(e) =>
          setFormData({ ...formData, status: e.target.value })
        }
        required
      />
      <input
        type="date"
        placeholder="Date"
        value={formData.date}
        onChange={(e) =>
          setFormData({ ...formData, date: e.target.value })
        }
        required
      />
      <button className="add">Add</button>
    </form>
    <select
      value={statusFilter}
      onChange={(e) => setStatusFilter(e.target.value)}
    >
      <option value="all">All</option>
      <option value="applied">Applied</option>
      <option value="rejected">Rejected</option>
    </select>
    
    {filteredApplications.map((app, idx) => (
      <div className="card" key={idx}>
        <p> Company: {app.company}</p>
        <p>Role: {app.role}</p>
        <p>Status: {app.status}</p>
        <p>Date: {app.date}</p>
        <button className="delete" onClick={() => handleDelete(idx)}>Delete</button>
      </div>
    
    ))}
  </>
);
}


export default App;

