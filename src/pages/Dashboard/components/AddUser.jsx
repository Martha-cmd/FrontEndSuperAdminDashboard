import React, { useState } from "react";
import { IoCloseOutline } from "react-icons/io5";
import toast, { Toaster } from "react-hot-toast";
import { BeatLoader } from "react-spinners";

const AddUser = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await fetch("http://localhost:5001/api/customers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("Customer added successfully");
        onClose();
      } else {
        toast.error(data.msg || "Failed to add customer");
        setIsLoading(false);
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md mx-4">
        <div className="w-full flex justify-between items-center mb-4">
          <h3 className="font-bold text-lg text-black dark:text-white">
            Add New User
          </h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
          >
            <IoCloseOutline size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4 my-7">
          <div className="flex flex-col items-start gap-2">
            <h1>First Name</h1>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="flex justify-center py-3 px-2 w-96 bg-transparent border border-gray-300 rounded-[8px] appearance-none focus:outline-none focus:ring-0 dark:focus:border-white focus:border-black peer text-black dark:text-white"
              placeholder="enter first name"
              required
            />
          </div>

          <div className="flex flex-col items-start gap-2">
            <h1>Second Name</h1>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="flex justify-center py-3 px-2 w-96 bg-transparent border border-gray-300 rounded-[8px] appearance-none focus:outline-none focus:ring-0 dark:focus:border-white focus:border-black peer text-black dark:text-white"
              placeholder="enter last name"
              required
            />
          </div>

          <div className="flex flex-col items-start gap-2">
            <h1>Email</h1>
            <input
              type="text"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="flex justify-center py-3 px-2 w-96 bg-transparent border border-gray-300 rounded-[8px] appearance-none focus:outline-none focus:ring-0 dark:focus:border-white focus:border-black peer text-black dark:text-white"
              placeholder="enter email address"
              required
            />
          </div>

          <div className="modal-action mt-6 flex gap-3 justify-end">
            <button
              onClick={onClose}
              className="px-6 py-2 bg-gray-300 text-black hover:bg-gray-400 duration-300 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-orange-500 text-white hover:bg-orange-700 duration-300 rounded"
            >
              {isLoading ? <BeatLoader size={10} color="white" /> : "Add User"}
            </button>
          </div>
        </form>
      </div>

      <Toaster
        position="top-center"
        toastOptions={{
          duration: 4000,
          style: {
            background: "#363636",
            color: "#fff",
          },
          success: {
            duration: 3000,
            iconTheme: {
              primary: "#10B981",
              secondary: "#fff",
            },
          },
          error: {
            duration: 4000,
            iconTheme: {
              primary: "#EF4444",
              secondary: "#fff",
            },
          },
          loading: {
            duration: Infinity,
          },
        }}
      />
    </div>
  );
};

export default AddUser;
