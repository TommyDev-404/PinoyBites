import { useEffect, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, ShoppingCartIcon, ShoppingBagIcon, Phone, Home, Package, UserPlus, Bell } from "lucide-react";
import { useIsMobile } from "@/hooks/useIsMobile";
import { useAuth } from "@/context/auth.context";
import Logo from "@/components/user/Logo";
import UserMenu from "./UserMenu";
import { useCarts } from "@/hooks/user/cart.hooks";
import { useOrders } from "@/hooks/user/order.hooks";
import { useNotifications } from "@/hooks/user/notifications.hooks";


export default function Header() {
	const isMobile = useIsMobile();
	const { user } = useAuth();
	const navigate = useNavigate();

	const { data: cartData } = useCarts(user?.user_id!);
	const cartCount = cartData?.cart_items.length ?? 0;

	const { data: orderData } = useOrders(user?.user_id!, 'All');
	const orderCount = orderData?.orders.filter((order) => !["Cancelled", "Delivered"].includes(order.status)).length ?? 0;
	
	const { data: notifData } = useNotifications(user?.user_id!);
	const notifCount = notifData?.notifications.filter((notif) => !notif.is_read).length ?? 0;
	
	const location = useLocation();
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
	const [isHeroVisible, setIsHeroVisible] = useState(true);

	// make the header change bg dynamic
	useEffect(() => {
		const heroSection = document.getElementById("featured"); // get the id of the section you want to observe

		if (!heroSection) {
			setIsHeroVisible(false); // set false to make the header bg white when navigating in another page
			return;
		}

		const observer = new IntersectionObserver(
			([entry]) => {
				setIsHeroVisible(entry.isIntersecting);  // return true if the target section starts appearing in the view port
			},
			{ threshold: 1.0 } // 10% of the prev section is visible or only 10% of the hero section is visible, trigger change bg on the header
		);

		observer.observe(heroSection); // start observing

		return () => observer.disconnect(); // cleanup function for removing the observer when component unmount to prevent memory leak and performance bugs
	}, [location.pathname]);

	return (
		<header
			className={`fixed top-0 z-50 w-full transition-all duration-300 
				${ isHeroVisible
				? "bg-transparent"
				: "bg-white shadow-md"
			}`
			}
		>
			<nav className="max-w-[90%] mx-auto px-4 md:px-6">
				<div className="flex items-center justify-between h-14 md:h-16">
					{/* Logo */}
					<Logo isHeroVisble={isHeroVisible} size={isMobile ? "sm" : "md"} />

					{/* Desktop Navigation */}
					<div className="hidden md:flex items-center gap-12 font-semibold">
						{/* NOT LOGGED IN NAV */}
						{!user && (
							<>
								{/* Home */}
								<NavLink
									to="/home"
									className={({ isActive }) =>`group relative transition-all duration-300 ${
										isActive ? "text-amber-500" : "text-gray-700 hover:text-amber-500"
									}`
								}
								>
									<div className="transition-transform duration-300 group-hover:-translate-y-1 flex items-center gap-1">
										<Home className="w-4" />
									<span className="text-sm">Home</span>
									</div>

									<span className="absolute left-1/2 bottom-0 h-0.5 w-0 -translate-x-1/2 bg-amber-500 transition-all duration-300 group-hover:w-full"></span>
								</NavLink> 

								{/* Products */}
								<NavLink
									to="/products"
									className={({ isActive }) => `group relative transition-all duration-300 ${
										isActive  ? "text-amber-500" 
										: isHeroVisible ? "text-white hover:text-amber-500"
										: 'text-gray-800 hover:text-amber-500'
									}`
								}
								>
									<div className="transition-transform duration-300 group-hover:-translate-y-1 flex items-center gap-1">
										<ShoppingBagIcon className="w-4" />
									<span className="text-sm">Products</span>
									</div>

									<span className="absolute left-1/2 bottom-0 h-0.5 w-0 -translate-x-1/2 bg-amber-500 transition-all duration-300 group-hover:w-full"></span>
								</NavLink>

								{/* Contact */}
								<NavLink
									to="/contact"
									className={({ isActive }) =>`group relative transition-all duration-300 ${
										isActive  ? "text-amber-500" 
										: isHeroVisible ? "text-white hover:text-amber-500"
										: 'text-gray-800 hover:text-amber-500'
									}`
								}
								>
									<div className="transition-transform duration-300 group-hover:-translate-y-1 flex items-center gap-1">
										<Phone className="w-4" />
									<span className="text-sm">Contact</span>
									</div>

									<span className="absolute left-1/2 bottom-0 h-0.5 w-0 -translate-x-1/2 bg-amber-500 transition-all duration-300 group-hover:w-full"></span>
								</NavLink>
							</>
						)}

						{/* LOGGED IN NAV */}
						{user && (
							<>
								{/* Products */}
								<NavLink
									to="/products"
									className={({ isActive }) =>`group relative transition-all duration-300 ${
										isActive  ? "text-amber-500" 
										: isHeroVisible ? "text-white hover:text-amber-500"
										: 'text-gray-800 hover:text-amber-500'
									}`
								}
								>
									<div className="transition-transform duration-300 group-hover:-translate-y-1 flex items-center gap-1">
										<ShoppingBagIcon className="w-4" />
									<span className="text-sm">Products</span>
									</div>

									<span className="absolute left-1/2 bottom-0 h-0.5 w-0 -translate-x-1/2 bg-amber-500 transition-all duration-300 group-hover:w-full"></span>
								</NavLink>

								{/* Cart */}
								<NavLink
									to="/cart"
									className={({ isActive }) =>`group relative text-sm transition-all duration-300 ${
										isActive  ? "text-amber-500" 
										: isHeroVisible ? "text-white hover:text-amber-500"
										: 'text-gray-800 hover:text-amber-500'
										}`
									}
								>
									<div className="transition-transform duration-300 group-hover:-translate-y-1 flex items-center gap-1">
										<ShoppingCartIcon className="w-4" />
									<span>Cart</span>
									</div>

									{cartCount !== 0 && (
										<span className="absolute -top-2 -right-3 bg-red-500 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full">
											{cartCount}
										</span>
									)}

									<span className="absolute left-1/2 bottom-0 h-0.5 w-0 -translate-x-1/2 bg-amber-500 transition-all duration-300 group-hover:w-full"></span>
								</NavLink>

								{/* Orders */}
								<NavLink
									to="/orders"
									className={({ isActive }) =>`group relative transition-all duration-300 ${
										
										isActive  ? "text-amber-500" 
										: isHeroVisible ? "text-white hover:text-amber-500"
										: 'text-gray-800 hover:text-amber-500'
										}`
									}
								>
									<div className="transition-transform duration-300 group-hover:-translate-y-1 flex items-center gap-1">
										<Package className="w-4" />
									<span className="text-sm">Orders</span>
									</div>
									
									{orderCount !== 0 && (
										<span className="absolute -top-2 -right-3 bg-red-500 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full">
											{orderCount}
										</span>
									)}

									<span className="absolute left-1/2 bottom-0 h-0.5 w-0 -translate-x-1/2 bg-amber-500 transition-all duration-300 group-hover:w-full"></span>
								</NavLink>

								{/* Notification */}
								<NavLink
									to="/notifications"
									className={({ isActive }) =>`group relative text-sm transition-all duration-300 ${
										isActive  ? "text-amber-500" 
										: isHeroVisible ? "text-white hover:text-amber-500"
										: 'text-gray-800 hover:text-amber-500'
										}`
									}
								>
									<div className="transition-transform duration-300 group-hover:-translate-y-1 flex items-center gap-1">
										<Bell className="w-4" />
									<span>Notifications</span>
									</div>
									
									{notifCount !== 0 && (
										<span className="absolute -top-2 -right-3 bg-red-500 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full">
											{notifCount}
										</span>
									)}

									<span className="absolute left-1/2 bottom-0 h-0.5 w-0 -translate-x-1/2 bg-amber-500 transition-all duration-300 group-hover:w-full"></span>
								</NavLink>

							</>
						)}
					</div>

					{/* Desktop Actions */}
					<div className="hidden md:flex items-center gap-3">

						{user ? (
							<UserMenu />
						) : (
							<div className="flex items-center gap-3">
								{/* Login */}
								<button
									onClick={() => navigate("/auth/login")}
									className={`flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-amber-700 ${!isHeroVisible ? 'bg-stone-800 hover:bg-stone-900 text-white' : 'bg-white hover:bg-stone-200 text-stone-900'} rounded-lg transition-all duration-200 hover:shadow-sm`}
								>
									Login
								</button>

								{/* Create Account */}
								<button
									onClick={() => navigate("/auth/create-account")}
									className="flex items-center gap-2 px-6 py-2.5 text-sm font-semibold text-white bg-amber-500 hover:bg-amber-600 rounded-lg shadow-sm hover:shadow-md transition-all duration-200"
								>
									<UserPlus size={18} />
									Create Account
								</button>
							</div>
						)}
					</div>

					{/* Mobile Menu Button */}
					<button
						onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
						className="md:hidden p-2"
					>
						{mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
					</button>
				</div>

			</nav>
		</header>
	);
}