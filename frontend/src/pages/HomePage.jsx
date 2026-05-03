import HeroSection from '../components/home/HeroSection';
import TrustBadges from '../components/home/TrustBadges';
import BrandsSection from '../components/home/BrandsSection';
import TrendingNow from '../components/home/TrendingNow';
import FeaturedCategories from '../components/home/FeaturedCategories';
import AiStylistPromo from '../components/home/AiStylistPromo'; // <-- New custom section
import BrandHistorySection from '../components/home/BrandHistorySection';
import Testimonials from '../components/home/Testimonials'; // <-- New custom section
import InstagramFeed from '../components/home/InstagramFeed'; 
import StoreLocation from '../components/home/StoreLocation';
import Newsletter from '../components/home/Newsletter';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-[#FAFAFA] flex flex-col overflow-hidden">
      <HeroSection />
      <TrustBadges />
      <BrandsSection />
      
      {/* Dynamic Inventory */}
      <TrendingNow />
      
      <FeaturedCategories />
      <AiStylistPromo />
      
      <BrandHistorySection />
      <Testimonials />
      <InstagramFeed /> 
      <StoreLocation />
      <Newsletter />
    </div>
  );
};

export default HomePage;