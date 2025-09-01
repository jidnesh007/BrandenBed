import React, { useState, useEffect } from "react";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  Building,
  User,
  Users,
  Loader,
  Check,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

// A simple 3D-like illustration component
const Illustration = () => (
  <motion.div
    className="relative w-64 h-64"
    initial={{ opacity: 0, scale: 0.5 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ delay: 0.2, type: "spring" }}
  >
    <motion.div
      className="absolute top-10 left-10 w-48 h-48 bg-red-300 rounded-2xl"
      animate={{ y: [0, -10, 0] }}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
    />
    <motion.div
      className="absolute top-16 left-16 w-48 h-48 bg-red-400 rounded-2xl shadow-lg"
      animate={{ y: [0, 10, 0] }}
      transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
    />
    <motion.div className="absolute top-20 left-20 w-48 h-48 bg-red-500 rounded-2xl shadow-2xl flex items-center justify-center text-white">
      <Building size={64} />
    </motion.div>
  </motion.div>
);

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState("Admin");
  const [loadingState, setLoadingState] = useState("idle"); // idle, loading, success, error
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setLoadingState("loading");
    setTimeout(() => {
      if (role === "Admin" && email === "admin" && password === "123") {
        setLoadingState("success");
        setTimeout(() => {
          // In a real app, you would set a token here and then navigate
          navigate("/dashboard");
        }, 1000);
      } else {
        setLoadingState("error");
        setTimeout(() => setLoadingState("idle"), 2000);
      }
    }, 1500);
  };

  const getRoleIcon = () => {
    switch (role) {
      case "Admin":
        return <User className="text-gray-400" />;
      case "Employee":
        return <Users className="text-gray-400" />;
      case "Tenant":
        return <Home className="text-gray-400" />;
      default:
        return <User className="text-gray-400" />;
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-4xl grid md:grid-cols-2 shadow-2xl rounded-2xl overflow-hidden">
        {/* Left Side: Brand & Illustration */}
        <div className="bg-red-600 text-white p-12 hidden md:flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3">
              <Building size={32} />
              <h1 className="text-3xl font-bold">BrandenBed</h1>
            </div>
            <p className="mt-4 text-red-200">
              Manage Properties, Tenants & Teams with Ease.
            </p>
          </div>
          <div className="flex justify-center items-center">
            <Illustration />
          </div>
          <p className="text-center text-red-300 text-sm">
            © {new Date().getFullYear()} BrandenBed Inc.
          </p>
        </div>

        {/* Right Side: Login Form */}
        <div className="bg-white p-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            Welcome Back!
          </h2>
          <p className="text-gray-500 mb-8">Please login to your account.</p>

          <form onSubmit={handleLogin} className="space-y-6">
            {/* Role Selector */}
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2">
                {getRoleIcon()}
              </div>
              <select
                id="role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full pl-12 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 appearance-none"
              >
                <option>Admin</option>
                <option>Employee</option>
                <option>Tenant</option>
              </select>
            </div>

            {/* Email Input */}
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Username or Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-12 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                required
              />
            </div>

            {/* Password Input */}
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-12 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
              >
                {showPassword ? <EyeOff /> : <Eye />}
              </button>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-gray-600">
                <input type="checkbox" className="form-checkbox text-red-600" />
                Remember Me
              </label>
              <a
                href="#"
                className="font-semibold text-red-600 hover:underline"
              >
                Forgot Password?
              </a>
            </div>

            {/* Login Button */}
            <motion.button
              type="submit"
              className="w-full p-3 text-white font-bold rounded-lg transition-colors duration-300"
              style={{
                background: loadingState === "error" ? "#EF4444" : "#DC2626",
              }}
              animate={{
                background: loadingState === "error" ? "#EF4444" : "#DC2626",
              }}
              whileHover={{ scale: loadingState === "idle" ? 1.02 : 1 }}
              whileTap={{ scale: loadingState === "idle" ? 0.98 : 1 }}
              disabled={loadingState !== "idle"}
            >
              <AnimatePresence mode="wait">
                <motion.span
                  key={loadingState}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                >
                  {loadingState === "loading" && (
                    <Loader className="mx-auto animate-spin" />
                  )}
                  {loadingState === "success" && <Check className="mx-auto" />}
                  {loadingState === "error" && "Login Failed"}
                  {loadingState === "idle" && "Login"}
                </motion.span>
              </AnimatePresence>
            </motion.button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
