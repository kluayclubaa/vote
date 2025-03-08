"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const colorGroups = ["ฟ้า", "เขียว", "แดง", "เหลือง", "ม่วง"]; // รายชื่อคณะสี

// Type the candidates object
const candidates: { [key: string]: string[] } = {
  ฟ้า: ["A", "B", "C"],
  เขียว: ["D", "E"],
  แดง: ["F", "G", "H", "I", "J"],
  เหลือง: ["K", "L"],
  ม่วง: ["M", "N", "O"],
};

interface Votes {
  [key: string]: number;
}

export default function VoteColor() {
  const router = useRouter();
  const [studentName, setStudentName] = useState<string>("");
  const [voted, setVoted] = useState<boolean>(false);
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [selectedCandidate, setSelectedCandidate] = useState<string>("");
  const [timeRemaining, setTimeRemaining] = useState<number>(120); // 2 minutes in seconds
  const [votes, setVotes] = useState<Votes>({});

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

    const timer = setInterval(() => {
      setTimeRemaining((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer); // Cleanup the timer when the component unmounts
  }, [router]);

  const handleVote = (color: string, candidate?: string) => {
    if (!voted) {
      localStorage.setItem("voteColor", color);
      setVoted(true);
      setSelectedColor(color);
      setSelectedCandidate(candidate || color); // Save the selected color or candidate
      setVotes((prevVotes: Votes) => ({
        ...prevVotes,
        [candidate || color]: (prevVotes[candidate || color] || 0) + 1,
      }));
    }
  };

  const getWinner = () => {
    const maxVotes = Math.max(...Object.values(votes));
    const winner = Object.keys(votes).find((key) => votes[key] === maxVotes);
    return winner ? `${winner} ชนะการเลือกตั้ง` : "ยังไม่มีการโหวต";
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-green-50 p-4">
      <div className="absolute top-4 left-4 bg-white px-4 py-2 rounded shadow">
        <p className="text-gray-700">ผู้ใช้: {studentName}</p>
      </div>
      <h1 className="text-3xl font-bold mb-4">โหวตประธานคณะสี</h1>
      <p className="text-blue-500 font-semibold mb-4">{`เหลือเวลา: ${Math.floor(
        timeRemaining / 60
      )}:${timeRemaining % 60 < 10 ? "0" : ""}${timeRemaining % 60}`}</p>

      {!selectedColor ? (
        <div className="space-y-4 mb-4">
          <p className="text-red-600 font-semibold mb-2">
            เลือกคณะสีที่ต้องการโหวต
          </p>
          {colorGroups.map((color) => (
            <div key={color} className="flex flex-col items-center">
              <button
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
            </div>
          ))}
        </div>
      ) : (
        <>
          <h2 className="text-2xl font-bold mb-4">
            เลือกผู้สมัครในคณะสี {selectedColor}
          </h2>
          <p className="text-red-600 font-semibold mb-2">
            เลือกได้ครั้งเดียว คิดให้ดีก่อนโหวต
          </p>
          <div className="space-y-4 mb-4">
            {candidates[selectedColor].map((name) => (
              <button
                key={name}
                onClick={() => handleVote(selectedColor, name)}
                disabled={voted}
                className={`mt-2 px-6 py-3 rounded-lg shadow ${
                  voted
                    ? "bg-gray-400 text-white cursor-not-allowed"
                    : "bg-blue-500 text-white hover:bg-blue-600"
                }`}
              >
                {name}
              </button>
            ))}
          </div>
          <button
            onClick={() => handleVote(selectedColor, "ไม่ประสงค์ลงคะแนน")}
            disabled={voted}
            className={`px-6 py-3 rounded-lg shadow ${
              voted
                ? "bg-gray-400 text-white cursor-not-allowed"
                : "bg-red-500 text-white hover:bg-red-600"
            }`}
          >
            ไม่ประสงค์ลงคะแนน
          </button>
        </>
      )}

      {voted && (
        <p className="mt-4 text-green-600 font-semibold">
          คุณได้โหวตให้: {selectedCandidate}
        </p>
      )}

      {timeRemaining <= 0 && (
        <p className="mt-4 text-green-600 font-semibold">{getWinner()}</p>
      )}
    </div>
  );
}
