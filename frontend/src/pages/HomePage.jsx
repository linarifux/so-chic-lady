import HeroSection from '../components/home/HeroSection';
import ServicesSection from '../components/home/ServicesSection';
import FeaturedCategories from '../components/home/FeaturedCategories';
import BrandHistorySection from '../components/home/BrandHistorySection';
import InstagramFeed from '../components/home/InstagramFeed'; // <-- 1. Import it here
import StoreLocation from '../components/home/StoreLocation';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-[#FAFAFA] flex flex-col">
      <HeroSection />
      <ServicesSection />
      <FeaturedCategories />
      <BrandHistorySection />
      
      {/* 2. Place it right here */}
      <InstagramFeed /> 
      
      <StoreLocation />
    </div>
  );
};

export default HomePage;