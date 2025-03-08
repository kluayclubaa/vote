"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [studentId, setStudentId] = useState("");

  const handleLogin = () => {
    if (name && studentId) {
      localStorage.setItem("studentName", name);
      router.push("/");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">เข้าสู่ระบบ</h1>
      <input
        type="text"
        placeholder="ชื่อ-นามสกุล"
        className="border p-2 m-2 w-64"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        placeholder="รหัสนักเรียน"
        className="border p-2 m-2 w-64"
        value={studentId}
        onChange={(e) => setStudentId(e.target.value)}
      />
      <button
        className="bg-blue-500 text-white px-6 py-2 rounded-lg mt-4"
        onClick={handleLogin}
        disabled={!name || !studentId}
      >
        เข้าสู่ระบบ
      </button>
    </div>
  );
}
