import { useState, useEffect } from "react";
import "./App.css";
import { collection, addDoc, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "./firebase";

function App() {
  const [applications, setApplications] = useState([]);
useEffect(() => {
  const fetchApplications = async () => {
    const querySnapshot = await getDocs(collection(db, "applications"));
    const apps = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setApplications(apps);
  };

  fetchApplications();
}, []);

  const [statusFilter, setStatusFilter] = useState("all");

  async function handleDelete(id) {
  await deleteDoc(doc(db, "applications", id));
  setApplications(applications.filter((app) => app.id !== id));
}


  const [formData, setFormData] = useState({
    company: "",
    role: "",
    status: "",
    date: ""
  });

  async function handleSubmit(e) {
  e.preventDefault();

  await addDoc(collection(db, "applications"), formData);

  setFormData({
    company: "",
    role: "",
    status: "",
    date: ""
  });

  const querySnapshot = await getDocs(collection(db, "applications"));
  const apps = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  setApplications(apps);
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
      <div className="card" key={app.id}>
        <p> Company: {app.company}</p>
        <p>Role: {app.role}</p>
        <p>Status: {app.status}</p>
        <p>Date: {app.date}</p>
        <button className="delete" onClick={() => handleDelete(app.id)}>Delete</button>
      </div>
    
    ))}
  </>
);
}


export default App;

