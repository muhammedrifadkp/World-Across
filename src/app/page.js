import HeroSection from '@/components/home/HeroSection';
import FeaturedOffers from '@/components/home/FeaturedOffers';
import DestinationCategories from '@/components/home/DestinationCategories';
import MembershipPlans from '@/components/home/MembershipPlans';
import WhyChooseUs from '@/components/home/WhyChooseUs';
import Testimonials from '@/components/home/Testimonials';
import Partners from '@/components/home/Partners';

export default function Home() {
  return (
    <div className="overflow-hidden">
      <HeroSection />
      <FeaturedOffers />
      <DestinationCategories />
      <MembershipPlans />
      <WhyChooseUs />
      <Testimonials />
      <Partners />
    </div>
  );
}
