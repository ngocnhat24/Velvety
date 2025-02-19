import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../../components/ManagerSidebar";

export default function ServiceManagement() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editService, setEditService] = useState(null);
  const [newService, setNewService] = useState({ name: "", description: "", price: "", image: "" });
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredServices, setFilteredServices] = useState([]);
  const [sortOrder, setSortOrder] = useState("default");

  useEffect(() => {
    axios.get("/api/services")
      .then((res) => {
        setServices(res.data);
        setFilteredServices(res.data);
      })
      .catch((err) => console.error("Lỗi khi lấy dữ liệu:", err))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    let sortedServices = [...services];
    if (sortOrder === "lowToHigh") {
      sortedServices.sort((a, b) => a.price - b.price);
    } else if (sortOrder === "highToLow") {
      sortedServices.sort((a, b) => b.price - a.price);
    }
    setFilteredServices(
      sortedServices.filter(service =>
        service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        service.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, services, sortOrder]);

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
        image: editService.image,
      });

      setServices((prevServices) =>
        prevServices.map(service => (service._id === editService._id ? res.data : service))
      );

      closeEditModal();
    } catch (err) {
      console.error("Lỗi khi cập nhật dịch vụ:", err);
    }
  };

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

        <div className="flex mb-4 space-x-4">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Search services..."
          />
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="p-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="lowToHigh">Price: Low to High</option>
            <option value="highToLow">Price: High to Low</option>
          </select>
        </div>

        <button
          className="bg-green-500 text-white px-4 py-2 rounded mb-4 hover:bg-green-700 shadow-sm"
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
                <th className="border p-2">Image</th>
                <th className="border p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredServices.map((service) => (
                <tr key={service._id} className="text-center border-b">
                  <td className="border p-2">{service._id}</td>
                  <td className="border p-2">{service.name}</td>
                  <td className="border p-2">{service.description}</td>
                  <td className="border p-2">{service.price}</td>
                  <td className="border p-2">
                    {service.image ? <img src={service.image} alt={service.name} className="w-16 h-16 object-cover" /> : "No Image"}
                  </td>
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
