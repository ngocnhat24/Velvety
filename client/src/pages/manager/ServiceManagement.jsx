import { useState, useEffect } from "react";
import axios from "../../utils/axiosInstance";
import { useForm } from "react-hook-form";
import Sidebar from "../../components/ManagerSidebar";
import ReactQuill from 'react-quill';
import "react-quill/dist/quill.snow.css";
import { Dialog, DialogActions, DialogContent, DialogTitle, Button } from "@mui/material";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaEdit, FaTrash } from "react-icons/fa";

const ServiceManagement = () => {
  const [services, setServices] = useState([]);
  const [editingService, setEditingService] = useState(null);
  const { register, handleSubmit, reset, setValue, watch } = useForm({
    defaultValues: {
      detaildescription: "",
    }
  });
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [serviceToDelete, setServiceToDelete] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");


  useEffect(() => {
    fetchServices();
  }, []);

  useEffect(() => {
    console.log("Editing Service Data:", editingService);
  }, [editingService]);

  useEffect(() => {
    if (editingService) {
      setValue("detaildescription", editingService.detaildescription || "");
    }
  }, [editingService, setValue]);  // Depend on `editingService` and `setValue`

  const fetchServices = async () => {
    try {
      const response = await axios.get("/api/services");
      setServices(response.data);
    } catch (error) {
      console.error("Error fetching services", error);
      toast.error("Failed to load services.");
    }
  };

  const onSubmit = async (data) => {
    try {
      if (editingService) {
        await axios.put(`/api/services/${editingService._id}`, data);
        toast.success("Service updated successfully!");
      } else {
        await axios.post("/api/services", data);
        toast.success("Service created successfully!");
      }
      reset();
      setEditingService(null);
      fetchServices();
    } catch (error) {
      console.error("Error saving service", error);
      toast.error("Failed to save service.");
    }
  };

  const handleEdit = (service) => {
    setEditingService(service);
    reset(); // Clear previous state completely
    setTimeout(() => {
      setValue("name", service.name || "");
      setValue("price", service.price || "");
      setValue("image", service.image || "");
      setValue("effectimage", service.effectimage || "");
      setValue("resultimage", service.resultimage || "");
      setValue("sensationimage", service.sensationimage || "");
      setValue("description", service.description || "");
      setValue("detaildescription", service.detaildescription || "");
    }, 0);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`/api/services/${serviceToDelete._id}`);
      toast.success("Service deleted successfully!");
      fetchServices();
      setOpenDeleteDialog(false);
    } catch (error) {
      console.error("Error deleting service", error);
      toast.error("Failed to delete service.");
    }
  };

  const openDeleteConfirmation = (service) => {
    setServiceToDelete(service);
    setOpenDeleteDialog(true);
  };

  const closeDeleteConfirmation = () => {
    setOpenDeleteDialog(false);
    setServiceToDelete(null);
  };

  const filteredServices = services
    .filter(service => service.name.toLowerCase().includes(searchQuery.toLowerCase()))
    .sort((a, b) => sortOrder === "asc" ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name));



  return (
    <div className="flex">
      <Sidebar />
      <div className="p-6 w-full">
        <ToastContainer />
        <h2 className="text-2xl font-bold mb-4">Service Management</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 bg-gray-100 p-4 rounded">
          <input {...register("name", { required: true })} placeholder="Name" className="w-full p-2 border" />
          <input {...register("price", { required: true })} placeholder="Price" className="w-full p-2 border" />
          <input {...register("image")} placeholder="Image URL" className="w-full p-2 border" />
          {editingService?.image && <img src={editingService.image} alt="Service Preview" className="w-32 h-32 object-cover mt-2" />}
          <input {...register("effectimage")} placeholder="Effect Image URL" className="w-full p-2 border" />
          <input {...register("resultimage")} placeholder="Result Image URL" className="w-full p-2 border" />
          <input {...register("sensationimage")} placeholder="Sensation Image URL" className="w-full p-2 border" />
          <input {...register("description")} placeholder="Description" className="w-full p-2 border" />
          <ReactQuill
            value={watch("detaildescription") || ""}
            onChange={(value) => setValue("detaildescription", value)}
            placeholder="Detailed Description"
          />
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">{editingService ? "Update" : "Create"} Service</button>
        </form>

        <div className="mt-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold">Service List</h3>
            <div className="flex space-x-2">
              <input type="text" placeholder="Search Services" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="p-2 border rounded w-64" />
              <button onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")} className="bg-gray-500 text-white px-4 py-2 rounded">
                {sortOrder === "asc" ? "Sort Z-A" : "Sort A-Z"}
              </button>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredServices.map((service) => (
              <div key={service._id} className="border p-4">
                {service.image && <img src={service.image} alt="Service" className="w-10 h-10 object-cover mb-2" />}
                <h4 className="text-lg font-bold">{service.name}</h4>
                <p>{service.description}</p>
                <button onClick={() => handleEdit(service)} className="bg-yellow-500 text-white px-3 py-1 mr-2 rounded mt-4"><FaEdit /></button>
                <button onClick={() => openDeleteConfirmation(service)} className="bg-red-500 text-white px-3 py-1 rounded mt-4"><FaTrash /></button>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Dialog open={openDeleteDialog} onClose={closeDeleteConfirmation}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>Are you sure you want to delete this service?</DialogContent>
        <DialogActions>
          <Button onClick={closeDeleteConfirmation} color="primary">Cancel</Button>
          <Button onClick={handleDelete} color="secondary">Delete</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ServiceManagement;
