"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import RoleSelector from "./RoleSelector";
import { toast } from "sonner";
import { signIn } from "next-auth/react";

interface SignUpFormData {
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  password: string;
  confirmPassword: string;
}

export default function SignUpForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<SignUpFormData>({
    firstName: "",
    lastName: "",
    email: "",
    role: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (!formData.role) {
      toast.error("Please select a role");
      return;
    }

    setIsLoading(true);

    try {
      const myHeaders = new Headers();
      const signupRes = await fetch(
        "https://buildspace.onrender.com/auth/email",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: formData.email,
            password: formData.password,
            first_name: formData.firstName,
            last_name: formData.lastName,
            profile_picture_url: "",
            role: formData.role === "entrepreneur" ? "startup" : formData.role,
          }),
        }
      );

      if (!signupRes.ok) {
        const errorData = await signupRes.json();
        toast.error(errorData.message || "Signup failed. Please try again.");
        setIsLoading(false);
        return;
      }

      // 2. Sign in with NextAuth
      const signInRes = await signIn("credentials", {
        redirect: false,
        email: formData.email,
        password: formData.password,
      });

      if (signInRes?.error) {
        toast.error(signInRes.error || "Login failed after signup.");
        setIsLoading(false);
        return;
      }

      // 3. Redirect based on role
      if (formData.role === "investor") {
        router.push("/profile-setup?role=investor");
      } else {
        router.push("/profile-setup?role=entrepreneur");
      }
    } catch (error) {
      console.error("Signup failed:", error);
      toast.error("Signup failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center md:justify-end p-4 w-full md:w-[50%]">
      <div className="rounded-lg p-4 w-[70%]">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Sign Up
        </h1>
        <form onSubmit={handleSubmit} className="space-y-2">
          {/* Name Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="firstName"
                className="block text-sm font-medium text-gray-700"
              >
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="mt-1 text-sm w-full border border-gray-300 rounded-full shadow-sm px-4 py-2 focus:ring-blue-100 focus:border-blue-100"
                placeholder="First name"
                required
              />
            </div>
            <div>
              <label
                htmlFor="lastName"
                className="block text-sm font-medium text-gray-700"
              >
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="mt-1 text-sm w-full border border-gray-300 rounded-full shadow-sm px-4 py-2 focus:ring-blue-100 focus:border-blue-100"
                placeholder="Last name"
                required
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 text-sm w-full border border-gray-300 rounded-full shadow-sm px-4 py-2 focus:ring-blue-100 focus:border-blue-100"
              placeholder="Enter your email"
              required
            />
          </div>

          {/* Role */}
          <div>
            <label
              htmlFor="role"
              className="block text-sm font-medium text-gray-700"
            >
              Role
            </label>
            <RoleSelector
              value={formData.role}
              onChange={(value) =>
                setFormData((prev) => ({ ...prev, role: value }))
              }
            />
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="mt-1 text-sm w-full border border-gray-300 rounded-full shadow-sm px-4 py-2 focus:ring-blue-100 focus:border-blue-100"
              placeholder="Enter your password"
              required
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-700"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="mt-1 text-sm w-full border border-gray-300 rounded-full shadow-sm px-4 py-2 focus:ring-blue-100 focus:border-blue-100"
              placeholder="Confirm your password"
              required
            />
          </div>

          {/* Buttons */}
          <div className="flex flex-col items-center space-y-4">
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-full shadow-sm text-sm font-medium text-white ${
                isLoading ? "bg-blue-400" : "bg-blue-600 hover:bg-blue-700"
              } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
            >
              {isLoading ? "Signing up..." : "Sign up"}
            </button>
            <button
              type="button"
              className="w-full flex items-center justify-center border border-gray-300 bg-white text-gray-700 font-medium py-2 px-4 rounded-lg hover:bg-gray-100"
            >
              <Image
                src="/icons/google.svg"
                alt="Google"
                width={20}
                height={20}
                className="mr-2"
              />
              Continue with Google
            </button>
          </div>
        </form>

        {/* Log In Link */}
        <p className="text-center text-sm text-gray-600 mt-6">
          Already have an account?{" "}
          <a href="/auth/login" className="text-blue-600 hover:underline">
            Log In
          </a>
        </p>
      </div>
    </div>
  );
}
