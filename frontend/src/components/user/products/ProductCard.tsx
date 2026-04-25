import { Star, Heart, ShoppingCart, Info } from 'lucide-react';
import { ImageWithFallback } from '@/assets/figma/ImageWithFallback';
import { useModal } from '@/context/modal.context';
import type { CartItem, ProductType  } from '@/types/user/products.types';
import { useAuth } from '@/context/auth.context';
import { useState } from 'react';
import AddToCartModal from './AddToCartModal';
import ProductInfoModal from './ProductInfoModal';


interface ProductCardProps {
	product: ProductType;
	isFavorite: boolean;
	onToggleFavorite: (id: number) => void;
}

type ModalToOpen = 'add to cart' | 'view recipe' | null;
type ProductInfoType = {
	name: string,
	image_url: string,
	ingredients: string[],
	steps: string[]
};

export default function ProductCard({ product, isFavorite, onToggleFavorite }: ProductCardProps) {
	const { setModalOpen } = useModal();
	const { user } = useAuth();

	const [ showModal, setShowModal ] = useState<ModalToOpen>(null);
	const [selectedProduct, setSelectedProduct] = useState<CartItem | null>(null);
	const [ productRecipe, setViewRecipe ] = useState<ProductInfoType | null>(null);

	const handleAddToCart = () => {
		
		if (!user) {
			setModalOpen({ modalToOpen: "loginModal" });
			return;
		}

		const productSelected: CartItem = {
			product_id: product.product_id,
			name: product.name,
			description: product.description,
			price: product.price,
			image_url: product.image_url,
			category: product.category
		};
		
		setSelectedProduct(productSelected);
		setShowModal('add to cart');
	};

	const handleViewItemInfo = () => {
		setShowModal('view recipe');
		setViewRecipe({
			name: product.name,
			image_url: product.image_url,
			ingredients: product.ingredients,
			steps: product.steps
		})
	};

	return (
		<>
			<div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 relative">
				{/* Favorite Button */}
				<button
					onClick={() => {
						user ? onToggleFavorite(product.product_id)
						: setModalOpen({ modalToOpen: 'loginModal' })			
					}}
					className="absolute top-3 right-3 z-10 bg-white/90 backdrop-blur-sm p-2 rounded-full hover:bg-white transition-all"
				>
					<Heart size={20} className={isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-900 hover:text-red-500'}/>
				</button>

				{/* New Badge */}
				{product.is_new && (
					<div className="absolute top-3 left-3 z-10">
						<span className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold">NEW</span>
					</div>
				)}

				{/* Product Image */}
				<div className="relative overflow-hidden rounded-t-xl">
					<ImageWithFallback
						src={product.image_url}
						alt={product.name}
						className="w-full h-48 object-cover hover:scale-110 transition-transform duration-300"
					/>
				</div>

				{/* Product Info */}
				<div className="p-4 space-y-3">
					<div className='h-20'>
						<h3 className="text-lg font-bold text-gray-900 mb-1">
							{product.name}
						</h3>
						<p className="text-gray-600 text-sm line-clamp-2">
							{product.description}
						</p>
					</div>

					<div className="flex items-center gap-1">
						<Star className="fill-amber-400 text-amber-400" size={16} />
						<span className="font-semibold text-gray-900 text-sm">{product.avg_rating}</span>
						<span className="text-gray-500 text-xs">({product.total_reviews})</span>
					</div>

					<div className="flex items-center justify-between pt-2">
						<span className="text-xl font-bold text-amber-600">
							₱{product.price}
						</span>

						<div className='relative flex items-center gap-2'>
							{/* Item Info */}
							<button 
								onClick={handleViewItemInfo}
								className="bg-blue-600 hover:bg-blue-700 hover:scale-105 transition-all duration-200 ease-in-out text-white p-2 rounded-lg flex items-center justify-center group"
							>
								<Info size={18} />

								{/* Tooltip for this icon */}
								<span className="absolute -top-7 left-1/2 -translate-x-1/2 bg-blue-500 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
									View Recipe
								</span>
							</button>

							{/* Add to Cart Icon */}
							<button 
								onClick={handleAddToCart}
								className="bg-amber-600 hover:bg-amber-700 hover:scale-105 transition-all duration-200 ease-in-out text-white p-2 rounded-lg flex items-center justify-center group"
							>
								<ShoppingCart size={18} />

								{/* Tooltip for this icon */}
								<span className="absolute -top-7 left-1/2 -translate-x-1/2 bg-amber-500 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
									Add to cart!
								</span>
							</button>
						</div>
					</div>
				</div>
			</div>

			{showModal === 'add to cart' ?
				(
					<AddToCartModal 
						product={selectedProduct!} 
						open={true} 
						onClose={() => setShowModal(null)}
					/>
				)
			: showModal === 'view recipe' ?
				(
					<ProductInfoModal
						product={productRecipe!}
						open={true} 
						onClose={() => setShowModal(null)}
					/>
				)
			: null
			}
		</>
	);
}
