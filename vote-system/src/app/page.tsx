"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { LogOut, User, Users, Flag } from "lucide-react";

export default function Home() {
  const router = useRouter();
  const [studentName, setStudentName] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const name = localStorage.getItem("studentName");
    if (!name) {
      router.push("/login");
    } else {
      setStudentName(name);
      setIsLoading(false);
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("studentName");
    router.push("/login");
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-b from-blue-50 to-blue-100">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 p-4">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">จ่ายมาก่อน 500</h1>
      {/* <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-6xl mx-auto"
      > */}
      {/* <div className="flex justify-between items-center bg-white rounded-xl shadow-md p-4 mb-8">
          <div className="flex items-center gap-3">
            <div className="bg-blue-100 p-2 rounded-full">
              <User className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">สวัสดี,</p>
              <p className="font-medium text-gray-800">{studentName}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-gray-600 hover:text-red-500 transition-colors px-3 py-1.5 rounded-lg hover:bg-red-50"
          >
            <LogOut className="h-4 w-4" />
            <span className="text-sm">ออกจากระบบ</span>
          </button>
        </div> */}

      {/* Main content */}
      {/* <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              ระบบโหวตนักเรียน
            </h1>
            <p className="text-gray-600">เลือกประเภทการโหวตที่คุณต้องการ</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto"> */}
      {/* Student President Voting Card */}
      {/* <motion.div
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="bg-white rounded-xl shadow-md overflow-hidden"
            >
              <div className="bg-blue-600 h-2"></div>
              <div className="p-6">
                <div className="bg-blue-100 w-14 h-14 rounded-full flex items-center justify-center mb-4">
                  <Users className="h-8 w-8 text-blue-600" />
                </div>
                <h2 className="text-xl font-bold text-gray-800 mb-2">
                  โหวตประธานนักเรียน
                </h2>
                <p className="text-gray-600 mb-6">
                  เลือกผู้ที่คุณคิดว่าเหมาะสมที่จะเป็นประธานนักเรียน
                </p>
                <Link
                  href="/student"
                  className="block w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-4 rounded-lg transition-colors duration-200 text-center"
                >
                  เริ่มการโหวต
                </Link>
              </div>
            </motion.div> */}

      {/* Color Team President Voting Card */}
      {/* <motion.div
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="bg-white rounded-xl shadow-md overflow-hidden"
            >
              <div className="bg-green-600 h-2"></div>
              <div className="p-6">
                <div className="bg-green-100 w-14 h-14 rounded-full flex items-center justify-center mb-4">
                  <Flag className="h-8 w-8 text-green-600" />
                </div>
                <h2 className="text-xl font-bold text-gray-800 mb-2">
                  โหวตประธานคณะสี
                </h2>
                <p className="text-gray-600 mb-6">
                  เลือกผู้ที่คุณคิดว่าเหมาะสมที่จะเป็นประธานคณะสี
                </p>
                <Link
                  href="/color"
                  className="block w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2.5 px-4 rounded-lg transition-colors duration-200 text-center"
                >
                  เริ่มการโหวต
                </Link>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </motion.div> */}
    </div>
  );
}
