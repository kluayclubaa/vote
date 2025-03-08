"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Home() {
  const router = useRouter();
  const [studentName, setStudentName] = useState("");

  useEffect(() => {
    const name = localStorage.getItem("studentName");
    if (!name) {
      router.push("/login");
    } else {
      setStudentName(name);
    }
  }, [router]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-blue-50 relative">
      {studentName && (
        <div className="absolute top-4 left-4 bg-white px-4 py-2 rounded shadow">
          <p className="text-gray-700">สวัสดี, {studentName}</p>
        </div>
      )}
      <h1 className="text-3xl font-bold mb-6">ระบบโหวตนักเรียน</h1>
      <div className="space-y-4">
        <Link
          href="/student"
          className="bg-blue-500 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-600"
        >
          โหวตประธานนักเรียน
        </Link>
        <Link
          href="/color"
          className="bg-green-500 text-white px-6 py-3 rounded-lg shadow hover:bg-green-600"
        >
          โหวตประธานคณะสี
        </Link>
      </div>
    </div>
  );
}
