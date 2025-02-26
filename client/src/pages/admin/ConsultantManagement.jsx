import React, { useEffect, useState } from "react";
import axios from "../../utils/axiosInstance";
import Sidebar from "../../components/AdminSidebar";

export default function consultantManagement() {
  const [consultants, setconsultants] = useState([]);
  const [newconsultant, setNewconsultant] = useState({ username: "", name: "", email: "", phone: "" });
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  useEffect(() => {
    fetchConsultants();
  }, []);

  const fetchConsultants = async () => {
    try {
      const response = await axios.get("/api/consultants");
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = (id) => {
    axios.delete(`/api/consultants/${id}`)
      .then(() => setconsultants(consultants.filter(consultant => consultant._id !== id)))
      .catch(err => console.error(err));
  };

  const handleUpdate = (consultant) => {
    const newName = prompt("Nhập tên mới:", consultant.name);
    const newEmail = prompt("Nhập email mới:", consultant.email);
    const newPhone = prompt("Nhập số điện thoại mới:", consultant.phone);

    if (newName && newEmail && newPhone) {
      axios.put(`/api/consultants/${consultant._id}`, {
        name: newName,
        email: newEmail,
        phone: newPhone,
      }).then((res) => {
        setconsultants(consultants.map((t) => (t._id === consultant._id ? res.data : t)));
      }).catch((err) => console.error(err));
    }
  };

  const handleAdd = () => {
    if (newconsultant.username && newconsultant.name && newconsultant.email && newconsultant.phone) {
      axios.post("/api/consultants", newconsultant)
        .then((res) => {
          setconsultants([...consultants, res.data]);
          setNewconsultant({ username: "", name: "", email: "", phone: "" });
          setIsAddModalOpen(false); // Close the modal after adding
        })
        .catch((err) => console.error(err));
    } else {
      alert("Vui lòng nhập đầy đủ thông tin!");
    }
  };

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 p-6 bg-white">
        <h2 className="text-2xl font-bold mb-4">Consultant Management</h2>

        {/* Nút thêm nhân viên */}
        <button
          className="bg-green-500 text-white px-4 py-2 rounded mb-4 hover:bg-green-700"
          onClick={() => setIsAddModalOpen(true)}
        >
          Add consultant
        </button>

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
            {consultants.map((consultant) => (
              <tr key={consultant._id} className="text-center border-b">
                <td className="border p-2">{consultant._id}</td>
                <td className="border p-2">{consultant.username}</td>
                <td className="border p-2">{consultant.name}</td>
                <td className="border p-2">{consultant.email}</td>
                <td className="border p-2">{consultant.phone}</td>
                <td className="border p-2">
                  <button
                    className="bg-red-500 text-white px-3 py-1 rounded mr-2 hover:bg-red-700"
                    onClick={() => handleDelete(consultant._id)}
                  >
                    Delete
                  </button>
                  <button
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-700"
                    onClick={() => handleUpdate(consultant)}
                  >
                    Update
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Modal thêm nhân viên */}
        {isAddModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
            <div className="bg-white p-6 rounded-lg w-1/3">
              <h2 className="text-xl font-bold mb-4">Add consultant</h2>
              <input
                type="text"
                value={newconsultant.username}
                onChange={(e) => setNewconsultant({ ...newconsultant, username: e.target.value })}
                className="w-full p-2 border rounded mb-2"
                placeholder="Username"
              />
              <input
                type="text"
                value={newconsultant.name}
                onChange={(e) => setNewconsultant({ ...newconsultant, name: e.target.value })}
                className="w-full p-2 border rounded mb-2"
                placeholder="Name"
              />
              <input
                type="email"
                value={newconsultant.email}
                onChange={(e) => setNewconsultant({ ...newconsultant, email: e.target.value })}
                className="w-full p-2 border rounded mb-2"
                placeholder="Email"
              />
              <input
                type="text"
                value={newconsultant.phone}
                onChange={(e) => setNewconsultant({ ...newconsultant, phone: e.target.value })}
                className="w-full p-2 border rounded mb-4"
                placeholder="Phone"
              />
              <div className="flex justify-end">
                <button
                  className="bg-gray-500 text-white px-4 py-2 rounded mr-2 hover:bg-gray-700"
                  onClick={() => setIsAddModalOpen(false)}
                >
                  Cancel
                </button>
                <button
                  className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700"
                  onClick={handleAdd}
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
