import Hero from '@/components/user/home/Hero';
import FeaturedProducts from '@/components/user/home/Featured';
import WhyChooseUs from '@/components/user/home/WhyChooseUs';
import CustomerReviews from '@/components/user/home/CustomerReview';
import FAQ from '@/components/user/home/FAQ';

export default function Home(){
      return (
            <div>
                  <Hero/>
                  <FeaturedProducts/>
                  <CustomerReviews/>
                  <WhyChooseUs/>
                  <FAQ/>
            </div>
      );
}