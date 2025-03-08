"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const candidates = ["A", "B", "C", "D"]; // รายชื่อผู้สมัคร

export default function VoteStudent() {
  const router = useRouter();
  const [studentName, setStudentName] = useState("");
  const [voted, setVoted] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState("");

  useEffect(() => {
    const name = localStorage.getItem("studentName");
    const vote = localStorage.getItem("voteStudent");
    if (!name) {
      router.push("/login");
    } else {
      setStudentName(name);
      if (vote) {
        setVoted(true);
        setSelectedCandidate(vote);
      }
    }
  }, [router]);

  const handleVote = (candidate: string) => {
    if (!voted) {
      localStorage.setItem("voteStudent", candidate);
      setVoted(true);
      setSelectedCandidate(candidate);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-blue-50 p-4">
      <div className="absolute top-4 left-4 bg-white px-4 py-2 rounded shadow">
        <p className="text-gray-700">ผู้ใช้: {studentName}</p>
      </div>
      <h1 className="text-3xl font-bold mb-4">โหวตประธานนักเรียน</h1>
      <p className="text-red-600 font-semibold mb-2">
        เลือกได้ครั้งเดียว คิดให้ดีก่อนโหวต
      </p>
      <div className="space-y-3">
        {candidates.map((candidate) => (
          <button
            key={candidate}
            onClick={() => handleVote(candidate)}
            disabled={voted}
            className={`px-6 py-3 rounded-lg shadow ${
              voted
                ? "bg-gray-400 text-white cursor-not-allowed"
                : "bg-blue-500 text-white hover:bg-blue-600"
            }`}
          >
            {candidate}
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
          คุณได้โหวตให้: {selectedCandidate}
        </p>
      )}
    </div>
  );
}
