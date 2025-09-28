import React, { useState } from "react";
import { FaRegEye } from "react-icons/fa";
import { PiEyeClosed } from "react-icons/pi";
import { Link, useNavigate } from "react-router-dom";
import { BeatLoader } from "react-spinners";
import toast, { Toaster } from "react-hot-toast";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await fetch(
        "http://backendsuperadmindashboard.onrender.com/api/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: `${formData.firstName} ${formData.lastName}`,
            email: formData.email,
            password: formData.password,
          }),
        }
      );

      const data = await res.json();

      if (res.ok) {
        console.log("Regsitered", data);
        toast.success("Registered successfully");
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));

        setTimeout(() => {
          navigate("/home/analytics");
        }, 2000);
      } else {
        toast.error(data.msg || "Registration failed. Please try again.");
        setTimeout(() => {
          setIsLoading(false);
        }, 1000);
      }
    } catch (error) {
      console.error("Error during registration", error);
      alert("Something went wrong. Try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="w-full md:h-screen h-full md:py-0 py-10 flex flex-col items-center justify-center bg-white dark:bg-black dark:text-white md:px-0 px-10">
      <h1 className="font-bold text-2xl dark:text-white">Sign up</h1>

      <form
        onSubmit={handleRegister}
        className="w-full flex flex-col items-center mt-8 mb-2 gap-6"
      >
        <div className="md:w-auto w-full flex lg:flex-row flex-col gap-10">
          <div className="flex flex-col items-start gap-2">
            <h1>First Name</h1>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="flex justify-center py-3 px-2 md:w-96 w-full bg-transparent border border-gray-300 rounded-[8px] appearance-none focus:outline-none focus:ring-0 focus:border-black   dark:focus:border-white peer text-black dark:text-white"
              placeholder="Your first name"
              required
            />
          </div>

          <div className="flex flex-col items-start gap-2">
            <h1>Last Name</h1>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="flex justify-center py-3 px-2 md:w-96 w-full bg-transparent border border-gray-300 rounded-[8px] appearance-none focus:outline-none focus:ring-0 focus:border-black dark:focus:border-white peer text-black dark:text-white"
              placeholder="Your last name"
              required
            />
          </div>
        </div>

        <div className="md:w-auto w-full flex lg:flex-row flex-col gap-10">
          <div className="flex flex-col items-start gap-2">
            <h1>Email</h1>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="flex justify-center py-3 px-2 w-full md:w-96 bg-transparent border border-gray-300 rounded-[8px] appearance-none focus:outline-none focus:ring-0 focus:border-black dark:focus:border-white peer text-black dark:text-white"
              placeholder="Enter your email address"
              required
            />
          </div>

          <div className="md:w-auto w-full flex flex-col items-start gap-2">
            <h1>Password</h1>
            <div className="w-full md:w-96 flex justify-between items-center border border-gray-300 rounded-[8px] appearance-none focus:outline-none focus:ring-0 hover:border-black dark:hover:border-white pr-3">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="flex justify-center py-3 px-2 bg-transparent border border-none appearance-none focus:outline-none focus:ring-0 focus:border-none peer text-black dark:text-white"
                placeholder="Create your password"
                required
              />

              {showPassword ? (
                <FaRegEye size={18} onClick={() => setShowPassword(false)} />
              ) : (
                <PiEyeClosed size={18} onClick={() => setShowPassword(true)} />
              )}
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="md:w-96 w-full mt-10 py-3 bg-black text-white text-lg font-semibold rounded dark:bg-white dark:text-black"
        >
          {isLoading ? (
            <BeatLoader className="text-white dark:text-black" size={10} />
          ) : (
            "Sign up"
          )}
        </button>
      </form>
      <Link to={"/"} className="cursor-pointer">
        <p>
          Already have an account?{" "}
          <span className="text-blue-800">Sign in</span>
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

export default Register;
