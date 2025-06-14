'use client';

import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import Image from 'next/image';
import Link from 'next/link';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle login logic here
    console.log({ email, password });
  };

  return (
    <div className="flex justify-center px-4 min-h-screen">
      <div className="w-full mt-4 max-w-sm p-2">
        <div className="text-left mb-8">
          <h1 className="text-center text-2xl font-semibold">WELCOME BACK</h1>
        </div>
        <form onSubmit={handleLogin} className="space-y-6">
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
            <div className="relative flex flex-row items-center justify-between">
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
                className="absolute right-4 top-4 text-gray-500"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Remember Me & Forgot Password */}
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-2">
            <Label htmlFor="remember-me">Remember Me</Label>
              <Switch id="remember-me" />
            </div>
            <Link href="/forgot-password" className="text-blue-600 hover:underline">
              Forgot Password?
            </Link>
          </div>

          {/* Login Button */}
          <div className="flex flex-col items-center">
            <Link
              href="/entrepreneur"
              className="w-[60%] bg-blue-700 hover:bg-blue-800 text-white py-2 rounded-md text-center transition duration-300"
            >
              Login
            </Link>
          </div>

            {/* Divider */}
            <div className="flex items-center justify-center space-x-2">
              <div className="h-px bg-gray-300 flex-grow" />
              <span className="text-gray-500 text-sm">or</span>
              <div className="h-px bg-gray-300 flex-grow" />
            </div>

            {/* Google Sign In */}
            <div className="flex flex-col items-center">
              <button
                type="button"
                className="w-[60%] border border-gray-300 py-2 rounded-md flex items-center justify-center space-x-2 hover:bg-gray-100"
              >
                <Image src="/icons/google.svg" alt="Google" width={20} height={20} />
                <span className="text-sm text-gray-700">Sign in with Google</span>
              </button>
            </div>

          {/* Sign Up Link */}
          <p className="text-center text-sm text-gray-600">
            Don&apos;t have an account?{' '}
            <a href="/auth/signup" className="text-blue-600 hover:underline">
              Sign Up
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}
