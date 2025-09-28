import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { GoTrash } from "react-icons/go";

const UserTable = ({ search }) => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    userId: null,
  });

  // User's search
  const safeSearch = search ? search.toLowerCase() : "";

  const filteredUsers = customers.filter((user) => {
    const fullText = `${user?.firstName || ""} ${user?.lastName || ""} ${
      user?.email || ""
    }`;
    return fullText.toLowerCase().includes(safeSearch);
  });

  // Fetch user function
  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const res = await fetch("http://localhost:5001/api/customers", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        const data = await res.json();

        if (res.ok) {
          setCustomers(data);
        } else {
          console.error("Error fetching users:", data.msg);
        }
      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCustomers();
  }, []);

  // Delete user function
  const handleDelete = async () => {
    const id = confirmDialog.userId;
    if (!id) return;

    try {
      const res = await fetch(
        `http://backendsuperadmindashboard.onrender.com/api/customers/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      const data = await res.json();

      if (res.ok) {
        setCustomers((prev) => prev.filter((customer) => customer._id !== id));
        toast.success("Customer deleted successfully");
      } else {
        toast.error(data.msg || "Failed to delete customer");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    } finally {
      setConfirmDialog({ isOpen: false, userId: null });
    }
  };
  return (
    <div className="mt-6">
      <table className="table-auto w-full text-white border-collapse">
        <thead className="bg-[#0D0D0D]">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
              Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider hidden md:table-cell">
              Email
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider hidden md:table-cell">
              Joined Date
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"></th>
          </tr>
        </thead>
        <tbody className="bg-[#0D0D0D] divide-y divide-gray-700">
          {loading ? (
            <tr>
              <td
                colSpan="4"
                className="px-6 py-4 text-center text-gray-400 text-sm"
              >
                Loading users...
              </td>
            </tr>
          ) : filteredUsers.length > 0 ? (
            filteredUsers.map((customer) => (
              <tr key={customer._id || customer.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  {customer.firstName} {customer.lastName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm hidden md:table-cell">
                  {customer.email}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm hidden md:table-cell">
                  {new Date(customer.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-lg">
                  <button
                    onClick={() =>
                      setConfirmDialog({ isOpen: true, userId: customer._id })
                    }
                  >
                    <GoTrash
                      color="red"
                      onClick={() => handleDelete(customer._id)}
                    />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan="4"
                className="px-6 py-4 text-center text-gray-400 text-sm"
              >
                No users found
              </td>
            </tr>
          )}
        </tbody>
      </table>
      {confirmDialog.isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-lg font-bold text-black dark:text-white mb-4">
              Confirm Delete
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-6">
              Are you sure you want to delete this user? This action cannot be
              undone.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() =>
                  setConfirmDialog({ isOpen: false, userId: null })
                }
                className="px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      <Toaster
        position="top-center"
        toastOptions={{
          style: { background: "#333", color: "#fff" },
        }}
      />
    </div>
  );
};

export default UserTable;
