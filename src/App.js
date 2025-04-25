import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Generate from './pages/Generate';
import ViewNPCs from './pages/ViewNPCs';
import MyNPCs from './pages/MyNPCs';
import BrowseNPCs from './pages/BrowseNPCs'; // <-- added this line
import CryptoTransactionPage from './pages/CryptoTransactionPage'; // <-- added this line
import './App.css'; // global styles for cursor trail

function App() {
  useEffect(() => {
    const cursor = document.createElement('div');
    cursor.classList.add('custom-cursor');
    document.body.appendChild(cursor);

    const trailDots = [];
    const maxTrail = 50;

    const createTrailDot = (x, y) => {
      const dot = document.createElement('div');
      dot.className = 'trail-dot';
      dot.style.left = `${x}px`;
      dot.style.top = `${y}px`;
      document.body.appendChild(dot);
      trailDots.push(dot);

      if (trailDots.length > maxTrail) {
        const oldDot = trailDots.shift();
        oldDot.remove();
      }
    };

    const moveCursor = (e) => {
      cursor.style.left = `${e.clientX}px`;
      cursor.style.top = `${e.clientY}px`;
      createTrailDot(e.clientX, e.clientY);
    };

    window.addEventListener('mousemove', moveCursor);
    return () => window.removeEventListener('mousemove', moveCursor);
  }, []);

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/generate" element={<Generate />} />
        <Route path="/view" element={<ViewNPCs />} />
        <Route path="/my-npcs" element={<MyNPCs />} />
        <Route path="/browse" element={<BrowseNPCs />} /> {/* new route */}
        <Route path="/crypto-transaction-page" element={<CryptoTransactionPage />} /> {/* new route */}
      </Routes>
    </Router>
  );
}

export default App;
