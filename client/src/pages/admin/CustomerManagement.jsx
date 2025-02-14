import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../../components/Sidebar";

export default function Customer() {
  const [customers, setCustomers] = useState([]);
  const [editCustomer, setEditCustomer] = useState(null);
  const [newCustomer, setNewCustomer] = useState({ username: "", name: "", email: "", phone: "" });
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  useEffect(() => {
    axios.get("http://localhost:5000/api/customers")
      .then((res) => setCustomers(res.data))
      .catch((err) => console.error(err));
  }, []);

  const handleDelete = (id) => {
    axios.delete(`http://localhost:5000/api/customers/${id}`)
      .then(() => setCustomers(customers.filter(customer => customer._id !== id)))
      .catch(err => console.error(err));
  };

  const handleUpdate = (customer) => {
    setEditCustomer(customer);
  };

  const handleSave = () => {
    axios.put(`http://localhost:5000/api/customers/${editCustomer._id}`, editCustomer)
      .then((res) => {
        setCustomers(customers.map(cust => cust._id === editCustomer._id ? res.data : cust));
        setEditCustomer(null);
      })
      .catch(err => console.error(err));
  };

  const handleAddCustomer = () => {
    axios.post("http://localhost:5000/api/customers", newCustomer)
      .then((res) => {
        setCustomers([...customers, res.data]);
        setNewCustomer({ username: "", name: "", email: "", phone: "" });
        setIsAddModalOpen(false); // Đóng modal sau khi thêm
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 p-6 bg-white">
        <h2 className="text-2xl font-bold mb-4">Customer Management</h2>

        {/* Nút Add Customer */}
        <div className="mb-4">
          <button
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700"
            onClick={() => setIsAddModalOpen(true)} // Mở modal khi nhấn nút Add Customer
          >
            Add Customer
          </button>
        </div>

        {/* Modal Add Customer */}
        {isAddModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
            <div className="bg-white p-6 rounded shadow-lg w-96">
              <h2 className="text-xl font-bold mb-4">Add New Customer</h2>
              <input 
                type="text" 
                className="w-full p-2 border rounded mb-2"
                value={newCustomer.username} 
                onChange={(e) => setNewCustomer({ ...newCustomer, username: e.target.value })}
                placeholder="Username"
              />
              <input 
                type="text" 
                className="w-full p-2 border rounded mb-2"
                value={newCustomer.name} 
                onChange={(e) => setNewCustomer({ ...newCustomer, name: e.target.value })}
                placeholder="Name"
              />
              <input 
                type="email" 
                className="w-full p-2 border rounded mb-2"
                value={newCustomer.email} 
                onChange={(e) => setNewCustomer({ ...newCustomer, email: e.target.value })}
                placeholder="Email"
              />
              <input 
                type="text" 
                className="w-full p-2 border rounded mb-4"
                value={newCustomer.phone} 
                onChange={(e) => setNewCustomer({ ...newCustomer, phone: e.target.value })}
                placeholder="Phone"
              />
              <div className="flex justify-end space-x-2">
                <button className="bg-gray-500 text-white px-3 py-1 rounded" onClick={() => setIsAddModalOpen(false)}>Cancel</button>
                <button className="bg-green-500 text-white px-3 py-1 rounded" onClick={handleAddCustomer}>Add</button>
              </div>
            </div>
          </div>
        )}

        {/* Bảng Customer */}
        <table className="w-full border-collapse border border-gray-300 mt-6">
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
                    onClick={() => handleUpdate(customer)}
                  >
                    Update
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal chỉnh sửa thông tin khách hàng */}
      {editCustomer && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Edit Customer</h2>
            <input 
              type="text" 
              className="w-full p-2 border rounded mb-2"
              value={editCustomer.username} 
              onChange={(e) => setEditCustomer({...editCustomer, username: e.target.value})} 
              placeholder="Username"
            />
            <input 
              type="text" 
              className="w-full p-2 border rounded mb-2"
              value={editCustomer.name} 
              onChange={(e) => setEditCustomer({...editCustomer, name: e.target.value})} 
              placeholder="Name"
            />
            <input 
              type="email" 
              className="w-full p-2 border rounded mb-2"
              value={editCustomer.email} 
              onChange={(e) => setEditCustomer({...editCustomer, email: e.target.value})} 
              placeholder="Email"
            />
            <input 
              type="text" 
              className="w-full p-2 border rounded mb-2"
              value={editCustomer.phone} 
              onChange={(e) => setEditCustomer({...editCustomer, phone: e.target.value})} 
              placeholder="Phone"
            />
            <div className="flex justify-end space-x-2">
              <button className="bg-gray-500 text-white px-3 py-1 rounded" onClick={() => setEditCustomer(null)}>Cancel</button>
              <button className="bg-green-500 text-white px-3 py-1 rounded" onClick={handleSave}>Save</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
