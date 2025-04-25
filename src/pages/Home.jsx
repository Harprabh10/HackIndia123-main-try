import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles } from 'lucide-react';

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black text-white flex flex-col justify-center items-center text-center px-4 py-12">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <Sparkles className="w-16 h-16 mx-auto text-purple-400 animate-pulse" />
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
            Welcome to NPCverse
          </h1>
          <p className="text-lg md:text-xl text-gray-300 mb-8">
            Create, manage, and bring to life unique AI-powered NPCs for your games and stories.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
          <FeatureCard 
            icon="🧠" 
            title="Create" 
            description="Design unique characters with personalities and backstories" 
          />
          <FeatureCard 
            icon="🖼️" 
            title="Visualize" 
            description="Generate or upload character images" 
          />
          <FeatureCard 
            icon="📚" 
            title="Manage" 
            description="Organize your growing character library" 
          />
        </div>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link
            to="/generate"
            className="px-8 py-3 bg-cyan-500 hover:bg-cyan-400 text-black rounded-full font-bold text-lg shadow-lg transition-all hover:scale-105"
          >
            Get Started
          </Link>
          <Link
            to="/view"
            className="px-8 py-3 bg-purple-600 hover:bg-purple-500 text-white rounded-full font-bold text-lg shadow-lg transition-all hover:scale-105"
          >
            My NPCs
          </Link>
        </div>
      </div>
    </div>
  );
};

const FeatureCard = ({ icon, title, description }) => (
  <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700 hover:border-purple-500 transition-all">
    <span className="text-3xl mb-2 block">{icon}</span>
    <h3 className="text-xl font-bold mb-2 text-purple-300">{title}</h3>
    <p className="text-gray-400">{description}</p>
  </div>
);

export default Home;