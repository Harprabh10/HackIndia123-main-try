import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { WandSparkles, Pencil, Rocket, Trash2 } from "lucide-react";

const Generate = () => {
  const [formData, setFormData] = useState({
    name: "",
    personality: "",
    backstory: "",
    image: ""
  });
  const [npc, setNpc] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loadingImage, setLoadingImage] = useState(false);

  // Auto-load NPC for editing
  useEffect(() => {
    const editNpcId = localStorage.getItem("editNpcId");
    if (editNpcId) {
      const existing = JSON.parse(localStorage.getItem("npcs")) || [];
      const npcToEdit = existing.find((item) => item.id === editNpcId);
      if (npcToEdit) {
        setFormData({
          name: npcToEdit.name,
          personality: npcToEdit.personality,
          backstory: npcToEdit.backstory,
          image: npcToEdit.image
        });
        setNpc(npcToEdit);
        setIsEditing(true);
      }
      localStorage.removeItem("editNpcId");
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const generateImage = async (name, personality, backstory) => {
    setLoadingImage(true);

    // Replace with actual image generation API call (e.g., OpenAI's DALL·E)
    try {
      const response = await fetch('YOUR_IMAGE_GENERATION_API_URL', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Add API key if required
        },
        body: JSON.stringify({
          prompt: `${name}, a ${personality} character with this backstory: ${backstory}`,
          size: '512x512' // Specify desired image size
        })
      });
      const data = await response.json();
      if (data && data.image_url) {
        setFormData((prevData) => ({
          ...prevData,
          image: data.image_url
        }));
      }
    } catch (error) {
      console.error("Error generating image:", error);
      alert("Failed to generate image.");
    } finally {
      setLoadingImage(false);
    }
  };

  const handleGenerate = () => {
    const { name, personality, backstory } = formData;
    if (!name || !personality || !backstory) {
      alert("Please fill all required fields!");
      return;
    }

    // Generate the image using AI before saving
    generateImage(name, personality, backstory);

    const newNPC = {
      id: isEditing && npc ? npc.id : uuidv4(),
      ...formData,
      image: formData.image || `https://robohash.org/${name}?set=set2&size=150x150`, // Fallback image
      createdAt: new Date().toISOString()
    };

    const existing = JSON.parse(localStorage.getItem("npcs")) || [];
    const updated = isEditing
      ? existing.map((item) => (item.id === npc.id ? newNPC : item))
      : [...existing, newNPC];

    localStorage.setItem("npcs", JSON.stringify(updated));
    setNpc(newNPC);
    if (!isEditing) alert("NPC saved successfully!");
    setIsEditing(false);
    setFormData({ name: "", personality: "", backstory: "", image: "" });
  };

  const handleEdit = () => {
    if (!npc) return;
    setFormData({
      name: npc.name,
      personality: npc.personality,
      backstory: npc.backstory,
      image: npc.image
    });
    setIsEditing(true);
  };

  const handleDelete = () => {
    if (!npc) return;
    const confirmDelete = window.confirm(`Delete ${npc.name} permanently?`);
    if (confirmDelete) {
      const existing = JSON.parse(localStorage.getItem("npcs")) || [];
      const updated = existing.filter((item) => item.id !== npc.id);
      localStorage.setItem("npcs", JSON.stringify(updated));
      setNpc(null);
      alert(`${npc.name} has been deleted`);
    }
  };

  const handleMint = () => {
    if (!npc) return;

    const mintUrl = `https://minttmynft.com/?npc_name=${npc.name}&npc_image=${npc.image}`;
    window.location.href = mintUrl;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] text-white flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-[#0c012a]/90 backdrop-blur-xl p-6 md:p-8 rounded-2xl shadow-lg border border-purple-700/50 space-y-6">
        <h2 className="text-3xl md:text-4xl font-extrabold text-center text-purple-300 tracking-wide">
          {isEditing ? `Edit ${npc?.name}` : "✨ Create Your NPC"}
        </h2>

        {/* Form */}
        <div className="space-y-4">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-purple-200 mb-1">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g. Eldrin the Wise"
              className="w-full p-3 bg-[#1a1a3d] text-white rounded-lg border border-purple-500/50 focus:ring-2 focus:ring-pink-500 focus:outline-none"
              required
            />
          </div>

          {/* Personality */}
          <div>
            <label className="block text-sm font-medium text-purple-200 mb-1">Personality</label>
            <input
              type="text"
              name="personality"
              value={formData.personality}
              onChange={handleChange}
              placeholder="e.g. Wise but forgetful"
              className="w-full p-3 bg-[#1a1a3d] text-white rounded-lg border border-purple-500/50 focus:ring-2 focus:ring-pink-500 focus:outline-none"
              required
            />
          </div>

          {/* Backstory */}
          <div>
            <label className="block text-sm font-medium text-purple-200 mb-1">Backstory</label>
            <textarea
              name="backstory"
              value={formData.backstory}
              onChange={handleChange}
              placeholder="e.g. A former archmage who lost his memory"
              className="w-full p-3 bg-[#1a1a3d] text-white rounded-lg border border-purple-500/50 focus:ring-2 focus:ring-pink-500 focus:outline-none"
              rows={3}
              required
            />
          </div>

          {/* Image URL */}
          <div>
            <label className="block text-sm font-medium text-purple-200 mb-1">Image URL (optional)</label>
            <input
              type="text"
              name="image"
              value={formData.image}
              onChange={handleChange}
              placeholder="Paste image URL or leave blank for auto-generate"
              className="w-full p-3 bg-[#1a1a3d] text-white rounded-lg border border-purple-500/50 focus:ring-2 focus:ring-pink-500 focus:outline-none"
            />
          </div>

          {/* Save Button */}
          <button
            onClick={handleGenerate}
            className="w-full bg-gradient-to-r from-fuchsia-600 to-violet-700 hover:from-pink-500 hover:to-purple-600 text-white py-3 rounded-lg font-bold flex items-center justify-center gap-2 transition-all hover:shadow-lg hover:shadow-fuchsia-500/30"
          >
            {loadingImage ? "Generating Image..." : <><WandSparkles size={18} /> {isEditing ? "Update NPC" : "Save NPC"}</>}
          </button>
        </div>

        {/* NPC Preview */}
        {npc && (
          <div className="bg-[#14062f] p-6 rounded-xl mt-6 border border-fuchsia-600/50 shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-pink-300">🧬 {isEditing ? "Editing" : "Latest"} NPC</h3>
              <span className="text-xs text-purple-400">
                {new Date(npc.createdAt).toLocaleString()}
              </span>
            </div>

            <div className="flex flex-col md:flex-row gap-6">
              <img
                src={npc.image}
                alt={npc.name}
                className="w-32 h-32 object-cover rounded-xl border-2 border-purple-500 self-center"
                onError={(e) => {
                  e.target.src = `https://robohash.org/${npc.name}?set=set2&size=150x150`;
                }}
              />

              <div className="flex-1 space-y-2 text-fuchsia-100">
                <p><strong className="text-pink-300">Name:</strong> {npc.name}</p>
                <p><strong className="text-pink-300">Personality:</strong> {npc.personality}</p>
                <p><strong className="text-pink-300">Backstory:</strong> {npc.backstory}</p>
              </div>
            </div>

            <div className="flex justify-center gap-4 mt-6 flex-wrap">
              <button
                onClick={handleMint}
                className="bg-gradient-to-r from-cyan-500 to-blue-600 px-4 py-2 rounded-lg font-medium flex items-center gap-1 hover:scale-105 transition-transform"
              >
                <Rocket size={16} /> Mint
              </button>
              <button
                onClick={handleEdit}
                className="bg-gradient-to-r from-yellow-500 to-orange-500 px-4 py-2 rounded-lg font-medium flex items-center gap-1 hover:scale-105 transition-transform"
              >
                <Pencil size={16} /> Edit
              </button>
              <button
                onClick={handleDelete}
                className="bg-gradient-to-r from-red-600 to-pink-600 px-4 py-2 rounded-lg font-medium flex items-center gap-1 hover:scale-105 transition-transform"
              >
                <Trash2 size={16} /> Delete
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Generate;
