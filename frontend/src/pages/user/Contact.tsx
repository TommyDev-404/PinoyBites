//import { Map } from '@/components/Map';
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { fadeUp, slideLeft, slideRight  } from "@/utils/helper";
import StoreInfo from "@/components/user/contact/StoreInfo";
import MapFallbackImage from "@/components/user/contact/MapFallbackImage";
import BranchAnnouncement from "@/components/user/contact/BranchAnnouncement";
import { pageWidth } from "@/utils/padding";

export default function ContactContent() {
      const [isOnline, setIsOnline] = useState(navigator.onLine);

      useEffect(() => {
            const goOnline = () => setIsOnline(true);
            const goOffline = () => setIsOnline(false);

            window.addEventListener("online", goOnline);
            window.addEventListener("offline", goOffline);

            return () => {
                  window.removeEventListener("online", goOnline);
                  window.removeEventListener("offline", goOffline);
            };
      }, []);

      return (
            <section className={`${pageWidth}`}>
                  <motion.div
                        className="text-center mb-12"
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        transition={{ duration: 0.50 }}
                  >
                        <h2 className="text-4xl font-bold text-gray-900 mb-4">Find Us Here</h2>
                        <p className="text-lg text-gray-600">Visit our bakery and experience fresh bread straight from the oven.</p>
                  </motion.div>
      
                  <div className="grid lg:grid-cols-2 gap-12">
                        <motion.div
                              className="space-y-8"
                              variants={slideLeft}
                              initial="hidden"
                              whileInView="visible"
                              viewport={{ once: true }}
                              transition={{ duration: 0.50 }}
                        >
                              <StoreInfo/>
                        </motion.div>
      

                        {/* GOOGLE MAP */}
                        <motion.div
                              className="h-[450px] rounded-xl overflow-hidden shadow-md"
                              variants={slideRight}
                              initial="hidden"
                              whileInView="visible"
                              viewport={{ once: true }}
                              transition={{ duration: 0.6 }}
                        >
                              {isOnline ? (
                                    <iframe
                                          src="https://www.google.com/maps?q=Quezon+City&output=embed"
                                          className="w-full h-full border-0"
                                          loading="lazy"
                                    />
                              ) : ( 
                                    <MapFallbackImage/>
                              )}
                        </motion.div>
                  </div>

                  <motion.div
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        transition={{ duration: 0.50 }}
                  >    
                        <BranchAnnouncement/>
                  </motion.div>      
            </section>
      );
}

