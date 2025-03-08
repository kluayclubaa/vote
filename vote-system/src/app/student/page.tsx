"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { User, Clock, Award, Check, X, UserCircle2 } from "lucide-react";

const candidates = ["A", "B", "C", "D"]; // รายชื่อผู้สมัคร

// Define the type for votes
interface Votes {
  [key: string]: number;
}

export default function VoteStudent() {
  const router = useRouter();
  const [studentName, setStudentName] = useState<string>("");
  const [voted, setVoted] = useState<boolean>(false);
  const [selectedCandidate, setSelectedCandidate] = useState<string>("");
  const [timeRemaining, setTimeRemaining] = useState<number>(120); // 2 minutes in seconds
  const [votes, setVotes] = useState<Votes>({});
  const [isLoading, setIsLoading] = useState(true);

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

  const handleVote = (candidate: string) => {
    if (!voted) {
      localStorage.setItem("voteStudent", candidate);
      setVoted(true);
      setSelectedCandidate(candidate);
      setVotes((prev: Votes) => {
        return {
          ...prev,
          [candidate]: (prev[candidate] || 0) + 1,
        };
      });
    }
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

  // Get candidate background color based on selection
  const getCandidateBackground = (candidate: string) => {
    if (voted && selectedCandidate === candidate) {
      return "bg-blue-600 text-white border-transparent";
    }
    return "bg-white hover:border-blue-300";
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
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto"
      >
        {/* Header with user info and timer */}
        <div className="flex justify-between items-center bg-white rounded-xl shadow-md p-4 mb-8">
          <div className="flex items-center gap-3">
            <div className="bg-blue-100 p-2 rounded-full">
              <User className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">ผู้ใช้:</p>
              <p className="font-medium text-gray-800">{studentName}</p>
            </div>
          </div>
          <div className="flex flex-col items-center">
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-blue-600" />
              <span className="font-bold text-lg">
                {formatTime(timeRemaining)}
              </span>
            </div>
            <div className="w-32 h-2 bg-gray-200 rounded-full mt-1">
              <div
                className="h-full bg-blue-500 rounded-full transition-all duration-1000 ease-linear"
                style={{ width: `${timerProgress}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              โหวตประธานนักเรียน
            </h1>
            {!voted ? (
              <p className="text-red-600 font-medium">
                เลือกได้ครั้งเดียว คิดให้ดีก่อนโหวต
              </p>
            ) : (
              <p className="text-green-600 font-medium">
                คุณได้ทำการโหวตเรียบร้อยแล้ว
              </p>
            )}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6"
          >
            {candidates.map((candidate) => (
              <motion.button
                key={candidate}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => handleVote(candidate)}
                disabled={voted}
                className={`relative p-6 rounded-xl border-2 ${getCandidateBackground(
                  candidate
                )} border-gray-200 transition-all`}
              >
                {voted && selectedCandidate === candidate && (
                  <div className="absolute top-3 right-3">
                    <Check className="h-5 w-5 text-white" />
                  </div>
                )}
                <div className="flex flex-col items-center text-center">
                  <div className="bg-blue-100 rounded-full p-4 mb-3">
                    <UserCircle2 className="h-12 w-12 text-blue-600" />
                  </div>
                  <div className="font-bold text-xl mb-1">{candidate}</div>
                  <div className="text-sm">ผู้สมัครประธานนักเรียน</div>
                </div>
              </motion.button>
            ))}
          </motion.div>

          <div className="flex justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleVote("ไม่ประสงค์ลงคะแนน")}
              disabled={voted}
              className={`relative p-4 rounded-xl border-2 ${
                voted && selectedCandidate === "ไม่ประสงค์ลงคะแนน"
                  ? "bg-gray-700 border-transparent text-white"
                  : "bg-white border-gray-200 hover:border-red-300"
              } transition-all`}
            >
              {voted && selectedCandidate === "ไม่ประสงค์ลงคะแนน" && (
                <div className="absolute top-2 right-2">
                  <Check className="h-5 w-5 text-white" />
                </div>
              )}
              <div className="flex items-center gap-2">
                <X className="h-5 w-5" />
                <span>ไม่ประสงค์ลงคะแนน</span>
              </div>
            </motion.button>
          </div>
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
            <p className="text-center text-xl font-medium text-blue-600">
              {getWinner()}
            </p>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
