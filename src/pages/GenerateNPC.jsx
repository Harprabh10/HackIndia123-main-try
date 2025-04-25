// src/pages/GenerateNPC.jsx
import React, { useState } from "react";

const GenerateNPC = () => {
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [origin, setOrigin] = useState("");
  const [personality, setPersonality] = useState("");

  const handleGenerate = () => {
    if (!name || !role || !origin || !personality) {
      alert("Please fill in all fields!");
      return;
    }

    const newNPC = {
      id: Date.now(),
      name,
      role,
      origin,
      personality,
      image: "https://via.placeholder.com/150", // Replace with AI generation later
    };

    const existing = JSON.parse(localStorage.getItem("npcs")) || [];
    existing.push(newNPC);
    localStorage.setItem("npcs", JSON.stringify(existing));

    alert("NPC saved!");
    setName("");
    setRole("");
    setOrigin("");
    setPersonality("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white p-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">
          🧙‍♂️ Create Your NPC
        </h1>
        <div className="bg-gray-900 shadow-2xl rounded-2xl p-8 space-y-6 border border-gray-700">
          <div>
            <label className="block text-sm font-medium">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full mt-1 p-2 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Role</label>
            <input
              type="text"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full mt-1 p-2 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Origin</label>
            <input
              type="text"
              value={origin}
              onChange={(e) => setOrigin(e.target.value)}
              className="w-full mt-1 p-2 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Personality</label>
            <textarea
              value={personality}
              onChange={(e) => setPersonality(e.target.value)}
              className="w-full mt-1 p-2 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
              rows="4"
            ></textarea>
          </div>
          <button
            onClick={handleGenerate}
            className="w-full py-3 px-6 bg-purple-600 hover:bg-purple-700 transition rounded-xl font-bold text-lg"
          >
            🚀 Generate NPC
          </button>
        </div>
      </div>
    </div>
  );
};

export default GenerateNPC;
