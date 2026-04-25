import { motion } from "framer-motion"
import { ShoppingCart } from "lucide-react"

type Feature = {
      icon: React.ReactNode
      title: string
      description: string
      bgColor?: string
}

interface TrustIndicatorProps {
      features?: Feature[]
}

export default function TrustIndicator({
      features = [
      {
            icon: <ShoppingCart className="w-6 h-6 text-green-600" />,
            title: "Fresh Ingredients",
            description: "100% fresh, locally sourced",
            bgColor: "bg-green-100"
      },
      {
            icon: <>🚚</>,
            title: "Fast Delivery",
            description: "30 minutes or it's free",
            bgColor: "bg-amber-100"
      },
      {
            icon: <>💳</>,
            title: "Secure Payment",
            description: "Your data is protected",
            bgColor: "bg-indigo-100"
      }
      ]
}: TrustIndicatorProps) {

      return (
            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                  {features.map((feature, index) => (
                        <motion.div
                        key={index}
                        className="p-4 rounded-lg shadow-sm hover:shadow-md cursor-pointer bg-white"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        whileHover={{ scale: 1.05 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.25, delay: index * 0.1 }}
                        >
                        <div
                              className={`w-12 h-12 ${feature.bgColor} rounded-full flex items-center justify-center mx-auto mb-3`}
                        >
                              {feature.icon}
                        </div>
                        <h3 className="font-semibold mb-1">{feature.title}</h3>
                        <p className="text-sm text-gray-600">{feature.description}</p>
                        </motion.div>
                  ))}
            </div>
      )
}