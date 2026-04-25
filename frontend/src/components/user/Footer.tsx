import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';
import PinoyBitesLogo from '@/assets/PinoyBitesLogo.png';
import { useNavigate } from "react-router-dom";

export default function Footer() {
      const navigate = useNavigate();

      return (
            <footer className="bg-gray-900 text-gray-300">
                  <div className="max-w-[88%] mx-auto px-4 sm:px-6 lg:px-8 py-12">
                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
                              
                              {/* Brand */}
                              <motion.div
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, amount: 0.3 }}
                                    transition={{ duration: 0.30 }}
                                    className="text-center mb-12"
                              >
                                    <div className='flex items-center gap-2 mb-4'>
                                          <img
                                                src={PinoyBitesLogo}
                                                height={55}
                                                width={55}
                                          />
                              
                                          <h3 className="text-2xl font-bold text-white">Pinoy Bites</h3>
                                    </div>
                                    
                                    <p className="text-gray-400 mb-4">
                                          Crafting the finest Filipino snacks and merienda since 2015.  
                                          Fresh, delicious, and made with love for every Pinoy bite.
                                    </p>
                                    <div className="flex gap-4">
                                          <a href="#" className="hover:text-amber-500 transition-colors">
                                                <Facebook size={20} />
                                          </a>
                                          <a href="#" className="hover:text-amber-500 transition-colors">
                                                <Instagram size={20} />
                                          </a>
                                          <a href="#" className="hover:text-amber-500 transition-colors">
                                                <Twitter size={20} />
                                          </a>
                                    </div>
                              </motion.div>

                              {/* Quick Links */}
                              <motion.div
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, amount: 0.3 }}
                                    transition={{ duration: 0.30 }}
                              >
                                    <h4 className="text-white font-semibold mb-4">Quick Links</h4>
                                    <ul className="flex flex-col gap-2">
                                          <li>
                                                <button
                                                      onClick={() => navigate("/home")}
                                                      className="hover:text-amber-500 transition-colors"
                                                >
                                                      Home
                                                </button>
                                          </li>

                                          <li>
                                          <button
                                                onClick={() => navigate("/products")}
                                                className="hover:text-amber-500 transition-colors"
                                          >
                                                Our Products
                                          </button>
                                          </li>

                                          <li>
                                          <button
                                                onClick={() => navigate("/contact")}
                                                className="hover:text-amber-500 transition-colors"
                                          >
                                                Contact
                                          </button>
                                          </li>

                                          <li>
                                          <button
                                                onClick={() => navigate("/blog")}
                                                className="hover:text-amber-500 transition-colors"
                                          >
                                                Blog
                                          </button>
                                          </li>
                                    </ul>
                              </motion.div>

                              {/* Customer Service */}
                              <motion.div
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, amount: 0.3 }}
                                    transition={{ duration: 0.30 }}
                              >
                                    <h4 className="text-white font-semibold mb-4">Customer Service</h4>
                                    <ul className="space-y-2">
                                          <li><a href="#" className="hover:text-amber-500 transition-colors">Contact Us</a></li>
                                          <li><a href="#" className="hover:text-amber-500 transition-colors">FAQs</a></li>
                                          <li><a href="#" className="hover:text-amber-500 transition-colors">Shipping & Delivery</a></li>
                                          <li><a href="#" className="hover:text-amber-500 transition-colors">Returns & Refunds</a></li>
                                          <li><a href="#" className="hover:text-amber-500 transition-colors">Privacy Policy</a></li>
                                    </ul>
                              </motion.div>

                              {/* Contact Info */}
                              <motion.div
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, amount: 0.3 }}
                                    transition={{ duration: 0.30 }}
                              >
                                    <h4 className="text-white font-semibold mb-4">Get in Touch</h4>
                                    <ul className="space-y-3">
                                          <li className="flex items-start gap-3">
                                                <MapPin size={20} className="shrink-0 mt-1" />
                                                <span>123 Baker Street<br />New York, NY 10001</span>
                                          </li>
                                          <li className="flex items-center gap-3">
                                                <Phone size={20} className="shrink-0" />
                                                <span>(555) 123-4567</span>
                                          </li>
                                          <li className="flex items-center gap-3">
                                                <Mail size={20} className="shrink-0" />
                                                <span>hello@breadhub.com</span>
                                          </li>
                                    </ul>
                                    <div className="mt-4">
                                          <p className="text-sm mb-2">Store Hours:</p>
                                          <p className="text-sm text-gray-400">
                                                Mon - Sat: 7:00 AM - 8:00 PM<br />
                                                Sunday: 8:00 AM - 6:00 PM
                                          </p>
                                    </div>
                              </motion.div>

                        </div>

                        {/* Newsletter */}
                        <motion.div
                              initial={{ opacity: 0, y: 30 }}
                              whileInView={{ opacity: 1, y: 0 }}
                              viewport={{ once: true, amount: 0.3 }}
                              transition={{ duration: 0.30 }}
                              className="border-t border-gray-800 pt-8 mb-8"
                        >
                              <div className="max-w-2xl mx-auto text-center">
                                    <h4 className="text-white font-semibold mb-2">Subscribe to Our Newsletter</h4>
                                    <p className="text-gray-400 mb-4">Get weekly updates on new products and special offers!</p>
                                    <div className="flex gap-2 max-w-md mx-auto">
                                          <input 
                                                type="email" 
                                                placeholder="Enter your email"
                                                className="flex-1 px-4 py-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-amber-500"
                                          />
                                          <button className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors">Subscribe</button>
                                    </div>
                              </div>
                        </motion.div>

                        {/* Bottom Bar */}
                        <motion.div
                              initial={{ opacity: 0, y: 30 }}
                              whileInView={{ opacity: 1, y: 0 }}
                              viewport={{ once: true, amount: 0.3 }}
                              transition={{ duration: 0.30 }}
                              className="border-t border-gray-800 pt-8 text-center text-gray-400 text-sm"
                        >
                              <p>&copy; 2026 Pinoy Bites. All rights reserved. Made with ❤️ and love for all Pinoy snack lovers.</p>
                        </motion.div>

                  </div>
            </footer>
      );
}
