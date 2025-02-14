import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../../components/Sidebar";

export default function StaffManagement() {
  const [staffMembers, setStaffMembers] = useState([]);
  const [newStaff, setNewStaff] = useState({ username: "", name: "", email: "", phone: "" });
  const [isModalOpen, setIsModalOpen] = useState(false);

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
  const handleUpdate = (staff) => {
    const newName = prompt("Nhập tên nhân viên mới:", staff.name);
    const newEmail = prompt("Nhập email mới:", staff.email);
    const newPhone = prompt("Nhập số điện thoại mới:", staff.phone);
    const newUsername = prompt("Nhập username mới:", staff.username);

    if (newName && newEmail && newPhone && newUsername) {
      axios
        .put(`http://localhost:5000/api/staff/${staff._id}`, {
          username: newUsername,
          name: newName,
          email: newEmail,
          phone: newPhone,
        })
        .then((res) => {
          setStaffMembers(
            staffMembers.map((s) =>
              s._id === staff._id ? res.data : s
            )
          );
        })
        .catch((err) => console.error(err));
    }
  };

  // Thêm nhân viên mới
  const handleAdd = () => {
    axios
      .post("http://localhost:5000/api/staff", newStaff)
      .then((res) => {
        setStaffMembers([...staffMembers, res.data]);
        setNewStaff({ username: "", name: "", email: "", phone: "" }); // Reset form after adding
        setIsModalOpen(false); // Đóng modal sau khi thêm
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 p-6 bg-white">
        <h2 className="text-2xl font-bold mb-4">Staff Management</h2>

        {/* Nút Add */}
        <div className="mb-4">
          <button
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700"
            onClick={() => setIsModalOpen(true)} // Mở modal khi nhấn nút Add
          >
            Add Staff
          </button>
        </div>

        {/* Modal thêm nhân viên */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded shadow-lg w-96">
              <h3 className="text-xl font-semibold mb-4">Add New Staff</h3>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Username</label>
                <input
                  type="text"
                  className="border p-2 w-full mb-2 rounded"
                  placeholder="Username"
                  value={newStaff.username}
                  onChange={(e) => setNewStaff({ ...newStaff, username: e.target.value })}
                />
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  className="border p-2 w-full mb-2 rounded"
                  placeholder="Name"
                  value={newStaff.name}
                  onChange={(e) => setNewStaff({ ...newStaff, name: e.target.value })}
                />
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  className="border p-2 w-full mb-2 rounded"
                  placeholder="Email"
                  value={newStaff.email}
                  onChange={(e) => setNewStaff({ ...newStaff, email: e.target.value })}
                />
                <label className="block text-sm font-medium text-gray-700">Phone</label>
                <input
                  type="text"
                  className="border p-2 w-full mb-4 rounded"
                  placeholder="Phone"
                  value={newStaff.phone}
                  onChange={(e) => setNewStaff({ ...newStaff, phone: e.target.value })}
                />
              </div>
              <div className="flex justify-between">
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
                  onClick={() => setIsModalOpen(false)} // Đóng modal
                >
                  Cancel
                </button>
                <button
                  className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700"
                  onClick={handleAdd} // Thêm nhân viên mới
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Bảng nhân viên */}
        <table className="w-full border-collapse border border-gray-300 mt-6">
          <thead>
            <tr className="bg-pink-300">
              <th className="border p-2">ID</th>
              <th className="border p-2">Username</th> {/* Hiển thị Username */}
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
                <td className="border p-2">{staff.username}</td> {/* Hiển thị Username */}
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
                    onClick={() => handleUpdate(staff)}
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
