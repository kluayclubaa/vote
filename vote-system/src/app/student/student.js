import { useState } from "react";
import { useRouter } from "next/navigation";

const candidates = [
  { id: "A", name: "สมชาย ใจดี" },
  { id: "B", name: "สมศรี ขยัน" },
];

export default function VoteStudent() {
  const router = useRouter();
  const [votes, setVotes] = useState({});
  const [name, setName] = useState("");
  const [classroom, setClassroom] = useState("");
  const isDisabled = !name || !classroom;

  const handleVote = (id) => {
    if (isDisabled) return;
    setVotes((prev) => ({
      ...prev,
      [id]: (prev[id] || 0) + Math.floor(Math.random() * 3) + 1,
    }));
    alert("โหวตสำเร็จ!");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white text-gray-800">
      <h1 className="text-2xl font-bold mb-4">โหวตประธานนักเรียน</h1>

      <div className="mb-4">
        <input
          type="text"
          placeholder="ชื่อ-นามสกุล"
          className="border p-2 m-2"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="ชั้นเรียน"
          className="border p-2 m-2"
          value={classroom}
          onChange={(e) => setClassroom(e.target.value)}
        />
      </div>

      {candidates.map((candidate) => (
        <div
          key={candidate.id}
          className="p-4 border rounded-lg mb-2 w-80 text-center shadow"
        >
          <h2 className="text-lg font-semibold">{candidate.name}</h2>
          <p>คะแนน: {votes[candidate.id] || 0}</p>
          <button
            className={`px-4 py-2 mt-2 text-white rounded ${
              isDisabled ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"
            }`}
            onClick={() => handleVote(candidate.id)}
            disabled={isDisabled}
          >
            โหวต
          </button>
        </div>
      ))}

      <button
        onClick={() => router.push("/")}
        className="mt-6 bg-gray-500 text-white px-4 py-2 rounded"
      >
        กลับหน้าหลัก
      </button>
    </div>
  );
}
