import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import googleLogo from "public/assets/g.png"; // Replace with the correct path if different

export const LoginPopup = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = () => {
    // Handle login logic here
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="relative w-[32rem] p-8 bg-white rounded-lg shadow-lg">
        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-purple-500 text-2xl"
          onClick={onClose}
        >
          &times;
        </button>
        <h2 className="text-3xl font-semibold text-center mb-6">Log In</h2>
        <button className="flex items-center justify-center w-full py-3 mb-6 bg-black text-white hover:bg-purple-500 rounded-md">
          <Image src={googleLogo} alt="Google Logo" width={24} height={24} className="mr-3" />
          Sign in with Google
        </button>
        <div className="flex items-center justify-center mb-6">
          <hr className="w-full border-t border-gray-300" />
          <span className="px-3 text-gray-500">OR</span>
          <hr className="w-full border-t border-gray-300" />
        </div>
        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-4 px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
          required
          pattern="^[^\s@]+@[^\s@]+\.[^\s@]+$"
        />
        <div className="relative mb-4">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            required
          />
          <button
            type="button"
            className="absolute right-3 top-3 text-gray-500 hover:text-purple-500"
            onClick={togglePasswordVisibility}
          >
            {showPassword ? "🙈" : "🐵"}
          </button>
        </div>
        <button
          onClick={handleLogin}
          className="w-full py-3 bg-black text-white hover:bg-purple-500 rounded-md"
        >
          Log In
        </button>
        <p className="mt-6 text-center text-gray-500">
          New to JobDope? <Link href="#" className="text-purple-500 hover:underline">Sign Up</Link>
        </p>
      </div>
    </div>
  );
};