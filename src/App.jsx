import React, { useEffect } from 'react';
import Navbar from './components/Navbar/Navbar';
import ParticlesBackground from './components/ParticlesBackground/ParticlesBackground';
import ScrollScene from './components/ScrollScene/ScrollScene';
import Skills from './components/Skills/Skills';
import Projects from './components/Projects/Projects';
import Contact from './components/Contact/Contact';
import Footer from './components/Footer/Footer';
import './App.css';
function App() {
  return (
    <div className="App">
      <ParticlesBackground />
      <Navbar />
      <main>
        {/*
          ScrollScene is 300vh tall and contains BOTH the Hero and
          About sections inside a sticky viewport container.
          All card animation happens inside via scroll-scrubbed DOM updates.
        */}
        <ScrollScene />

        {/* Rest of the page continues normally after the sticky scene */}
        <Skills />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
