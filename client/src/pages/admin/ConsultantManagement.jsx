import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "../../utils/axiosInstance";
import Sidebar from "../../components/AdminSidebar";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaEdit, FaLock, FaTrash } from "react-icons/fa";

// Validation schema for form inputs
const schema = yup.object().shape({
  firstName: yup.string().min(2, "First name must be at least 2 letters").required("First name is required"),
  lastName: yup.string().min(2, "Last name must be at least 2 letters").required("Last name is required"),
  email: yup.string().email("Invalid email format").required("Email is required"),
  phoneNumber: yup.string().matches(/^\d{10,15}$/, "Phone number must be 10-15 digits long").required("Phone number is required"),
  note: yup.string(),
  image: yup.string().url("Invalid image URL").nullable(),
});

export default function ConsultantManagement() {
  const [consultants, setConsultants] = useState([]);
  const [modalData, setModalData] = useState(null);

  useEffect(() => {
    fetchConsultants();
  }, []);

  const fetchConsultants = async () => {
    try {
      const res = await axios.get("/api/consultants");
      setConsultants(res.data.map(c => ({
        ...c,
        note: c.note,
        image: c.image,
        verified: c.verified
      })));
    } catch (err) {
      toast.error("Failed to fetch consultants");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/consultants/${id}`);
      setConsultants((prev) => prev.filter((c) => c._id !== id));
      toast.success("Consultant deleted successfully");
    } catch (err) {
      toast.error("Error deleting consultant");
    }
  };

  const handleResetPassword = async (id) => {
    if (!window.confirm("Are you sure you want to reset this consultant's password?")) return;
  
    try {
      await axios.post(`/api/consultants/${id}/reset-password`);
      toast.success("Password has been reset successfully!");
    } catch (err) {
      toast.error("Failed to reset password.");
    }
  };
  

  const handleFormSubmit = async (data) => {
    try {
      const updatedData = {
        ...data,
        verified: Boolean(data.verified),
      };

      if (modalData?._id) {
        const res = await axios.put(`/api/consultants/${modalData._id}`, updatedData);
        setConsultants((prev) =>
          prev.map((c) => (c._id === modalData._id ? { ...c, ...res.data.consultant } : c))
        );
        toast.success("Consultant updated successfully");
      } else {
        const res = await axios.post("/api/consultants", {
          ...updatedData,
          password: "default123",
          roleName: "Consultant"
        });
        setConsultants((prev) => [...prev, res.data.consultant]);
        toast.success("Consultant added successfully");
      }
    } catch (err) {
      toast.error("Error saving consultant");
    }
    setModalData(null);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 p-8 bg-white shadow-lg rounded-lg">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Consultant Management</h2>
        <button className="bg-blue-500  text-white px-6 py-3 rounded-full mb-6 hover:bg-blue-600 transition-all duration-300" onClick={() => setModalData({})}>
          Add Consultant
        </button>
        <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
          <table className="w-full table-auto">
            <thead className="bg-gray-200">
              <tr>
                <th className="p-3 text-left text-sm font-medium text-gray-700">First Name</th>
                <th className="p-3 text-left text-sm font-medium text-gray-700">Last Name</th>
                <th className="p-3 text-left text-sm font-medium text-gray-700">Email</th>
                <th className="p-3 text-left text-sm font-medium text-gray-700">Phone</th>
                <th className="p-3 text-left text-sm font-medium text-gray-700">Note</th>
                <th className="p-3 text-left text-sm font-medium text-gray-700">Image</th>
                <th className="p-3 text-left text-sm font-medium text-gray-700">Verified</th>
                <th className="p-3 text-left text-sm font-medium text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {consultants.map((consultant) => (
                <tr key={consultant._id} className="border-b hover:bg-gray-50 transition-all">
                  <td className="p-3 text-sm">{consultant.firstName}</td>
                  <td className="p-3 text-sm">{consultant.lastName}</td>
                  <td className="p-3 text-sm">{consultant.email}</td>
                  <td className="p-3 text-sm">{consultant.phoneNumber}</td>
                  <td className="p-3 text-sm">{consultant.note}</td>
                  <td className="p-3 text-sm">
                    {consultant.image ? <img src={consultant.image} alt="Consultant" className="w-12 h-12 object-cover rounded-full" /> : "No Image"}
                  </td>
                  <td className="p-3 text-sm">
                    {consultant.verified ? (
                      <i className="fas fa-check-circle text-green-500"></i>
                    ) : (
                      <i className="fas fa-times-circle text-red-500"></i>
                    )}
                  </td>
                  <td className="p-3 text-sm">
                    <button className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 mr-2" onClick={() => setModalData(consultant)}><FaEdit /></button>
                    <button className="bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600" onClick={() => handleDelete(consultant._id)}><FaTrash /></button>
                    <button
                      className="bg-yellow-500 text-white px-4 py-2 rounded-full hover:bg-yellow-600 mr-2"
                      onClick={() => handleResetPassword(consultant._id)}
                    >
                      <FaLock />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {modalData !== null && <ConsultantForm data={modalData} onSubmit={handleFormSubmit} onClose={() => setModalData(null)} />}
      </div>
    </div>
  );
}

function ConsultantForm({ data, onSubmit, onClose }) {
  const { register, handleSubmit, formState: { errors }, reset, watch } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      firstName: data.firstName || "",
      lastName: data.lastName || "",
      email: data.email || "",
      phoneNumber: data.phoneNumber || "",
      note: data.note || "",
      image: data.image || "",
      verified: data.verified || false,
    },
  });

  useEffect(() => {
    reset({
      firstName: data.firstName || "",
      lastName: data.lastName || "",
      email: data.email || "",
      phoneNumber: data.phoneNumber || "",
      note: data.note || "",
      image: data.image || "",
      verified: !!data.verified,
    });
  }, [data, reset]);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="bg-white p-8 rounded-lg w-1/3 shadow-xl">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">{data?._id ? "Update Consultant" : "Add Consultant"}</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          {["firstName", "lastName", "email", "phoneNumber", "note", "image"].map((field) => (
            <div key={field} className="mb-4">
              <input
                {...register(field)}
                className="w-full p-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
              />
              {errors[field] && <p className="text-red-500 text-sm mt-1">{errors[field]?.message}</p>}
            </div>
          ))}

          {/* Verified Toggle */}
          <div className="flex items-center mb-6">
            <input
              type="checkbox"
              {...register("verified")}
              id="verified"
              className="mr-3"
              checked={watch("verified")}
              onChange={() => reset({ ...watch(), verified: !watch("verified") })}
            />
            <label htmlFor="verified" className="text-gray-700 font-medium">Verified</label>
          </div>

          <div className="flex justify-end space-x-4">
            <button type="submit" className="bg-blue-500 text-white px-6 py-3 rounded-full hover:bg-blue-600">Save</button>
            <button type="button" className="bg-gray-500 text-white px-6 py-3 rounded-full hover:bg-gray-600" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}
