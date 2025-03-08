"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const colorGroups = ["ฟ้า", "เขียว", "แดง", "เหลือง", "ม่วง"]; // รายชื่อคณะสี

export default function VoteColor() {
  const router = useRouter();
  const [studentName, setStudentName] = useState("");
  const [voted, setVoted] = useState(false);
  const [selectedColor, setSelectedColor] = useState("");

  useEffect(() => {
    const name = localStorage.getItem("studentName");
    const vote = localStorage.getItem("voteColor");
    if (!name) {
      router.push("/login");
    } else {
      setStudentName(name);
      if (vote) {
        setVoted(true);
        setSelectedColor(vote);
      }
    }
  }, [router]);

  const handleVote = (color: string) => {
    if (!voted) {
      localStorage.setItem("voteColor", color);
      setVoted(true);
      setSelectedColor(color);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-green-50 p-4">
      <div className="absolute top-4 left-4 bg-white px-4 py-2 rounded shadow">
        <p className="text-gray-700">ผู้ใช้: {studentName}</p>
      </div>
      <h1 className="text-3xl font-bold mb-4">โหวตประธานคณะสี</h1>
      <p className="text-red-600 font-semibold mb-2">
        เลือกได้ครั้งเดียว คิดให้ดีก่อนโหวต
      </p>
      <div className="space-y-3">
        {colorGroups.map((color) => (
          <button
            key={color}
            onClick={() => handleVote(color)}
            disabled={voted}
            className={`px-6 py-3 rounded-lg shadow ${
              voted
                ? "bg-gray-400 text-white cursor-not-allowed"
                : "bg-green-500 text-white hover:bg-green-600"
            }`}
          >
            {color}
          </button>
        ))}
        <button
          onClick={() => handleVote("ไม่ประสงค์ลงคะแนน")}
          disabled={voted}
          className={`px-6 py-3 rounded-lg shadow ${
            voted
              ? "bg-gray-400 text-white cursor-not-allowed"
              : "bg-red-500 text-white hover:bg-red-600"
          }`}
        >
          ไม่ประสงค์ลงคะแนน
        </button>
      </div>
      {voted && (
        <p className="mt-4 text-green-600 font-semibold">
          คุณได้โหวตให้: {selectedColor}
        </p>
      )}
    </div>
  );
}
