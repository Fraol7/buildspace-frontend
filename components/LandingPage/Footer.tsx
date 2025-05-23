import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FaLinkedin, FaFacebook } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="bg-blue-50 text-center py-12">
      <div className="container mx-auto px-4">
        {/* Subscription Section */}
        <div className="mb-12">
          <h2 className="text-lg font-semibold text-gray-800">
            Subscribe for innovation news, exclusive launches, and platform updates.
          </h2>
          <div className="mt-4 flex justify-center gap-2">
            <Input
              type="email"
              placeholder="Your Email..."
              className="w-full max-w-sm text-gray-700"
            />
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              Subscribe
            </Button>
          </div>
        </div>

        {/* Links Section */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-8 text-gray-600 text-sm">
          <div>
            <h3 className="font-semibold text-gray-800 mb-4 flex items-start">About Us</h3>
            <ul className="flex flex-col space-y-2 items-start">
              <li>How are we different?</li>
              <li>Career</li>
              <li>Collaborate</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-gray-800 mb-4 flex items-start">Resources</h3>
            <ul className="flex flex-col space-y-2 items-start">
              <li>Startup Matchmaking</li>
              <li>AI Insights</li>
              <li>Knowledge Hub</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-gray-800 mb-4 flex items-start">Support</h3>
            <ul className="flex flex-col space-y-2 items-start">
              <li>Help Center</li>
              <li>Contact</li>
              <li>Terms & Privacy</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-gray-800 mb-4 flex items-start">Contact</h3>
            <ul className="flex flex-col space-y-2 items-start">
              <li>support@buildspace.et</li>
              <li>Addis Ababa, Ethiopia</li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-12 border-t border-gray-200 pt-6 flex flex-col sm:flex-row items-center justify-between">
          <span className="text-gray-500">© 2025 BuildSpace. All rights reserved.</span>
          <div className="flex gap-4 mt-4 sm:mt-0">
            <FaLinkedin />
            <FaFacebook />
            <FaXTwitter />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
