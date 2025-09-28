import React, { useState } from "react";
import { FaRegEye } from "react-icons/fa";
import { PiEyeClosed } from "react-icons/pi";
import { Link, useNavigate } from "react-router-dom";
import { BeatLoader } from "react-spinners";
import toast, { Toaster } from "react-hot-toast";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await fetch(
        "https://backendsuperadmindashboard-0a1b.onrender.com/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      const data = await res.json();

      if (res.ok) {
        console.log("Logged in", data);
        localStorage.setItem("token", data.token);
        localStorage.setItem(
          "user",
          JSON.stringify({
            _id: data._id,
            email: data.email,
            role: data.role,
            name: data.name,
          })
        );
        toast.success("Logged in successfully");

        setTimeout(() => {
          navigate("/home/analytics");
        }, 2000);
      } else {
        toast.error(data.msg || "Login failed. Please try again.");
      }
    } catch (err) {
      console.error("Error:", err);
      toast.error("Something went wrong. Try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="w-full h-screen flex flex-col items-center justify-center bg-white dark:bg-black dark:text-white md:px-0 px-10">
      <h1 className="font-bold text-2xl dark:text-white">Welcome Admin</h1>

      <form
        onSubmit={handleLogin}
        className="w-full flex flex-col justify-center items-center mt-8 mb-2 gap-6"
      >
        <div className="md:w-auto w-full flex flex-col items-start gap-2">
          <h1>Email</h1>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="flex justify-center py-3 px-2 md:w-96 w-full bg-transparent border border-gray-300 rounded-[8px] appearance-none focus:outline-none focus:ring-0 dark:focus:border-white focus:border-black peer text-black dark:text-white"
            placeholder="Your email address"
            required
          />
        </div>

        <div className="md:w-auto w-full flex flex-col items-start gap-2">
          <h1>Password</h1>
          <div className="md:w-96 w-full flex justify-between items-center border border-gray-300 rounded-[8px] appearance-none focus:outline-none focus:ring-0 dark:focus:border-white text-black dark:text-white focus:border-black pr-3">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="flex justify-center py-3 px-2 bg-transparent border border-none appearance-none focus:outline-none focus:ring-0 focus:border-none peer text-black dark:text-white"
              placeholder="Your password"
              required
            />

            {showPassword ? (
              <FaRegEye size={18} onClick={() => setShowPassword(false)} />
            ) : (
              <PiEyeClosed size={18} onClick={() => setShowPassword(true)} />
            )}
          </div>
        </div>

        <button
          type="submit"
          className="md:w-96 w-full mt-10 py-3 bg-black text-white dark:text-black text-lg font-semibold rounded dark:bg-white"
        >
          {isLoading ? (
            <BeatLoader
              size={10}
              color="currentColor"
              className="text-white dark:text-black"
            />
          ) : (
            "Sign in"
          )}
        </button>
      </form>
      <Link to={"/signup"} className="cursor-pointer">
        <p>
          Don't have an account? <span className="text-blue-800">Sign up</span>
        </p>
      </Link>

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
    </main>
  );
};

export default Login;
