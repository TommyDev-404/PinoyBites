import { Star, Quote, StarHalf } from 'lucide-react';
import { overallStats, reviews } from '@/utils/SampleData';
import { motion } from 'framer-motion';
import { pageWidth } from '@/utils/padding';
import { useFeaturedReviews } from '@/hooks/user/home.hooks';
import { getInitials } from '@/utils/helper';

export default function CustomerReviews() {
	const { data: featuredReviewsData } = useFeaturedReviews();
	const featuredReviews = featuredReviewsData?.payload;

	const rating = Number(featuredReviews?.overall_rating || 0);
	const fullStars = Math.floor(rating);
	const hasHalfStar = rating % 1 >= 0.5;

	const breakdown = [5, 4, 3, 2, 1].map((star) => {
		const found = featuredReviews?.star_percentage.find(
			(item) => Number(item.rating) === star
		);

		return {
			stars: star,
			percentage: found ? found.percentage : 0,
		};
	});

	return (
		<section className="bg-amber-100">
			<div className={`${pageWidth}`}>
				<motion.div
					initial={{ opacity: 0, y: 30 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true, amount: 0.3 }}
					transition={{ duration: 0.25 }}
					className="text-center mb-12"
				>
					<h2 className="text-4xl font-bold text-gray-900 mb-4">What Our Customers Say</h2>
					<p className="text-lg text-gray-600 max-w-2xl mx-auto">
						Don't just take our word for it - hear from our happy customers!
					</p>
				</motion.div>

				{/* Overall Rating */}
				<motion.div
					initial={{ opacity: 0, y: 30 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true, amount: 0.3 }}
					transition={{ duration: 0.25 }}
					className="bg-white rounded-2xl shadow-xl p-8 mb-12 max-w-4xl mx-auto"
				>
					<div className="grid md:grid-cols-2 gap-8 items-center">
						<div className="text-center md:text-left">
							<div className="text-6xl font-bold text-amber-600 mb-2">{Number(featuredReviews?.overall_rating || 0).toFixed(1)}</div>
							<div className="flex items-center justify-center md:justify-start gap-1 mb-2">
								{[...Array(5)].map((_, i) => {
									if (i < fullStars) {
										// full star
										return (
											<Star
												key={i}
												className="fill-amber-400 text-amber-400"
												size={24}
											/>
										);
									}

									if (i === fullStars && hasHalfStar) {
										// optional: half star (if you have icon)
										return (
											<StarHalf
												key={i}
												className="fill-amber-400 text-amber-400"
												size={24}
											/>
										);
									}

									// empty star
									return (
										<Star
										key={i}
										className="text-gray-300"
										size={24}
										/>
									);
								})}
							</div>
							<p className="text-gray-600">Based on {featuredReviews?.total_reviews} reviews</p>
						</div>

						<div className="space-y-2">
							{breakdown.map((item) => (
								<div key={item.stars} className="flex items-center gap-3">
									<div className="flex items-center gap-1 w-16">
										<span className="text-sm font-medium">{item.stars}</span>
										<Star className="fill-amber-400 text-amber-400" size={14} />
									</div>
									<div className="flex-1 bg-gray-200 rounded-full h-2 overflow-hidden">
										<div className="bg-amber-500 h-full rounded-full" style={{ width: `${item.percentage}%` }}/>
									</div>
									<span className="text-sm text-gray-600 w-12">{item.percentage}%</span>
								</div>
							))}
						</div>
					</div>
				</motion.div>

				{/* Individual Reviews */}
				<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
					{featuredReviews?.reviews.map((review, index) => (
						<motion.div
							key={index}
							initial={{ opacity: 0, y: 30 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true, amount: 0.1 }} // the trigger when to show the component
							transition={{ duration: 0.25, delay: index * 0.1 }} // stagger effect
							className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 relative"
						>
							<Quote className="absolute top-4 right-4 text-amber-200" size={32} />
							
							<div className="flex items-center gap-4 mb-4">
								<div className="w-12 h-12 bg-amber-600 text-white rounded-full flex items-center justify-center font-semibold">{getInitials(review.users.username)}</div>
								<div>
									<div className="font-semibold text-gray-900">{review.users.username}</div>
									<div className="text-sm text-gray-500">{new Date(review.created_at).toLocaleDateString('en-PH', { month: 'long', day: "2-digit", year: "numeric" })}</div>
								</div>
							</div>

							<div className="flex items-center justify-center md:justify-start gap-1 mb-2">
								{[...Array(5)].map((_, i) => {
									if (i < fullStars) {
										// full star
										return (
											<Star
												key={i}
												className="fill-amber-400 text-amber-400"
												size={24}
											/>
										);
									}

									if (i === fullStars && hasHalfStar) {
										// optional: half star (if you have icon)
										return (
											<StarHalf
												key={i}
												className="fill-amber-400 text-amber-400"
												size={24}
											/>
										);
									}

									// empty star
									return (
										<Star
										key={i}
										className="text-gray-300"
										size={24}
										/>
									);
								})}
							</div>

							<p className="text-gray-700 leading-relaxed">{`"${review.comment}"`}</p>
						</motion.div>
					))}
				</div>
			</div>
		</section>
	);
}
