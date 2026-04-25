import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import type { OrderStatisticsType } from "@/types/admin/orders.types";
import { ShoppingBag, Clock, Truck, XCircle, PackageCheck } from "lucide-react";

type OrderStatsProps = {
	orderStatistics: OrderStatisticsType;
};


export default function OrderStats({ orderStatistics }: OrderStatsProps) {
	const stats = [
		{
			title: "Total Orders",
			value: orderStatistics?.total,
			sub: `+${orderStatistics?.today} today`,
			icon: ShoppingBag,
			iconColor: "text-amber-600",
		},
		{
			title: "Pending Orders",
			value: orderStatistics?.pending,
			sub: "Waiting confirmation",
			icon: Clock,
			iconColor: "text-orange-500",
		},
		{
			title: "Processing Orders",
			value: orderStatistics?.processing,
			sub: "Being prepared",
			icon: Clock,
			iconColor: "text-blue-500",
		},
		{
			title: "In-Transit Orders",
			value: orderStatistics?.in_transit,
			sub: "Out for delivery",
			icon: Truck,
			iconColor: "text-teal-500",
		},
		{
			title: "Delivered Orders",
			value: orderStatistics?.delivered,
			sub: "Order delivered",
			icon: PackageCheck,
			iconColor: "text-green-500",
		},
		{
			title: "Cancelled Orders",
			value: orderStatistics?.cancelled,
			sub: "Order cancelled",
			icon: XCircle,
			iconColor: "text-red-500",
		},
	];

	return (
	<div className="grid grid-cols-6 gap-6">
		{stats.map((item, i) => {
			const Icon = item.icon;

			return (
				<Card className="hover:shadow-xl transition-shadow duration-300">
					<CardHeader className="flex items-center justify-between pb-2">
						<CardTitle className="text-sm font-medium text-gray-600">
							{item.title}
						</CardTitle>
						<Icon className={item.iconColor} size={20} />
					</CardHeader>

					<CardContent>
						<div className="text-2xl font-bold text-gray-900">
							{item.value}
						</div>
						<p className="text-xs text-gray-500 mt-1">{item.sub}</p>
					</CardContent>
				</Card>
			);
		})}
	</div>
	);
}