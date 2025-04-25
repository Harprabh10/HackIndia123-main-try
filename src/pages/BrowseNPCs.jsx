import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom

const randomNames = [
  'Zara', 'Thorne', 'Eloen', 'Kael', 'Nyra', 'Orin', 'Vex', 'Juno', 'Lira', 'Cato',
  'Ryn', 'Astra', 'Nox', 'Sorin', 'Vale', 'Nova', 'Zephyr', 'Kira', 'Milo', 'Rogue',
  'Ember', 'Rai', 'Luneth', 'Sage', 'Onyx', 'Talon', 'Skye', 'Vera', 'Ashen', 'Nyx',
  'Draven', 'Lyra', 'Zeth', 'Quinn', 'Mira', 'Ezren', 'Kairo', 'Xara', 'Thalia', 'Rune',
  'Hex', 'Echo', 'Cyra', 'Axel', 'Sylas', 'Koda', 'Elara', 'Tess', 'Blade', 'Indigo'
];

const randomPersonalities = [
  'Brave and loyal', 'Mysterious and cunning', 'Cheerful and optimistic',
  'Stoic and silent', 'Wise beyond years', 'Curious and adventurous',
  'Cold and calculating', 'Friendly and protective', 'Sly and sarcastic',
  'Determined and fearless'
];

const getRandomElement = (arr) => arr[Math.floor(Math.random() * arr.length)];

const generateNPCs = () => {
  return Array.from({ length: 50 }, (_, i) => {
    const name = getRandomElement(randomNames);
    const personality = getRandomElement(randomPersonalities);
    const seed = `${name}-${i}`;
    const image = `https://api.dicebear.com/7.x/adventurer/png?seed=${encodeURIComponent(seed)}`;

    return {
      id: i,
      name,
      personality,
      image
    };
  });
};

const BrowseNPCs = () => {
  const [npcs, setNpcs] = useState([]);
  const navigate = useNavigate(); // Initialize navigate hook

  useEffect(() => {
    const randomNPCs = generateNPCs();
    setNpcs(randomNPCs);
  }, []);

  const handleBuy = (npc) => {
    // Navigate to the CryptoTransactionPage with the NPC data
    navigate('/crypto-transaction-page', { state: { npc } });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-[#1a0033] to-[#0f001a] text-white px-6 py-10">
      <h1 className="text-4xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500 mb-10">
        🌌 Browse Random NPCs
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
        {npcs.map((npc) => (
          <div
            key={npc.id}
            className="bg-[#1b0d2c] border border-purple-700 rounded-2xl p-5 shadow-lg hover:shadow-purple-500/40 transition"
          >
            <img
              src={npc.image}
              alt={npc.name}
              className="w-full h-40 object-cover rounded-xl border border-cyan-500 mb-4"
            />
            <h3 className="text-xl font-bold text-cyan-300">{npc.name}</h3>
            <p className="text-gray-300 mt-2">
              <span className="text-purple-400 font-medium">Personality:</span> {npc.personality}
            </p>
            <button
              onClick={() => handleBuy(npc)} // Handle "Buy NPC" click
              className="w-full mt-4 bg-gradient-to-r from-green-400 to-emerald-500 hover:from-green-500 hover:to-emerald-600 py-2 rounded-lg font-semibold"
            >
              💰 Buy NPC
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BrowseNPCs;
