import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import HomePage from './pages/HomePage';
import CategoryPage from './pages/CategoryPage';
import ProductDetails from './pages/ProductDetails';
import BrandHistory from './pages/BrandHistory'; // <-- 1. Import the new page
import NotFoundPage from './pages/NotFoundPage'; 
import ScrollToTop from './components/common/ScrollToTop'; 
import RouteScrollRestoration from './components/common/RouteScrollRestoration';
import AIChatWidget from './components/ai/AIChatWidget';

function App() {
  return (
    <Router>
      <RouteScrollRestoration /> 
      
      <div className="font-sans text-[#333333] antialiased relative min-h-screen flex flex-col">
        <Navbar />
        
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/categories" element={<CategoryPage />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            
            {/* 2. Replace the old placeholder with the actual component */}
            <Route path="/history" element={<BrandHistory />} /> 
            
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
        
        <AIChatWidget />
        <ScrollToTop />
        <Footer />
      </div>
    </Router>
  );
}

export default App;