import { Wheat, Clock, Award, Heart, Leaf, Users } from 'lucide-react';
import { motion } from 'framer-motion';
import { pageWidth } from '@/utils/padding';

const features = [
  {
    icon: Wheat,
    title: 'Premium Ingredients',
    description: 'We use only the finest organic flour, natural yeast, and locally sourced ingredients in all our products.'
  },
  {
    icon: Clock,
    title: 'Baked Fresh Daily',
    description: 'Every item is baked fresh each morning to ensure maximum freshness and quality for our customers.'
  },
  {
    icon: Award,
    title: 'Award Winning',
    description: 'Recognized by food critics and awarded multiple times for excellence in artisan baking.'
  },
  {
    icon: Heart,
    title: 'Made with Love',
    description: 'Each loaf is crafted with passion by our experienced bakers who take pride in their craft.'
  },
  {
    icon: Leaf,
    title: 'All Natural',
    description: 'No artificial preservatives, colors, or flavors. Just pure, wholesome ingredients you can trust.'
  },
  {
    icon: Users,
    title: 'Community Focused',
    description: 'Proud to serve our local community and support local farmers and sustainable practices.'
  }
];

export default function WhyChooseUs() {
	return (
		<section className={`${pageWidth}`}>
			<motion.div
				initial={{ opacity: 0, y: 50 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true, amount: 0.3 }}
				transition={{ duration: 0.8 }}
				className="text-center mb-16"
			>
				<h2 className="text-4xl font-bold text-gray-900 mb-4">
					Why Choose Bread Hub?
				</h2>
				<p className="text-lg text-gray-600 max-w-2xl mx-auto">
					We're not just a bakery - we're a tradition of excellence, quality, and community.
				</p>
			</motion.div>

			<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
				{features.map((feature, index) => {
					const Icon = feature.icon;
					return (
						<motion.div
							key={index}
							initial={{ opacity: 0, y: 30 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true, amount: 0.1 }} // the trigger when to show the component
							transition={{ duration: 0.25, delay: index * 0.1 }} // stagger effect
							className="group p-8 rounded-xl bg-linear-to-br from-amber-50 to-orange-50 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
						>
							<div className="w-14 h-14 bg-amber-600 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
								<Icon className="text-white" size={28} />
							</div>
							<h3 className="text-xl font-bold text-gray-900 mb-3">
								{feature.title}
							</h3>
							<p className="text-gray-600 leading-relaxed">
								{feature.description}
							</p>
						</motion.div>
					);
				})}
			</div>
			
			<motion.div
				initial={{ opacity: 0, y: 30 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true, amount: 0.3 }}
				transition={{ duration: 0.25 }}
				className="mt-16 bg-linear-to-r from-amber-600 to-orange-600 rounded-2xl p-12 text-center text-white"
			>
				<h3 className="text-3xl font-bold mb-4">
					Experience the Difference Today
				</h3>
				<p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
					Join hundreds of satisfied customers who start their day with our freshly baked goods.
				</p>
				<button className="bg-white text-amber-600 hover:bg-gray-100 px-8 py-4 rounded-lg font-semibold transition-colors">
					Visit Our Store
				</button>
			</motion.div>			
		</section>
	);
}
