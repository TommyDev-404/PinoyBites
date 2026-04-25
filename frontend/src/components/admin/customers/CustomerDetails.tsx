import { useState } from "react";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import type { CustomersInfo } from "@/types/admin/customers.types";
import { ShoppingBag, User } from "lucide-react";
import { useAdminAllCustomerOrderHistory } from "@/hooks/admin/customers.hooks";
import { getStatusBadge } from "@/utils/StatusBadge";

type Props = {
	customer: CustomersInfo
      open: boolean,
      onClose: () => void
};

// Modal component
export default function CustomerDetailsModal({ customer, open, onClose } : Props) {
	const [ activeTab, setActiveTab ] = useState('info');

	const { data:  ordersHistoryData, isLoading: ordersHistoryLoading } = useAdminAllCustomerOrderHistory(customer.user_id,
		{ enabled: activeTab === "orders" }
	);
	const ordersHistory = ordersHistoryData?.orders ?? [];

      return (
            <Dialog open={open} onOpenChange={onClose}>
			<DialogContent className="max-w-4xl w-full rounded-xl shadow-xl p-6">
				<DialogHeader>
					<DialogTitle className="text-2xl font-bold">Customer Details</DialogTitle>
				</DialogHeader>
			
				<Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="space-y-6">
					<TabsList className="border-b border-gray-200">
						<TabsTrigger value="info" className="text-lg font-medium">Info</TabsTrigger>
						<TabsTrigger value="orders" className="text-lg font-medium">Orders</TabsTrigger>
					</TabsList>
			
					{/* Info Tab */}
					<TabsContent value="info">
						<div className="bg-gray-50 rounded-xl p-6">
							{/* Top Profile Section */}
							<div className="flex flex-col items-center text-center">
								{/* Avatar */}
								{customer.profile_image && customer.profile_image !== "None" ?
									<img 
										src={customer.profile_image}
										alt={customer.username}
										className="w-28 h-28 rounded-full object-cover shadow"
									/>
								:
									<div className="w-28 h-28 bg-amber-100 rounded-full flex items-center justify-center text-5xl font-bold text-amber-600 shadow">
										<User className="w-12 h-12"/>
									</div>
								}

								{/* Name */}
								<p className="mt-4 text-2xl font-semibold">{customer.username}</p>
								
								<p className="text-sm text-stone-600">Customer</p>
							</div>

							{/* Divider */}
							<div className="border-t my-6"></div>

							{/* Info Section */}
							<div className="space-y-3 text-gray-700">

								<div className="grid grid-cols-3">
								<span className="font-medium">Loyalty Tier</span>
								<span className="col-span-2 text-right">{customer.loyalty_tier}</span>
								</div>

								<div className="grid grid-cols-3">
								<span className="font-medium">Email</span>
								<span className="col-span-2 text-right break-words">{customer.email}</span>
								</div>

								<div className="grid grid-cols-3">
								<span className="font-medium">Phone</span>
								<span className="col-span-2 text-right">{customer.contact_num}</span>
								</div>

								{/* FIXED Address */}
								<div className="grid grid-cols-3 items-start">
								<span className="font-medium">Address</span>
								<span className="col-span-2 text-right break-words">
									{customer.address}
								</span>
								</div>

								<div className="grid grid-cols-3">
								<span className="font-medium">Total Spent</span>
								<span className="col-span-2 text-right">
									₱{customer.total_spent}
								</span>
								</div>

							</div>
						</div>
					</TabsContent>

					{/* Orders Tab */}
					<TabsContent value="orders" className="space-y-4">
						{ordersHistory.length > 0 ? ordersHistory.map((order) => (
							<div key={order.order_id} className="bg-white shadow-sm rounded-xl border p-4 space-y-2 hover:shadow-md transition">
								<div className="flex justify-between items-center">
									<div className="space-y-1">
										<p className="font-semibold text-lg">Order #{order.order_id}</p>
										<p className="text-gray-500 text-sm">{new Date(order.order_date).toLocaleDateString('en-PH', { month: 'short', day: 'numeric', year: 'numeric'})}</p>
									</div>
									<div className="flex items-center gap-4">
										{getStatusBadge(order.status)}
										{order.promo_code !== "None" && (
											<Badge variant="secondary" className="text-sm">
												{order.promo_code}
											</Badge>
										)}
									</div>
								</div>

								<div className="bg-gray-50 rounded-lg p-3 space-y-1">
									<p className="text-gray-600 font-medium text-sm">Items Ordered:</p>
									<ul className="ml-2 space-y-1">
										{order.order_items.map((item, index) => (
											<li key={index} className="text-gray-700 text-sm">
												• {item.name} x{item.quantity}
											</li>
										))}
									</ul>
								</div>
							</div>
							))
						: 
							(
								<div className="flex flex-col items-center justify-center py-12 text-gray-500">
									<ShoppingBag className="w-12 h-12 mb-3 opacity-60" />
									<p className="text-sm font-medium">No orders yet</p>
									<p className="text-xs text-gray-400">This customer hasn't placed any orders.</p>
								</div>
							)
						}
					</TabsContent>
					
				</Tabs>
			</DialogContent>
		</Dialog>
      );
}

/*

					
*/