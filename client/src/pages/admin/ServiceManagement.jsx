import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../../components/Sidebar";

export default function ServiceManagement() {
  const [services, setServices] = useState([]);

  // Lấy dữ liệu từ API
  useEffect(() => {
    axios.get("http://localhost:5000/api/services")
      .then((res) => setServices(res.data))
      .catch((err) => console.error(err));
  }, []);

  // Xóa dịch vụ
  const handleDelete = (id) => {
    axios.delete(`http://localhost:5000/api/services/${id}`)
      .then(() => setServices(services.filter(service => service._id !== id)))
      .catch(err => console.error(err));
  };

  // Cập nhật dịch vụ
  const handleUpdate = (id) => {
    const newName = prompt("Nhập tên dịch vụ mới:");
    if (newName) {
      axios.put(`http://localhost:5000/api/services/${id}`, { name: newName })
        .then((res) => {
          setServices(services.map(service => service._id === id ? res.data : service));
        })
        .catch(err => console.error(err));
    }
  };

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 p-6 bg-white">
        <h2 className="text-2xl font-bold mb-4">Service Management</h2>
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-pink-300">
              <th className="border p-2">ID</th>
              <th className="border p-2">Service Name</th>
              <th className="border p-2">Description</th>
              <th className="border p-2">Price</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {services.map((service) => (
              <tr key={service._id} className="text-center border-b">
                <td className="border p-2">{service._id}</td>
                <td className="border p-2">{service.name}</td>
                <td className="border p-2">{service.description}</td>
                <td className="border p-2">{service.price}</td>
                <td className="border p-2">
                  <button
                    className="bg-red-500 text-white px-3 py-1 rounded mr-2 hover:bg-red-700"
                    onClick={() => handleDelete(service._id)}
                  >
                    Delete
                  </button>
                  <button
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-700"
                    onClick={() => handleUpdate(service._id)}
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
