import { ImageWithFallback } from "@/assets/figma/ImageWithFallback";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { useRateProducts, useViewOrder } from "@/hooks/user/notifications.hooks";
import type { SubmitProductRatingInfo, ViewOrderPayload } from "@/types/user/notification.types";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";
import OverlaySpinner from "@/components/shared/OverlaySpinner";

type OrderDetailsModalProps = {
	open: boolean;
	onClose: () => void;
	payload: ViewOrderPayload;
};

export default function NotifOrderDetailsModal({ open, onClose, payload }: OrderDetailsModalProps) {
	const { data: orderData, isLoading: viewOrderLoading } = useViewOrder(
		payload.user_id,
		payload.order_id,
	);
	const order = orderData?.orders;
	const allRated = order?.order_items.every(item => item.is_rated);

	const { register, handleSubmit, watch, setValue } = useForm<SubmitProductRatingInfo>({
		defaultValues: {
			user_id: payload.user_id,
			order_id: payload.order_id,
			notif_id: payload.notif_id,
			products: order?.order_items.map((item) => ({
				product_id: item.product_id,
				rating: 0, // used to prevent sending the already rated data
				comment: '',
			}))
		}
	});
	
	const { mutate: rateProducts } = useRateProducts(onClose);

	const onSubmit = (data: SubmitProductRatingInfo) => {
		// Only include products that are not rated
		const notRatedProducts = data.products.filter(p => p.rating > 0);

		if (!notRatedProducts) return;

		rateProducts({
			user_id: data.user_id,
			order_id: data.order_id,
			notif_id: data.notif_id,
			products: notRatedProducts
		});
		onClose();
	};

	const statusColors: Record<string, string> = {
		Delivered: "bg-emerald-100 text-emerald-800",
		"In Transit": "bg-amber-100 text-amber-800",
		Cancelled: "bg-red-100 text-red-800",
		Pending: "bg-blue-100 text-blue-800",
	};

	if (viewOrderLoading) return <OverlaySpinner open={viewOrderLoading} message="Retreiving data..."/>;

	return (
		<Dialog open={open} onOpenChange={onClose}>
			<DialogContent className="max-w-md">
				<DialogHeader>
					<DialogTitle>Order Details</DialogTitle>
					<DialogDescription>
						View your order items details and add ratings/comments.
					</DialogDescription>
				</DialogHeader>

				{/* Product Info */}
				<div className="mt-4 space-y-2">
					<p className="text-stone-800 font-medium text-sm">Your Items:</p>
					<div className="max-h-80 overflow-y-auto space-y-4">
						{order?.order_items.map((item, index) => {
							const rating = watch(`products.${index}.rating`); // watch current rating value
							
							return (
								<div key={item.product_id} className="flex flex-col gap-2 border-b border-gray-200 pb-2">
									<div className="flex items-center gap-4">
										<input 
											type="hidden"
											{...register(`products.${index}.product_id`)}
											value={item.product_id}
										/>
										<ImageWithFallback
											src={item.image_url}
											alt={item.name}
											className="w-20 h-20 object-cover rounded-lg"
										/>
										<div className="flex-1">
											<div className="flex justify-between">
												<h4 className="font-bold">{item.name}</h4>
												{item.is_rated &&
													<span className="text-xs text-green-600 font-semibold bg-green-50 py-1 px-2 rounded-sm">Already Rated</span>
												}
											</div>
											<p className="text-sm text-gray-500">Qty: {item.quantity}</p>
											<p className="text-sm text-gray-700 font-semibold">₱{item.price * item.quantity!}</p>

											{/* Rating Section */}
											{item.is_rated && order.status === "Delivered" ? (
												<div className="flex items-center gap-1">
													{[1, 2, 3, 4, 5].map((star) => (
														<span
															key={star}
															className={`text-lg ${
																star <= item.rating! ? "text-amber-400" : "text-gray-300"
															}`}
														>
															★
														</span>
													))}
												</div>
											) :  !item.is_rated && order.status === "Delivered" ? (
												<div className="flex flex-col mt-1 gap-1">
													{/* Hidden input to register rating */}
													<input
														type="hidden"
														{...register(`products.${index}.rating`, { required: true })}
													/>

													{/* Stars */}
													<div className="flex items-center gap-1">
														{[1, 2, 3, 4, 5].map((star) => (
															<button
																key={star}
																type="button"
																className={`text-lg ${
																	rating >= star ? "text-amber-400" : "text-gray-300"
																}`}
																onClick={() => setValue(`products.${index}.rating`, star)} // set rating value
															>
																★
															</button>
														))}
													</div>

													{/* Comment */}
													<Textarea
														{...register(`products.${index}.comment`)}
														placeholder="Leave a comment..."
														className="w-full border border-gray-300 rounded-md p-2 text-sm resize-none"
														rows={2}
													/>
												</div>
											): ''}
										</div>
									</div>
								</div>
							);
						})}
					</div>
				</div>

				{/* Order Info */}
				<div className="mt-4 space-y-2 text-sm">
					<p>
						<span className="font-medium">Order Date: </span>{" "}
						{new Date(order?.order_date!).toLocaleDateString("en-US", {
							month: "short",
							day: "numeric",
							year: "numeric",
						})}
					</p>
					<p className="flex items-center gap-2">
						<span className="font-medium">Status:</span>
						<span
							className={`px-2 py-1 rounded-md text-xs ${
								statusColors[payload.status] || "bg-gray-100 text-gray-800"
							}`}
						>
							{payload.status}
						</span>
					</p>
					<p>
						<span className="font-medium">Total to Pay:</span>{" "}
						<span className="text-gray-800 font-semibold">
							₱{order?.total_price}
						</span>
					</p>
				</div>

				{/* Submit Rating Button */}
				{order?.status === "Delivered" && !allRated && 
					<div className="mt-4 flex justify-end">
						<Button
							onClick={handleSubmit(onSubmit)}
							className="px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition"
						>
							Submit Ratings & Comments
						</Button>
					</div>
				}
			</DialogContent>
		</Dialog>
	);
}