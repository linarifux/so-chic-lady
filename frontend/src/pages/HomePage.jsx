import HeroSection from '../components/home/HeroSection';
import TrustBadges from '../components/home/TrustBadges';
import BrandsSection from '../components/home/BrandsSection';
import TrendingNow from '../components/home/TrendingNow';
import FeaturedCategories from '../components/home/FeaturedCategories';
import AiStylistPromo from '../components/home/AiStylistPromo';
import BrandHistorySection from '../components/home/BrandHistorySection';
import Testimonials from '../components/home/Testimonials';
import FAQ from '../components/home/FAQ';
import InstagramFeed from '../components/home/InstagramFeed'; 
import StoreLocation from '../components/home/StoreLocation';
import Newsletter from '../components/home/Newsletter';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-[#FAFAFA] flex flex-col overflow-hidden">
      <HeroSection />
      <TrustBadges />
      <BrandsSection />
      <TrendingNow />
      <FeaturedCategories />
      <AiStylistPromo />
      <BrandHistorySection />
      <Testimonials />
      <FAQ /> 
      <InstagramFeed /> 
      <StoreLocation />
      <Newsletter />
    </div>
  );
};

export default HomePage;