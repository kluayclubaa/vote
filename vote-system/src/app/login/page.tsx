"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { BookOpen, LogIn } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [studentId, setStudentId] = useState("");
  const [errors, setErrors] = useState({ name: "", studentId: "" });

  const validateForm = () => {
    const newErrors = { name: "", studentId: "" };
    let isValid = true;

    if (!name.trim()) {
      newErrors.name = "กรุณากรอกชื่อ-นามสกุล";
      isValid = false;
    }

    if (!studentId.trim()) {
      newErrors.studentId = "กรุณากรอกรหัสนักเรียน";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleLogin = () => {
    if (validateForm()) {
      localStorage.setItem("studentName", name);
      router.push("/");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-blue-50 to-blue-100 p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Header */}
          <div className="p-6 text-center">
            <div className="flex justify-center mb-4">
              <div className="rounded-full bg-blue-100 p-3">
                <BookOpen className="h-10 w-10 text-blue-600" />
              </div>
            </div>
            <h1 className="text-2xl font-bold text-gray-800">เข้าสู่ระบบ</h1>
            <p className="text-gray-500 mt-2 text-sm">
              กรุณากรอกข้อมูลเพื่อเข้าสู่ระบบ
            </p>
          </div>

          {/* Form Content */}
          <div className="px-6 pb-4 space-y-4">
            <div className="space-y-2">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-black"
              >
                ชื่อ-นามสกุล
              </label>
              <input
                id="name"
                type="text"
                placeholder="กรอกชื่อ-นามสกุล"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={`w-full px-4 py-2 rounded-lg border text-black ${
                  errors.name ? "border-red-500" : "border-gray-300"
                } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors`}
              />
              {errors.name && (
                <p className="text-sm text-red-500">{errors.name}</p>
              )}
            </div>

            <div className="space-y-2">
              <label
                htmlFor="studentId"
                className="block text-sm font-medium text-black"
              >
                รหัสนักเรียน
              </label>
              <input
                id="studentId"
                type="text"
                placeholder="กรอกรหัสนักเรียน"
                value={studentId}
                onChange={(e) => setStudentId(e.target.value)}
                className={`w-full px-4 py-2 rounded-lg border text-black ${
                  errors.studentId ? "border-red-500" : "border-gray-300"
                } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors`}
              />
              {errors.studentId && (
                <p className="text-sm text-red-500">{errors.studentId}</p>
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="px-6 pb-6">
            <button
              onClick={handleLogin}
              disabled={!name || !studentId}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <LogIn className="mr-2 h-4 w-4" /> เข้าสู่ระบบ
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
