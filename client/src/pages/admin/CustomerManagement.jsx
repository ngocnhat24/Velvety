import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../../components/Sidebar";

export default function CustomerDashboard() {
  const [customers, setCustomers] = useState([]);

  // Lấy dữ liệu từ API
  useEffect(() => {
    axios.get("http://localhost:5000/api/customers")
      .then((res) => setCustomers(res.data))
      .catch((err) => console.error(err));
  }, []);

  // Xóa khách hàng
  const handleDelete = (id) => {
    axios.delete(`http://localhost:5000/api/customers/${id}`)
      .then(() => setCustomers(customers.filter(customer => customer._id !== id)))
      .catch(err => console.error(err));
  };

  // Cập nhật khách hàng
  const handleUpdate = (id) => {
    const newName = prompt("Nhập tên mới:");
    if (newName) {
      axios.put(`http://localhost:5000/api/customers/${id}`, { name: newName })
        .then((res) => {
          setCustomers(customers.map(customer => customer._id === id ? res.data : customer));
        })
        .catch(err => console.error(err));
    }
  };

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 p-6 bg-white">
        <h2 className="text-2xl font-bold mb-4">Customer Dashboard</h2>
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
            {customers.map((customer) => (
              <tr key={customer._id} className="text-center border-b">
                <td className="border p-2">{customer._id}</td>
                <td className="border p-2">{customer.username}</td>
                <td className="border p-2">{customer.name}</td>
                <td className="border p-2">{customer.email}</td>
                <td className="border p-2">{customer.phone}</td>
                <td className="border p-2">
                  <button
                    className="bg-red-500 text-white px-3 py-1 rounded mr-2 hover:bg-red-700"
                    onClick={() => handleDelete(customer._id)}
                  >
                    Delete
                  </button>
                  <button
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-700"
                    onClick={() => handleUpdate(customer._id)}
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
