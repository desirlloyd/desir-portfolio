import React from 'react';
import Navbar from './components/Navbar/Navbar';
import ParticlesBackground from './components/ParticlesBackground/ParticlesBackground';
import Hero from './components/Hero/Hero';
import About from './components/About/About';
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
        {/* Independent Hero & About sections with their respective dedicated animations */}
        <Hero />
        <About />

        {/* Rest of the page continues normally */}
        <Skills />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
