"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { User, Clock, Award, ArrowLeft, Check, X, Home } from "lucide-react";

const colorGroups = ["ฟ้า", "เขียว", "แดง", "เหลือง", "ม่วง"]; // รายชื่อคณะสี

// Color mapping for visual representation
const colorMapping: { [key: string]: string } = {
  ฟ้า: "bg-blue-500",
  เขียว: "bg-green-500",
  แดง: "bg-red-500",
  เหลือง: "bg-yellow-500",
  ม่วง: "bg-purple-500",
};

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
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const name = localStorage.getItem("studentName");
    const vote = localStorage.getItem("voteColor");
    const candidate = localStorage.getItem("voteColorCandidate");

    if (!name) {
      router.push("/login");
    } else {
      setStudentName(name);
      if (vote) {
        setSelectedColor(vote);

        if (candidate) {
          setSelectedCandidate(candidate);
          setVoted(true);
        }
      }
      setIsLoading(false);
    }

    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 0) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer); // Cleanup the timer when the component unmounts
  }, [router]);

  const handleSelectColor = (color: string) => {
    setSelectedColor(color);
  };

  const handleVote = (color: string, candidate: string) => {
    if (!voted) {
      localStorage.setItem("voteColor", color);
      localStorage.setItem("voteColorCandidate", candidate);
      setSelectedCandidate(candidate);
      setVoted(true);

      setVotes((prevVotes: Votes) => ({
        ...prevVotes,
        [candidate]: (prevVotes[candidate] || 0) + 1,
      }));
    }
  };

  const handleBack = () => {
    setSelectedColor("");
  };

  const handleGoHome = () => {
    router.push("/");
  };

  const getWinner = () => {
    const maxVotes = Math.max(...Object.values(votes), 0);
    const winner = Object.keys(votes).find((key) => votes[key] === maxVotes);
    return winner ? `${winner} ชนะการเลือกตั้ง` : "ยังไม่มีการโหวต";
  };

  // Format time as MM:SS
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  // Calculate progress percentage for timer
  const timerProgress = (timeRemaining / 120) * 100;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-b from-green-50 to-green-100">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100 p-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto"
      >
        {/* Header with user info and timer */}
        <div className="flex justify-between items-center bg-white rounded-xl shadow-md p-4 mb-8">
          <div className="flex items-center gap-3">
            <div className="bg-green-100 p-2 rounded-full">
              <User className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">ผู้ใช้:</p>
              <p className="font-medium text-gray-800">{studentName}</p>
            </div>
          </div>
          <div className="flex flex-col items-center">
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-green-600" />
              <span className="font-bold text-lg">
                {formatTime(timeRemaining)}
              </span>
            </div>
            <div className="w-32 h-2 bg-gray-200 rounded-full mt-1">
              <div
                className="h-full bg-green-500 rounded-full transition-all duration-1000 ease-linear"
                style={{ width: `${timerProgress}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              โหวตประธานคณะสี
            </h1>
            {!selectedColor ? (
              <p className="text-gray-600">กรุณาเลือกคณะสีที่ต้องการโหวต</p>
            ) : !voted ? (
              <p className="text-gray-600">กรุณาเลือกผู้สมัครที่ต้องการโหวต</p>
            ) : (
              <p className="text-green-600 font-medium">
                คุณได้ทำการโหวตเรียบร้อยแล้ว
              </p>
            )}
          </div>

          {!selectedColor ? (
            // Color selection step
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-2 md:grid-cols-3 gap-4"
            >
              {colorGroups.map((color) => (
                <motion.button
                  key={color}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleSelectColor(color)}
                  className="flex flex-col items-center justify-center p-6 rounded-xl shadow-sm border-2 border-transparent hover:border-gray-300 transition-all"
                >
                  <div
                    className={`w-16 h-16 rounded-full ${colorMapping[color]} mb-3 flex items-center justify-center`}
                  >
                    <span className="text-white font-bold">
                      {color.charAt(0)}
                    </span>
                  </div>
                  <span className="font-medium text-gray-800">{color}</span>
                </motion.button>
              ))}
            </motion.div>
          ) : (
            // Candidate selection step
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              {!voted && (
                <button
                  onClick={handleBack}
                  className="flex items-center text-gray-600 hover:text-green-600 transition-colors mb-4"
                >
                  <ArrowLeft className="h-4 w-4 mr-1" />
                  <span>ย้อนกลับมาเลือกสีใหม่</span>
                </button>
              )}

              <div className="flex items-center justify-center mb-4">
                {voted ? (
                  <div className="text-center">
                    <div
                      className={`w-20 h-20 rounded-full ${colorMapping[selectedColor]} mx-auto flex items-center justify-center mb-2`}
                    >
                      <span className="text-white font-bold text-xl">
                        {selectedCandidate === "ไม่ประสงค์ลงคะแนน"
                          ? "X"
                          : selectedCandidate}
                      </span>
                    </div>
                    <p className="font-medium text-gray-800">
                      {selectedCandidate === "ไม่ประสงค์ลงคะแนน"
                        ? "ไม่ประสงค์ลงคะแนน"
                        : `คุณได้เลือก ${selectedCandidate} จากคณะสี${selectedColor}`}
                    </p>

                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleGoHome}
                      className="mt-6 flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg shadow-md mx-auto transition-colors"
                    >
                      <Home className="h-5 w-5" />
                      <span>กลับไปหน้าแรก</span>
                    </motion.button>
                  </div>
                ) : (
                  <div
                    className={`w-20 h-20 rounded-full ${colorMapping[selectedColor]} flex items-center justify-center`}
                  >
                    <span className="text-white font-bold text-xl">
                      {selectedColor}
                    </span>
                  </div>
                )}
              </div>

              {!voted && (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {candidates[selectedColor].map((name) => (
                    <motion.button
                      key={name}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleVote(selectedColor, name)}
                      className="relative p-6 rounded-xl border-2 bg-white border-gray-200 hover:border-green-300 transition-all"
                    >
                      <div className="text-center">
                        <div className="font-bold text-xl mb-1">{name}</div>
                        <div className="text-sm">
                          ผู้สมัครคณะสี{selectedColor}
                        </div>
                      </div>
                    </motion.button>
                  ))}

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() =>
                      handleVote(selectedColor, "ไม่ประสงค์ลงคะแนน")
                    }
                    className="relative p-6 rounded-xl border-2 bg-white border-gray-200 hover:border-red-300 transition-all"
                  >
                    <div className="text-center">
                      <X className="h-8 w-8 mx-auto mb-1" />
                      <div className="text-sm">ไม่ประสงค์ลงคะแนน</div>
                    </div>
                  </motion.button>
                </div>
              )}
            </motion.div>
          )}
        </div>

        {/* Results section */}
        {timeRemaining <= 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-xl shadow-md p-6"
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <Award className="h-8 w-8 text-yellow-500" />
              <h2 className="text-2xl font-bold text-gray-800">ผลการโหวต</h2>
            </div>
            <p className="text-center text-xl font-medium text-green-600">
              {getWinner()}
            </p>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
