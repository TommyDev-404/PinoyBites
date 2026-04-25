import { Card } from "@/components/ui/card";
import Logo from "@/components/user/Logo";
import { ArrowLeftCircle } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function AuthLayout({ children } : { children: React.ReactNode }) {
      const navigate = useNavigate();

      return (
            <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-stone-50 p-4">
                  <div className="relative w-full max-w-md z-10">

                        {/* Back Button */}
                        <div className="mb-6">
                              <button
                                    onClick={() => navigate("/home")}
                                    className="flex items-center gap-2 text-sm font-semibold text-amber-600 hover:text-amber-700 hover:underline transition group cursor-pointer"
                              >
                                    <ArrowLeftCircle className="w-5 transition-transform group-hover:-translate-x-1" />
                                    Back to Home
                              </button>
                        </div>

                        {/* Logo */}
                        <div className="flex justify-center mb-8">
                              <Logo size="md" />
                        </div>

                        {/* Glass Card */}
                        <motion.div
                              initial={{ opacity: 0, y: 40 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.30 }}
                        >
                              <Card className="bg-white backdrop-blur-sm rounded-2xl shadow-sm py-4 px-2">
                                    {children}
                              </Card>
                        </motion.div>

                        {/* Footer */}
                        <p className="text-center text-sm text-gray-600 mt-6">© 2026 Pinoy Bites. All rights reserved.</p>
                  </div>
            </div>
      );
}