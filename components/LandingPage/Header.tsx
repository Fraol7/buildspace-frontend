"use client";
import React, { useState, useEffect } from "react";
import Logo from "../Common/Logo";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { FaGlobe, FaBars, FaTimes } from "react-icons/fa";
import Link from "next/link";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 w-full shadow-xs transition-all ${
        isScrolled ? "bg-transparent backdrop-blur-sm" : "bg-blue-100"
      }`}
    >
      {/* Main Header Content */}
      <div className="flex flex-row justify-between items-center h-16 px-4 md:px-8 py-4">
        <div className="flex items-center gap-4">
          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <FaTimes className="h-5 w-5" />
            ) : (
              <FaBars className="h-5 w-5" />
            )}
          </Button>

          <Link href="#" className="focus:outline-none">
            {/* Responsive Logo */}
            <div className="hidden md:block">
              <Logo size="lg" />
            </div>
            <div className="md:hidden">
              <Logo size="sm" />
            </div>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex flex-row items-center gap-6">
          <Button
            asChild
            variant="ghost"
            className="text-blue-900 hover:bg-gray-100"
          >
            <Link href="/auth/login">Login</Link>
          </Button>

          <Button className="text-white bg-blue-900">
            <Link href="/auth/signup">Sign Up</Link>
          </Button>

          <Button
            asChild
            className="bg-blue-100 text-black rounded-sm hover:bg-blue-200"
          >
            <Link href="#">Contact Us</Link>
          </Button>
        </div>

        {/* Mobile Login Button (visible when menu is closed) */}
        {!isMobileMenuOpen && (
          <div className="flex md:hidden gap-2">
            <Button asChild variant="ghost" size="sm" className="text-blue-900">
              <Link href="/auth/login">Login</Link>
            </Button>
          </div>
        )}
      </div>

      {/* Mobile Dropdown Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 px-4 py-3 space-y-3">
          <Button
            asChild
            variant="ghost"
            className="w-full justify-start text-blue-900 hover:bg-gray-100"
          >
            <Link href="/auth/login" className="w-full">
              Login
            </Link>
          </Button>

          <div className="flex flex-row items-center gap-2 py-2">
            <FaGlobe className="text-gray-600" />
            <Select>
              <SelectTrigger className="w-full border-gray-300 rounded-sm">
                <SelectValue placeholder="English" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="eng">English</SelectItem>
                  <SelectItem value="amh">Amharic</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <Button
            asChild
            className="w-full bg-blue-100 text-black rounded-sm hover:bg-blue-200 justify-start"
          >
            <Link href="#" className="w-full">
              Contact Us
            </Link>
          </Button>
        </div>
      )}
    </header>
  );
};

export default Header;
