import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../../components/Sidebar";

export default function ServiceManagement() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editService, setEditService] = useState(null);
  const [newService, setNewService] = useState({ name: "", description: "", price: "", image: "" });
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  useEffect(() => {
    axios.get("http://localhost:5000/api/services")
      .then((res) => setServices(res.data))
      .catch((err) => console.error("Lỗi khi lấy dữ liệu:", err))
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Bạn có chắc muốn xóa dịch vụ này?")) return;

    try {
      await axios.delete(`http://localhost:5000/api/services/${id}`);
      setServices((prevServices) => prevServices.filter(service => service._id !== id));
    } catch (err) {
      console.error("Lỗi khi xóa dịch vụ:", err);
    }
  };

  const openEditModal = (service) => {
    setEditService(service);
  };

  const closeEditModal = () => {
    setEditService(null);
  };

  const handleUpdate = async () => {
    if (!editService) return;

    try {
      const res = await axios.put(`http://localhost:5000/api/services/${editService._id}`, {
        name: editService.name,
        description: editService.description,
        price: editService.price,
        image: editService.image, // Thêm trường image
      });

      setServices((prevServices) =>
        prevServices.map(service => (service._id === editService._id ? res.data : service))
      );

      closeEditModal();
    } catch (err) {
      console.error("Lỗi khi cập nhật dịch vụ:", err);
    }
  };

  // Xử lý thêm dịch vụ mới
  const handleAddService = async () => {
    if (!newService.name || !newService.description || !newService.price || !newService.image) {
      alert("Vui lòng nhập đầy đủ thông tin!");
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/api/services", newService);
      setServices([...services, res.data]);
      setIsAddModalOpen(false);
      setNewService({ name: "", description: "", price: "", image: "" });
    } catch (err) {
      console.error("Lỗi khi thêm dịch vụ:", err);
    }
  };

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 p-6 bg-white">
        <h2 className="text-2xl font-bold mb-4">Service Management</h2>

        {/* Nút thêm dịch vụ */}
        <button
          className="bg-green-500 text-white px-4 py-2 rounded mb-4 hover:bg-green-700"
          onClick={() => setIsAddModalOpen(true)}
        >
          Add Service
        </button>

        {loading ? (
          <div className="flex justify-center items-center">
            <div className="spinner"></div>
          </div>
        ) : (
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-pink-300">
                <th className="border p-2">ID</th>
                <th className="border p-2">Service Name</th>
                <th className="border p-2">Description</th>
                <th className="border p-2">Price</th>
                <th className="border p-2">Image</th> {/* Cột mới */}
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
                    {service.image ? <img src={service.image} alt={service.name} className="w-16 h-16 object-cover" /> : "No Image"}
                  </td> {/* Hiển thị ảnh */}
                  <td className="border p-2">
                    <button
                      className="bg-red-500 text-white px-3 py-1 rounded mr-2 hover:bg-red-700"
                      onClick={() => handleDelete(service._id)}
                    >
                      Delete
                    </button>
                    <button
                      className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-700"
                      onClick={() => openEditModal(service)}
                    >
                      Update
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {/* Modal chỉnh sửa dịch vụ */}
        {editService && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
            <div className="bg-white p-6 rounded-lg w-1/3">
              <h2 className="text-xl font-bold mb-4">Chỉnh sửa dịch vụ</h2>
              <input
                type="text"
                value={editService.name}
                onChange={(e) => setEditService({ ...editService, name: e.target.value })}
                className="w-full p-2 border rounded mb-2"
                placeholder="Service Name"
              />
              <textarea
                value={editService.description}
                onChange={(e) => setEditService({ ...editService, description: e.target.value })}
                className="w-full p-2 border rounded mb-2"
                placeholder="Description"
              />
              <input
                type="number"
                value={editService.price}
                onChange={(e) => setEditService({ ...editService, price: e.target.value })}
                className="w-full p-2 border rounded mb-4"
                placeholder="Price"
              />
              <input
                type="text"
                value={editService.image}
                onChange={(e) => setEditService({ ...editService, image: e.target.value })}
                className="w-full p-2 border rounded mb-2"
                placeholder="Image URL"
              />
              <div className="flex justify-end">
                <button className="bg-gray-500 text-white px-4 py-2 rounded mr-2 hover:bg-gray-700" onClick={closeEditModal}>Cancel</button>
                <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700" onClick={handleUpdate}>Save</button>
              </div>
            </div>
          </div>
        )}

        {/* Modal thêm dịch vụ */}
        {isAddModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
            <div className="bg-white p-6 rounded-lg w-1/3">
              <h2 className="text-xl font-bold mb-4">Add Service</h2>
              <input type="text" value={newService.name} onChange={(e) => setNewService({ ...newService, name: e.target.value })} className="w-full p-2 border rounded mb-2" placeholder="Service Name" />
              <textarea value={newService.description} onChange={(e) => setNewService({ ...newService, description: e.target.value })} className="w-full p-2 border rounded mb-2" placeholder="Description" />
              <input type="number" value={newService.price} onChange={(e) => setNewService({ ...newService, price: e.target.value })} className="w-full p-2 border rounded mb-4" placeholder="Price" />
              <input
                type="text"
                value={newService.image}
                onChange={(e) => setNewService({ ...newService, image: e.target.value })}
                className="w-full p-2 border rounded mb-4"
                placeholder="Image URL"
              />
              <div className="flex justify-end">
                <button className="bg-gray-500 text-white px-4 py-2 rounded mr-2 hover:bg-gray-700" onClick={() => setIsAddModalOpen(false)}>Cancel</button>
                <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700" onClick={handleAddService}>Add</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
