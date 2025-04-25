import React from 'react';
import { useLocation } from 'react-router-dom';

const CryptoTransactionPage = () => {
  const location = useLocation();
  const npc = location.state?.npc; // Access the NPC data passed from the BrowseNPCs page

  if (!npc) {
    return <div>NPC not found</div>;
  }

  const handleBuyClick = () => {
    // Redirect to the Blockchain login page
    window.location.href = "https://login.blockchain.com/beta/auth/login";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-[#1a0033] to-[#0f001a] text-white px-6 py-10">
      <h1 className="text-4xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500 mb-10">
        🪙 Crypto Transaction Page
      </h1>

      <div className="max-w-2xl mx-auto bg-[#1b0d2c] border border-purple-700 rounded-2xl p-6 shadow-lg">
        <h2 className="text-xl font-bold text-cyan-300 mb-4">Purchasing NPC: {npc.name}</h2>
        <div className="flex items-center mb-4">
          <img
            src={npc.image}
            alt={npc.name}
            className="w-24 h-24 object-cover rounded-xl border border-cyan-500 mr-4"
          />
          <div>
            <p className="text-gray-300">
              <span className="text-purple-400 font-medium">Personality:</span> {npc.personality}
            </p>
          </div>
        </div>

        <button
          onClick={handleBuyClick}
          className="w-full bg-gradient-to-r from-green-400 to-emerald-500 hover:from-green-500 hover:to-emerald-600 py-2 rounded-lg font-semibold"
        >
          Confirm and Buy NPC
        </button>
      </div>
    </div>
  );
};

export default CryptoTransactionPage;
