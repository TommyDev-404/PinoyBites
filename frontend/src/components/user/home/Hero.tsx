import { ChevronDown, ShoppingCart } from 'lucide-react';
import { useNavigate } from "react-router-dom";
import { useAuth } from '@/context/auth.context';
import { motion } from "framer-motion";
import { Typewriter } from 'react-simple-typewriter'
import { useModal } from '@/context/modal.context';
import { allProducts } from '@/utils/SampleData';
import { fadeUp, slideLeft, slideRight  } from "@/utils/helper";
import Slider from "react-slick";
import pinoyBitesBg from '@/assets/pinoyBitesBg.png'
import { pageWidth } from '@/utils/padding';
import { useState } from 'react';

export default function Hero() {
      const { user } = useAuth();
      const { setModalOpen } = useModal();

      const navigate = useNavigate();

      const scrollToNextViewport = () => {
            window.scrollTo({
            top: window.innerHeight,
            behavior: "smooth",
            });
      };

      const handleOrderNow = () => {
            !user ? setModalOpen({ modalToOpen: 'loginModal'} ) : null;
      };

      const handleViewMenu = () => {
            navigate("/products");
      };

      const settings = {
            dots: true,
            infinite: true,
            speed: 800,
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 2000,
            arrows: false,
            pauseOnHover: true
      };

      return (
            <section 
                  id="featured"
                  className="relative overflow-hidden bg-cover bg-center"
                  style={{
                        backgroundImage: `url(${pinoyBitesBg})`
                  }}
            >
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black/80"></div>
                  <div className={`${pageWidth} h-screen relative grid lg:grid-cols-2 gap-12 items-center`}>

                        {/* Text Content */}
                        <motion.div
                              variants={slideLeft}
                              initial="hidden"
                              whileInView="visible"
                              viewport={{ once: true }}
                              transition={{ duration: 0.5 }}
                              className="space-y-10 md:space-y-12"
                        >
                              <div className="space-y-6 md:space-y-8 max-w-2xl">
                                    <div>
                                          {/* Heading */}
                                          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-amber-400 leading-tight tracking-tight drop-shadow-lg min-h-40">
                                                <Typewriter
                                                      words={[
                                                            'Authentic Filipino Snacks Delivered Fresh!',
                                                            'Made with love, enjoyed by all.',
                                                      ]}
                                                      loop={0}
                                                      cursor
                                                      cursorStyle="|"
                                                      typeSpeed={80}
                                                      deleteSpeed={50}
                                                      delaySpeed={2000}
                                                />
                                          </h1>

                                          {/* Subtitle */}
                                          <p className="text-base md:text-lg text-gray-200 drop-shadow-md">
                                                Experience the joy of Filipino merienda—from bibingka to turon—crafted with the finest ingredients for the perfect bite every time.
                                          </p>
                                    </div>
                              </div>

                              {/* Buttons */}
                              <div className="flex flex-col sm:flex-row gap-3 sm:gap-5 mt-4">
                              <button
                                    onClick={handleOrderNow}
                                    className="flex items-center justify-center gap-2 px-8 py-3 text-sm md:text-base font-semibold rounded-lg bg-amber-500 hover:bg-amber-600 hover:scale-105 transition-transform duration-200 text-white shadow-md"
                              >
                                    <ShoppingCart size={20} />
                                    Order Now
                              </button>

                              <button
                                    onClick={handleViewMenu}
                                    className="flex justify-center px-8 py-3 text-sm md:text-base font-semibold rounded-lg border-2 border-gray-200 bg-white text-gray-900 hover:bg-gray-50 hover:scale-105 transition-transform duration-200 shadow-sm"
                              >
                                    View Products
                              </button>
                              </div>

                              {/* Stats */}
                              <div className="flex flex-wrap gap-8 pt-6 text-center sm:text-left">
                              <div className="flex flex-col items-center sm:items-start">
                                    <div className="text-3xl md:text-4xl font-bold text-amber-500">500+</div>
                                    <div className="text-sm md:text-base text-gray-300">Happy Customers</div>
                              </div>

                              <div className="flex flex-col items-center sm:items-start">
                                    <div className="text-3xl md:text-4xl font-bold text-amber-500">50+</div>
                                    <div className="text-sm md:text-base text-gray-300">Snack Varieties</div>
                              </div>

                              <div className="flex flex-col items-center sm:items-start">
                                    <div className="text-3xl md:text-4xl font-bold text-amber-500">100%</div>
                                    <div className="text-sm md:text-base text-gray-300">Fresh Daily</div>
                              </div>
                              </div>
                        </motion.div>

                        {/* Image */}
                        <motion.div
                              variants={slideRight}
                              initial="hidden"
                              whileInView="visible"
                              viewport={{ once: true }}
                              transition={{ duration: 0.50 }}
                        >
                              <Slider {...settings} className="relative z-10">
                                    {allProducts.map((food, index) => (
                                          <div key={index} className="px-3">
                                                <div className="relative h-150 rounded-3xl overflow-hidden group shadow-xl">
                                                      <img
                                                            src={food.image}
                                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                                      />

                                                      {/* Gradient overlay */}
                                                      <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/30 to-transparent"></div>

                                                      {/* Text content */}
                                                      <div className="absolute bottom-6 left-6 right-6 text-white">
                                                            <h3 className="text-2xl font-bold">{food.name}</h3>
                                                            <p className="text-sm text-gray-200 mt-1">
                                                                  {food.description}
                                                            </p>
                                                      </div>

                                                </div>
                                          </div>
                                    ))}
                              </Slider>
                        </motion.div>

                        {/* Scroll Button */}
                        <motion.div
                              variants={fadeUp}
                              initial="hidden"
                              whileInView="visible"
                              viewport={{ once: true }}
                              transition={{ duration: 0.50 }}
                              className="absolute bottom-8 left-1/2 -translate-x-1/2"
                        >
                              <button
                                    onClick={scrollToNextViewport}
                                    className="group text-sm  flex gap-2 items-center py-3 px-6 border border-amber-400 rounded-full shadow-lg bg-amber-500 text-white transition-all duration-300"
                              >
                                    Scroll down to view more
                                    <ChevronDown className="animate-bounce group-hover:translate-y-1 transition-transform" />
                              </button>
                        </motion.div>

                  </div>

            </section>
      );
}
