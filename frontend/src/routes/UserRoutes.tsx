import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import ProtectedRoute from "@/routes/ProtectedRoute";
import GuestRoute from "@/routes/GuestRoute";

// Guest Pages
const Home = lazy(() => import('@/pages/user/Home'));
const Products = lazy(() => import('@/pages/user/Products'));
const Contact = lazy(() => import('@/pages/user/Contact'));
import Login from "@/pages/user/Login";
import RegisterPage from "@/pages/user/Register";
import ForgotPasswordPage from "@/pages/user/ForgotPassword";
import ResetPassword from "@/pages/user/ResetPassword";

// Protected Pages
const Cart = lazy(() => import('@/pages/user/Cart'));
const Orders = lazy(() => import('@/pages/user/Orders'));
const OrderSuccess = lazy(() => import('@/pages/user/OrderSuccess'));
const AccountSettings = lazy(() => import('@/pages/user/Account'));
import NotificationsPage from "@/pages/user/Notifications";
import NotFoundPage from "@/pages/NotFound";
import Loading from "@/components/shared/Loading";
import AppLayout from "@/layout/AppLayout";

export default function UserRoutes() {
      return (
            <Suspense fallback={<Loading/>}>
                  <Routes>

                        {/* AUTH ONLY (guest only) */}
                        <Route element={<GuestRoute/>}>
                              <Route path="/auth">
                                    <Route path="login" element={<Login />} />
                                    <Route path="create-account" element={<RegisterPage />} />
                                    <Route path="forgot-password" element={<ForgotPasswordPage />} />
                                    <Route path="reset-password" element={<ResetPassword />} />
                              </Route>
                              
                              {/* PUBLIC / GUEST */}
                              <Route element={<AppLayout />}>
                                    {/* Guest and user can access products */}
                                    <Route path="home" element={<Home />} />
                                    <Route path="contact" element={<Contact />} />
                              </Route>
                        </Route>

                        <Route element={<AppLayout/>}>
                              <Route path="products" element={<Products />} />
                        </Route>
                        
                        {/* Protected pages */}
                        <Route element={<ProtectedRoute role="user"/>}>
                              <Route element={<AppLayout/>}>
                                    <Route path="cart" element={<Cart />} />
                                    <Route path="orders" element={<Orders />} />
                                    <Route path="order-success" element={<OrderSuccess />} />
                                    <Route path="account" element={<AccountSettings />} />
                                    <Route path="notifications" element={<NotificationsPage />} />
                              </Route>
                        </Route>
                        
                         {/* NOT FOUND PAGE */}
                        <Route path="*" element={<NotFoundPage />} />
                  </Routes>
            </Suspense>
      );
}