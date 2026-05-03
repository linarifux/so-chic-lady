import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/common/Navbar';
import HomePage from './pages/HomePage';
import NotFoundPage from './pages/NotFoundPage'; 
import ScrollToTop from './components/common/ScrollToTop'; 
import AIChatWidget from './components/ai/AIChatWidget';
import Footer from './components/common/Footer';

function App() {
  return (
    <Router>
      <div className="font-sans text-[#333333] antialiased relative min-h-screen flex flex-col">
        <Navbar />
        
        {/* Main Content Area */}
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            
            {/* Placeholders for future pages */}
            <Route path="/categories" element={<div className="p-20 text-center text-2xl font-serif">Collection Page Coming Soon...</div>} />
            <Route path="/history" element={<div className="p-20 text-center text-2xl font-serif">Brand History Coming Soon...</div>} />
            
            
            {/* Catch-all 404 Route */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>

        <Footer />
        
        {/* Global Components */}
        <AIChatWidget />
        <ScrollToTop />
      </div>
    </Router>
  );
}

export default App;