import Cursor from './components/Cursor.jsx';
import PageGlows from './components/PageGlows.jsx';
import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';
import Stats from './components/Stats.jsx';
import Services from './components/Services.jsx';
import About from './components/About.jsx';
import Clients from './components/Clients.jsx';
import Careers from './components/Careers.jsx';
import Contact from './components/Contact.jsx';
import Footer from './components/Footer.jsx';
import './components/Sections.css';

export default function App() {
  return (
    <>
      <Cursor />
      <Navbar />
      <main>
        <PageGlows />
        <Hero />
        <Stats />
        <Services />
        <About />
        <Clients />
        <Careers />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
