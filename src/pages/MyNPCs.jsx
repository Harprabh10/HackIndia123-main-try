import React, { useEffect, useState } from "react";

const MyNPCs = () => {
  const [npcs, setNPCs] = useState([]);

  useEffect(() => {
    const storedNPCs = JSON.parse(localStorage.getItem("npcs")) || [];
    console.log("Loaded NPCs from localStorage:", storedNPCs);
    setNPCs(storedNPCs);
  }, []);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">My NPCs</h2>
      {npcs.length === 0 ? (
        <p className="text-gray-500">No NPCs found. Try generating some!</p>
      ) : (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          {npcs.map((npc) => (
            <div
              key={npc.id}
              className="bg-white shadow-lg rounded-2xl p-4 space-y-2"
            >
              <img
                src="https://placehold.co/150x150"
                alt="NPC"
                className="rounded-xl w-full object-cover"
              />
              <h3 className="text-xl font-semibold text-gray-700">
                {npc.name}
              </h3>
              <p className="text-gray-500">
                <strong>Personality:</strong> {npc.personality}
              </p>
              <p className="text-gray-500">
                <strong>Backstory:</strong> {npc.backstory}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyNPCs;
