import React, { useEffect, useState } from 'react';
import { Trash2, Edit, Search, Rocket } from 'lucide-react';
import { Link } from 'react-router-dom';

const ViewNPCs = () => {
  const [npcs, setNpcs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadNPCs = () => {
      try {
        const savedNPCs = JSON.parse(localStorage.getItem('npcs')) || [];
        setNpcs(savedNPCs);
      } catch (error) {
        console.error("Error loading NPCs:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadNPCs();
    window.addEventListener('storage', loadNPCs);
    return () => window.removeEventListener('storage', loadNPCs);
  }, []);

  const handleDelete = (id, name) => {
    const confirmDelete = window.confirm(`Delete "${name}" permanently?`);
    if (confirmDelete) {
      const updatedNPCs = npcs.filter((npc) => npc.id !== id);
      localStorage.setItem('npcs', JSON.stringify(updatedNPCs));
      setNpcs(updatedNPCs);
    }
  };

  const filteredNPCs = npcs.filter(npc => 
    npc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    npc.personality.toLowerCase().includes(searchTerm.toLowerCase()) ||
    npc.backstory.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0f051d] to-[#2b044d] flex items-center justify-center">
        <div className="animate-pulse text-purple-300 text-xl">Loading your NPCs...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f051d] to-[#2b044d] text-white py-10 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <h1 className="text-3xl font-extrabold text-purple-300 flex items-center gap-2">
            🧙‍♂️ Your NPC Collection
          </h1>
          
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-400" size={18} />
            <input
              type="text"
              placeholder="Search NPCs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-[#1b103f] text-white rounded-lg border border-purple-800 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
        </div>

        {filteredNPCs.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredNPCs.map((npc) => (
              <div
                key={npc.id}
                className="bg-gradient-to-b from-[#1b103f] to-[#0d0822] rounded-xl p-4 shadow-lg border border-purple-800/50 hover:border-cyan-400 transition-all hover:shadow-purple-500/20"
              >
                <img
                  src={npc.image || `https://robohash.org/${npc.name}?set=set2&size=150x150`}
                  alt={npc.name}
                  className="rounded-lg mb-3 border border-cyan-500/50 w-full h-48 object-cover"
                  onError={(e) => {
                    e.target.src = `https://robohash.org/${npc.name}?set=set2&size=150x150`;
                  }}
                />
                <h2 className="text-xl font-bold text-cyan-400 truncate">{npc.name}</h2>
                <p className="text-sm text-purple-300 mt-1 line-clamp-2">
                  <span className="font-semibold">Personality:</span> {npc.personality}
                </p>
                <p className="text-sm text-purple-300 mt-1 line-clamp-2">
                  <span className="font-semibold">Backstory:</span> {npc.backstory}
                </p>
                
                <div className="flex justify-between mt-4 gap-2">
                  <Link
                    to="/generate"
                    onClick={() => localStorage.setItem("editNpcId", npc.id)} // Store NPC ID in localStorage
                    className="flex-1 flex items-center justify-center gap-1 px-3 py-2 bg-yellow-600 hover:bg-yellow-500 text-white rounded-lg text-sm font-medium transition"
                  >
                    <Edit size={16} /> Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(npc.id, npc.name)}
                    className="flex-1 flex items-center justify-center gap-1 px-3 py-2 bg-red-600 hover:bg-red-500 text-white rounded-lg text-sm font-medium transition"
                  >
                    <Trash2 size={16} /> Delete
                  </button>
                  <a
                    href="https://minttmynft.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-1 px-3 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-sm font-medium transition"
                  >
                    <Rocket size={16} /> Mint
                  </a>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            {searchTerm ? (
              <>
                <p className="text-xl text-gray-300 mb-4">No NPCs found matching "{searchTerm}"</p>
                <button
                  onClick={() => setSearchTerm('')}
                  className="px-6 py-2 bg-purple-600 hover:bg-purple-500 rounded-lg"
                >
                  Clear search
                </button>
              </>
            ) : (
              <>
                <p className="text-xl text-gray-300 mb-4">Your NPC collection is empty</p>
                <Link
                  to="/generate"
                  className="px-6 py-2 bg-cyan-500 hover:bg-cyan-400 text-black rounded-lg font-medium"
                >
                  Create your first NPC
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewNPCs;
