"use client";

import React, { useState } from "react";
import Image from "next/image";
import RoleSelector from "./RoleSelector";

interface SignUpFormData {
  fullName: string;
  email: string;
  role: string;
  password: string;
  confirmPassword: string;
}

export default function SignUpForm() {
  const [formData, setFormData] = useState<SignUpFormData>({
    fullName: "",
    email: "",
    role: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div className="flex items-center justify-center md:justify-end p-4 w-full md:w-[50%]">
      <div className="rounded-lg p-4 w-[70%]">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">Sign Up</h1>
        <form onSubmit={handleSubmit} className="space-y-2">
          {/* Full Name */}
          <div>
            <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="mt-1 text-sm w-full border border-gray-300 rounded-full shadow-sm px-4 py-2 focus:ring-blue-100 focus:border-blue-100"
              placeholder="Enter your full name"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
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
            <label htmlFor="role" className="block text-sm font-medium text-gray-700">
              Role
            </label>
            <RoleSelector />
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
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
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
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
              className="w-full bg-blue-600 text-white font-medium py-2 px-4 rounded-lg hover:bg-blue-700"
            >
              Sign Up
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
