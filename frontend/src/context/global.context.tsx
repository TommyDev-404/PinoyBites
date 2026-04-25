import { createContext, useContext, useEffect, useState } from "react";
import { initSocket } from "@/lib/socket";
import type { ProductType } from "@/types/user/products.types";
import type { AdminAllOrdersInfo } from "@/types/admin/orders.types";
import { useQueryClient } from "@tanstack/react-query";
import { useAuth } from "./auth.context";

type GlobalContextType = {
	products: ProductType[];
	setProducts: React.Dispatch<React.SetStateAction<ProductType[]>>;
	orders: AdminAllOrdersInfo[];
	setOrders: React.Dispatch<React.SetStateAction<AdminAllOrdersInfo[]>>;
	bannedReason?: string;
	setBannedReason: React.Dispatch<React.SetStateAction<string | undefined>>;
};

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

export const GlobalProvider = ({ children }: { children: React.ReactNode }) => {
	const { user } = useAuth();
	const [products, setProducts] = useState<ProductType[]>([]);
	const [orders, setOrders] = useState<AdminAllOrdersInfo[]>([]);
	const [bannedReason, setBannedReason] = useState<string>();
	const queryClient = useQueryClient();

	// TODO: send a notification on each user about their  order status per order that the admin updated
	useEffect(() => {
		if (!user) return;
  		const socket = initSocket(); // get the singleton
		
		if (user.role === 'user'){
			socket.emit("join_user", user.user_id); 
		}else{
			socket.emit("join_admin"); // for orders
		}

		// --- Products ---
		// User listen the event
		socket.on("new_product", () => {
			queryClient.invalidateQueries({ queryKey: ["products"] });
		});

		socket.on("remove_product", () => {
			queryClient.invalidateQueries({ queryKey: ["products"] });
		});
		
		socket.on("update_product", () => {
			queryClient.invalidateQueries({ queryKey: ["products"] });
		});

		// --- Orders ---
		// Admin listen the event
		socket.on("new_order", () => {
			queryClient.invalidateQueries({ queryKey: ["adminOrders"] });
                  queryClient.invalidateQueries({ queryKey: ["adminOrderStatistics"] });
                  queryClient.invalidateQueries({ queryKey: ["adminDashboardStatistics"] });
                  queryClient.invalidateQueries({ queryKey: ["adminRecentOrders"] });
                  queryClient.invalidateQueries({ queryKey: ["adminOrderStatusDistribution"] });
                  queryClient.invalidateQueries({ queryKey: ["adminNotificationsNotReadCount"] });
			
                  queryClient.invalidateQueries({ queryKey: ["adminPromoStatistics"] }); 
                  queryClient.invalidateQueries({ queryKey: ["adminLoyaltyPromos"] })
		});
		
		// Specific user listen the event
		socket.on("order_status_update", (updatedOrder: AdminAllOrdersInfo) => {
                  queryClient.invalidateQueries({ queryKey: ["orders", updatedOrder.user_id] });
                  queryClient.invalidateQueries({ queryKey: ["notifications", updatedOrder.user_id] });
                  queryClient.invalidateQueries({ queryKey: ["viewOrder", updatedOrder.user_id, updatedOrder.order_id] });
		});

		// Admin listen the event, user trigger
		socket.on("cancelled_order", () => {
			queryClient.invalidateQueries({ queryKey: ["adminNotifications"] });
			queryClient.invalidateQueries({ queryKey: ["adminOrders"] });
			queryClient.invalidateQueries({ queryKey: ["adminOrderStatistics"] });
		});

		// --- Notifcations ---
		// admin listen the event
		socket.on("new_notification", () => {
			queryClient.invalidateQueries({ queryKey: ["adminNotifications"] });
		});
		
		// --- User banned ---
		// Specific user listen the event
		socket.on("user_banned", ({ reason, user_id }) => {
			console.log("Banned event received:", reason, user_id);
			if (user.user_id && user.user_id === user_id) {
				setBannedReason(reason);
			}
		});

		// --- User feedback ---
		socket.on("new_feedback", () => {
			queryClient.invalidateQueries({ queryKey: ["adminFeedbacks"] });
			queryClient.invalidateQueries({ queryKey: ["adminFeedbackStatistics"] });
		});

		return () => {
			socket.off("new_product");
			socket.off("new_order");
			socket.off("cancelled_order");
			socket.off("order_status_update");
			socket.off("remove_product");
			socket.off("update_product");
			socket.off("user_banned");
		};
	}, [user]);

	return (
		<GlobalContext.Provider value={{ products, setProducts, orders, setOrders, bannedReason, setBannedReason }}>
			{children}
		</GlobalContext.Provider>
	);
};

// --- Hook to consume ---
export const useGlobalContext = () => {
	const context = useContext(GlobalContext);
	if (!context)
	throw new Error("useGlobalContext must be used within GlobalProvider");
	return context;
};