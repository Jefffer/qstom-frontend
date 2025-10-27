import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import TopBanner from './components/TopBanner';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import Home from './pages/Home';
import Catalog from './pages/Catalog';
import About from './pages/About';
import Contact from './pages/Contact';
import Lab from './pages/Lab';
import './App.css';

function AppContent() {
  const location = useLocation();
  const isLabPage = location.pathname === '/lab';

  return (
    <div className="min-h-screen bg-black text-white">
      {!isLabPage && <TopBanner />}
      {!isLabPage && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/catalogo" element={<Catalog />} />
        <Route path="/nosotros" element={<About />} />
        <Route path="/contacto" element={<Contact />} />
        <Route path="/lab" element={<Lab />} />
      </Routes>
      {!isLabPage && <Footer />}
      {!isLabPage && <WhatsAppButton />}
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;