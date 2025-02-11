import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../../components/Sidebar";

export default function StaffManagement() {
  const [staffMembers, setStaffMembers] = useState([]);

  // Lấy danh sách nhân viên từ API
  useEffect(() => {
    axios.get("http://localhost:5000/api/staff")
      .then((res) => setStaffMembers(res.data))
      .catch((err) => console.error(err));
  }, []);

  // Xóa nhân viên
  const handleDelete = (id) => {
    axios.delete(`http://localhost:5000/api/staff/${id}`)
      .then(() => setStaffMembers(staffMembers.filter(staff => staff._id !== id)))
      .catch(err => console.error(err));
  };

  // Cập nhật nhân viên
  const handleUpdate = (id) => {
    const newName = prompt("Nhập tên nhân viên mới:");
    if (newName) {
      axios.put(`http://localhost:5000/api/staff/${id}`, { name: newName })
        .then((res) => {
          setStaffMembers(staffMembers.map(staff => staff._id === id ? res.data : staff));
        })
        .catch(err => console.error(err));
    }
  };

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 p-6 bg-white">
        <h2 className="text-2xl font-bold mb-4">Staff Management</h2>
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-pink-300">
              <th className="border p-2">ID</th>
              <th className="border p-2">Username</th>
              <th className="border p-2">Name</th>
              <th className="border p-2">Email</th>
              <th className="border p-2">Phone</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {staffMembers.map((staff) => (
              <tr key={staff._id} className="text-center border-b">
                <td className="border p-2">{staff._id}</td>
                <td className="border p-2">{staff.username}</td>
                <td className="border p-2">{staff.name}</td>
                <td className="border p-2">{staff.email}</td>
                <td className="border p-2">{staff.phone}</td>
                <td className="border p-2">
                  <button
                    className="bg-red-500 text-white px-3 py-1 rounded mr-2 hover:bg-red-700"
                    onClick={() => handleDelete(staff._id)}
                  >
                    Delete
                  </button>
                  <button
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-700"
                    onClick={() => handleUpdate(staff._id)}
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
