import { ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { faqs } from '@/utils/SampleData';
import { pageWidth } from '@/utils/padding';

export default function FAQ() {
	const [openIndex, setOpenIndex] = useState<number | null>(0);

	return (
		<section className="bg-gradient-to-b from-gray-50 to-white">
			<div className={`${pageWidth}`}>
				<motion.div
					initial={{ opacity: 0, y: 30 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true, amount: 0.3 }}
					transition={{ duration: 0.25 }}
					className="text-center mb-12"
				>
					<h2 className="text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
					<p className="text-lg text-gray-600">
						Got questions? We've got answers! Here's everything you need to know.
					</p>
				</motion.div>
				
				<div className="space-y-4">
					{faqs.map((faq, index) => (
						<motion.div
							key={index}
							initial={{ opacity: 0, y: 30 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true, amount: 0.1 }} // the trigger when to show the component
							transition={{ duration: 0.25, delay: index * 0.1 }} // stagger effect
							className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
						>
							<button
								onClick={() => setOpenIndex(openIndex === index ? null : index)}
								className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
							>
								<span className="font-semibold text-gray-900 pr-4">
									{faq.question}
								</span>
								<ChevronDown 
									className={`text-amber-600 flex-shrink-0 transition-transform duration-300 ${
										openIndex === index ? 'rotate-180' : ''
									}`}
									size={24}
								/>
							</button>
							
							<div className={`overflow-hidden transition-all duration-300 ${openIndex === index ? 'max-h-96' : 'max-h-0'}`}>
								<div className="px-6 pb-5 text-gray-600 leading-relaxed">
									{faq.answer}
								</div>
							</div>	
						</motion.div>
					))}
				</div>

				<motion.div
					initial={{ opacity: 0, y: 30 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true, amount: 0.3 }}
					transition={{ duration: 0.25 }}
					className="mt-12 text-center"
				>
					<p className="text-gray-600 mb-4">Still have questions? We're here to help!</p>
					<button className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors">Contact Us</button>
				</motion.div>
			</div>
		</section>
	);
}
