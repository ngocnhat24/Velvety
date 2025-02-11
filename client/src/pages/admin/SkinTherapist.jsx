import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../../components/Sidebar";

export default function SkinTherapist() {
  const [therapists, setTherapists] = useState([]);

  // Lấy danh sách therapist từ API
  useEffect(() => {
    axios.get("http://localhost:5000/api/skin-therapists")
      .then((res) => setTherapists(res.data))
      .catch((err) => console.error(err));
  }, []);

  // Xóa therapist
  const handleDelete = (id) => {
    axios.delete(`http://localhost:5000/api/skin-therapists/${id}`)
      .then(() => setTherapists(therapists.filter(therapist => therapist._id !== id)))
      .catch(err => console.error(err));
  };

  // Cập nhật therapist
  const handleUpdate = (id) => {
    const newName = prompt("Nhập tên mới:");
    if (newName) {
      axios.put(`http://localhost:5000/api/skin-therapists/${id}`, { name: newName })
        .then((res) => {
          setTherapists(therapists.map(therapist => therapist._id === id ? res.data : therapist));
        })
        .catch(err => console.error(err));
    }
  };

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 p-6 bg-white">
        <h2 className="text-2xl font-bold mb-4">Skin Therapist Dashboard</h2>
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-green-300">
              <th className="border p-2">ID</th>
              <th className="border p-2">Username</th>
              <th className="border p-2">Name</th>
              <th className="border p-2">Email</th>
              <th className="border p-2">Phone</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {therapists.map((therapist) => (
              <tr key={therapist._id} className="text-center border-b">
                <td className="border p-2">{therapist._id}</td>
                <td className="border p-2">{therapist.username}</td>
                <td className="border p-2">{therapist.name}</td>
                <td className="border p-2">{therapist.email}</td>
                <td className="border p-2">{therapist.phone}</td>
                <td className="border p-2">
                  <button
                    className="bg-red-500 text-white px-3 py-1 rounded mr-2 hover:bg-red-700"
                    onClick={() => handleDelete(therapist._id)}
                  >
                    Delete
                  </button>
                  <button
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-700"
                    onClick={() => handleUpdate(therapist._id)}
                  >
                    Update
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
