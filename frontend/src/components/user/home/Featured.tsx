import { Star, ShoppingCart, ChevronLeft, ChevronRight } from 'lucide-react';
import { ImageWithFallback } from '../../../assets/figma/ImageWithFallback';
import { useModal } from '@/context/modal.context';
import { useAuth } from '@/context/auth.context';
import type { CartItem } from '@/types/user/products.types';
import Slider from "react-slick";
import { motion } from 'framer-motion';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { pageWidth } from '@/utils/padding';
import { useFeaturedProducts } from '@/hooks/user/home.hooks';
import type { ProductType } from '@/types/user/products.types';

// Fully visible arrows
function NextArrow({ onClick }: any) {
	return (
	<button
		onClick={onClick}
		className="absolute top-1/2 -right-6 transform -translate-y-1/2 z-20 bg-amber-600 hover:bg-amber-700 text-white p-2 rounded-full shadow-lg"
	>
		<ChevronRight size={24} />
	</button>
	);
}

function PrevArrow({ onClick }: any) {
	return (
	<button
		onClick={onClick}
		className="absolute top-1/2 -left-6 transform -translate-y-1/2 z-20 bg-amber-600 hover:bg-amber-700 text-white p-2 rounded-full shadow-lg"
	>
		<ChevronLeft size={24} />
	</button>
	);
}

export default function FeaturedProducts() {
	const { setModalOpen } = useModal();
	const { user } = useAuth();

	const { data: featuredProductsData} = useFeaturedProducts();
	const featuredProducts = featuredProductsData?.products ?? [];

	const handleAction = (product: ProductType) => {
		const productSelected: CartItem = {
			product_id: product.product_id,
			name: product.name,
			description: product.description,
			price: product.price,
			quantity: 1,
			image_url: product.image_url,
			category: product.category,
		};

		user ? 
			setModalOpen({ modalToOpen: 'addToCart', productPayload: productSelected })
		:
			setModalOpen({ modalToOpen: 'loginModal' });
	};

	const settings = {
		dots: true,
		speed: 500,
		slidesToShow: 4,
		slidesToScroll: 1,
		nextArrow: <NextArrow />,
		prevArrow: <PrevArrow />,
		responsive: [
			{ breakpoint: 1024, settings: { slidesToShow: 2 } },
			{ breakpoint: 640, settings: { slidesToShow: 1 } }
		]
	};

	return (
		<section className={`${pageWidth}`}>
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true, amount: 0.3 }}
				transition={{ duration: 0.30 }}
				className="text-center mb-12"
			>
				<h2 className="text-4xl font-bold text-gray-900 mb-4">
					Our Most Loved Pinoy Snacks
				</h2>
				<p className="text-lg text-gray-600 max-w-2xl mx-auto">
					Handpicked favorites cherished by our customers—bibingka, puto, turon, biko, and more.
				</p>
			</motion.div>

			<motion.div
				initial={{ opacity: 0, y: 20 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true, amount: 0.3 }}
				transition={{ duration: 0.30 }}
			>
				<Slider {...settings} className="px-2 relative">
					{featuredProducts.map((product) => (
						<div key={product.product_id} className="px-2">
							<div className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-lg transition-all ease-in-out duration-300 group">
								<div className="relative overflow-hidden">
									<ImageWithFallback
										src={product.image_url}
										alt={product.name}
										className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
									/>
									<div className="absolute top-4 left-4">
										<span className="bg-amber-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
											{product.is_new ? 'NEW' : product.category}
										</span>
									</div>
								</div>

								<div className="p-6 space-y-4">
									<div className="h-20">
										<h3 className="text-xl font-bold text-gray-900 mb-2">{product.name}</h3>
										<p className="text-gray-600 text-sm">{product.description}</p>
									</div>

									<div className="flex items-center gap-1">
										<Star className="fill-amber-400 text-amber-400" size={18} />
										<span className="font-semibold text-gray-900">{product.avg_rating}</span>
										<span className="text-gray-500 text-sm">({product.total_reviews} reviews)</span>
									</div>

									<div className="flex items-center justify-between pt-2">
										<span className="text-2xl font-bold text-amber-600">₱{product.price}</span>
										<button
											onClick={() => handleAction(product)}
											className="bg-amber-600 hover:bg-amber-700 hover:scale-105 transition duration-200 text-white px-6 py-2 rounded-lg flex items-center gap-2"
										>
											<ShoppingCart size={18} /> Add to Cart
										</button>
									</div>
								</div>
							</div>
						</div>
					))}
				</Slider>
			</motion.div>
		</section>
	);
}