import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import ScrollToTop from './components/common/ScrollToTop'; 
import RouteScrollRestoration from './components/common/RouteScrollRestoration';
import AIChatWidget from './components/ai/AIChatWidget';
import CartSidebar from './components/cart/CartSidebar';

// Pages
import HomePage from './pages/HomePage';
import CategoryPage from './pages/CategoryPage';
import ProductDetails from './pages/ProductDetails';
import BrandHistory from './pages/BrandHistory';
import NotFoundPage from './pages/NotFoundPage'; 
import LoginPage from './pages/LoginPage';
import ProductEditPage from './pages/admin/ProductEditPage';

// Admin
import AdminRoute from './components/routing/AdminRoute'; // <-- 1. Import wrapper
import AdminDashboard from './pages/admin/AdminDashboard'; // <-- 2. Import dashboard

function App() {
  return (
    <Router>
      <RouteScrollRestoration /> 
      
      <div className="font-sans text-[#333333] antialiased relative min-h-screen flex flex-col">
        <Navbar />
        
        <main className="flex-grow">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/categories" element={<CategoryPage />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/history" element={<BrandHistory />} /> 
            <Route path="/login" element={<LoginPage />} />
            
            {/* --- ADMIN ONLY ROUTES --- */}
            <Route path="" element={<AdminRoute />}>
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              <Route path="/admin/product/:id/edit" element={<ProductEditPage />} />
            </Route>

            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
        
        <CartSidebar /> 
        <AIChatWidget />
        <ScrollToTop />
        <Footer />
      </div>
    </Router>
  );
}

export default App;