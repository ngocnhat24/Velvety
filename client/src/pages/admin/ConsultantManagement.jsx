import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../../components/AdminSidebar";

export default function ConsultantManagement() {
  const [consultants, setConsultants] = useState([]);
  const [newConsultant, setNewConsultant] = useState({ username: "", name: "", email: "", phone: "" });
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    axios.get("/api/skin-consultants")
      .then((res) => setConsultants(res.data))
      .catch((err) => console.error(err));

    axios.get("/api/bookings")
      .then((res) => setBookings(res.data))
      .catch((err) => console.error(err));
  }, []);

  const handleDelete = (id) => {
    axios.delete(`/api/skin-consultants/${id}`)
      .then(() => setConsultants(consultants.filter(consultant => consultant._id !== id)))
      .catch(err => console.error(err));
  };

  const handleUpdate = (consultant) => {
    const newName = prompt("Nhập tên mới:", consultant.name);
    const newEmail = prompt("Nhập email mới:", consultant.email);
    const newPhone = prompt("Nhập số điện thoại mới:", consultant.phone);

    if (newName && newEmail && newPhone) {
      axios.put(`/api/skin-consultants/${consultant._id}`, {
        name: newName,
        email: newEmail,
        phone: newPhone,
      }).then((res) => {
        setConsultants(consultants.map((c) => (c._id === consultant._id ? res.data : c)));
      }).catch((err) => console.error(err));
    }
  };

  const handleAdd = () => {
    if (newConsultant.username && newConsultant.name && newConsultant.email && newConsultant.phone) {
      axios.post("/api/skin-consultants", newConsultant)
        .then((res) => {
          setConsultants([...consultants, res.data]);
          setNewConsultant({ username: "", name: "", email: "", phone: "" });
          setIsAddModalOpen(false);
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

        <button
          className="bg-green-500 text-white px-4 py-2 rounded mb-4 hover:bg-green-700"
          onClick={() => setIsAddModalOpen(true)}
        >
          Add Consultant
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

        {isAddModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
            <div className="bg-white p-6 rounded-lg w-1/3">
              <h2 className="text-xl font-bold mb-4">Add Consultant</h2>
              <input
                type="text"
                value={newConsultant.username}
                onChange={(e) => setNewConsultant({ ...newConsultant, username: e.target.value })}
                className="w-full p-2 border rounded mb-2"
                placeholder="Username"
              />
              <input
                type="text"
                value={newConsultant.name}
                onChange={(e) => setNewConsultant({ ...newConsultant, name: e.target.value })}
                className="w-full p-2 border rounded mb-2"
                placeholder="Name"
              />
              <input
                type="email"
                value={newConsultant.email}
                onChange={(e) => setNewConsultant({ ...newConsultant, email: e.target.value })}
                className="w-full p-2 border rounded mb-2"
                placeholder="Email"
              />
              <input
                type="text"
                value={newConsultant.phone}
                onChange={(e) => setNewConsultant({ ...newConsultant, phone: e.target.value })}
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

        <h2 className="text-2xl font-bold mt-8 mb-4">Bookings</h2>
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-blue-300">
              <th className="border p-2">Booking ID</th>
              <th className="border p-2">Consultant ID</th>
              <th className="border p-2">Customer Name</th>
              <th className="border p-2">Date</th>
              <th className="border p-2">Time</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking._id} className="text-center border-b">
                <td className="border p-2">{booking._id}</td>
                <td className="border p-2">{booking.consultantId}</td>
                <td className="border p-2">{booking.customerName}</td>
                <td className="border p-2">{booking.date}</td>
                <td className="border p-2">{booking.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}