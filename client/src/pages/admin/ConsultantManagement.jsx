import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "../../utils/axiosInstance";
import Sidebar from "../../components/AdminSidebar";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


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

  const handleFormSubmit = async (data) => {
    try {
        const updatedData = {
            ...data,
            verified: Boolean(data.verified), // ✅ Ensure it's a boolean
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
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 p-6 bg-white">
        <h2 className="text-2xl font-bold mb-4">Consultant Management</h2>
        <button className="bg-green-500 text-white px-4 py-2 rounded mb-4 hover:bg-green-700" onClick={() => setModalData({})}>
          Add Consultant
        </button>
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-green-300">
              <th className="border p-2">First Name</th>
              <th className="border p-2">Last Name</th>
              <th className="border p-2">Email</th>
              <th className="border p-2">Phone</th>
              <th className="border p-2">Note</th>
              <th className="border p-2">Image</th>
              <th className="border p-2">Verified</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {consultants.map((consultant) => (
              <tr key={consultant._id} className="text-center border-b hover:bg-gray-100">
                <td className="border p-2">{consultant.firstName}</td>
                <td className="border p-2">{consultant.lastName}</td>
                <td className="border p-2">{consultant.email}</td>
                <td className="border p-2">{consultant.phoneNumber}</td>
                <td className="border p-2">{consultant.note}</td>
                <td className="border p-2"> {consultant.image ? <img src={consultant.image} alt="Consultant" className="w-16 h-16 object-cover rounded" /> : "No Image"}</td>
                <td>
                  {consultant.verified ? (
                    <span className="text-green-600 font-semibold">Enabled</span>
                  ) : (
                    <span className="text-red-600 font-semibold">Disabled</span>
                  )}
                </td>
                <td className="border p-2">
                  <button className="bg-blue-500 text-white px-3 py-1 rounded mr-2 hover:bg-blue-700" onClick={() => setModalData(consultant)}>Update</button>
                  <button className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700" onClick={() => handleDelete(consultant._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
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
      verified: data.verified || false,  // ✅ Ensure `verified` has a default boolean value
    },
  });

  useEffect(() => {
    console.log("Fetched Data:", data);  // ✅ Debug backend response
    console.log("Verified Value from Backend:", data.verified);  
    reset({
      firstName: data.firstName || "",
      lastName: data.lastName || "",
      email: data.email || "",
      phoneNumber: data.phoneNumber || "",
      note: data.note || "",
      image: data.image || "",
      verified: !!data.verified, // ✅ Ensure it's always a boolean (true/false)
    });
  }, [data, reset]);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg w-1/3">
        <h2 className="text-xl font-bold mb-4">{data?._id ? "Update" : "Add"} Consultant</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          {["firstName", "lastName", "email", "phoneNumber", "note", "image"].map((field) => (
            <div key={field}>
              <input {...register(field)} className="w-full p-2 border rounded mb-2" placeholder={field.charAt(0).toUpperCase() + field.slice(1)} />
              {errors[field] && <p className="text-red-500 text-sm">{errors[field]?.message}</p>}
            </div>
          ))}

          {/* Verified Toggle */}
          <div className="flex items-center mt-4">
            <input
              type="checkbox"
              {...register("verified")}
              id="verified"
              className="mr-2"
              checked={watch("verified")}  // ✅ Ensure UI reflects state
              defaultChecked={data.verified}
              onChange={(e) => reset({ ...watch(), verified: e.target.checked })}  // ✅ Keep state in sync
            />
            <label htmlFor="verified" className="text-sm font-medium">Verified</label>
          </div>

          <div className="flex justify-end space-x-2 mt-4">
            <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700">Save</button>
            <button type="button" className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}

