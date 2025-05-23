'use client';

import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import Image from 'next/image';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle login logic here
    console.log({ email, password, rememberMe });
  };

  return (
    <div className="flex items-center justify-center bg-white px-4">
      <div className="w-full max-w-lg">
        <div className="text-left mb-8">
          <h1 className="text-center text-2xl font-semibold">WELCOME BACK</h1>
        </div>
        <form onSubmit={handleLogin} className="space-y-8">
          {/* Email */}
          <div>
            <label className="text-sm text-gray-600">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@email.com"
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="text-sm text-gray-600">Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="********"
                className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-3 text-gray-500"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Remember Me & Forgot Password */}
          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
                className="accent-blue-600"
              />
              <span className="text-gray-700">Remember Me</span>
            </label>
            <a href="#" className="text-blue-600 hover:underline">
              Forgot Password?
            </a>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full bg-blue-700 hover:bg-blue-800 text-white py-2 rounded-md transition duration-300"
          >
            Login
          </button>

          {/* Divider */}
          <div className="flex items-center justify-center space-x-2">
            <div className="h-px bg-gray-300 flex-grow" />
            <span className="text-gray-500 text-sm">or</span>
            <div className="h-px bg-gray-300 flex-grow" />
          </div>

          {/* Google Sign In */}
          <button
            type="button"
            className="w-full border border-gray-300 py-2 rounded-md flex items-center justify-center space-x-2 hover:bg-gray-100"
          >
            <Image src="/icons/google.svg" alt="Google" width={20} height={20} />
            <span className="text-sm text-gray-700">Sign in with Google</span>
          </button>

          {/* Sign Up Link */}
          <p className="text-center text-sm text-gray-600">
            Don&apos;t have an account?{' '}
            <a href="/auth/signup" className="text-blue-600 hover:underline">
              signup
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}
