import { Routes, Route, Navigate } from "react-router-dom"
import { lazy, Suspense } from "react"
import Loading from "@/components/shared/Loading"
import AdminLayout from "@/layout/AdminLayout"
import Products from "@/pages/admin/Products"
import Customers from "@/pages/admin/Customers"
import NotFoundPage from "@/pages/NotFound"
import PromoManagement from "@/pages/admin/Promo"
import ProtectedRoute from "./ProtectedRoute"
import FeedbackPage from "@/pages/admin/Feedback"

const AdminLogin = lazy(() => import("@/pages/admin/AdminLogin"))
const Dashboard = lazy(() => import("@/pages/admin/Dashboard"))
const Orders = lazy(() => import("@/pages/admin/Orders"))

export default function AdminRoutes() {
      return (
            <Suspense fallback={<Loading/>}>
                  <Routes>
                  
                        {/* redirect /admin -> /admin/login */}
                        <Route index element={<Navigate to="login" replace />} />
                        <Route path="login" element={<AdminLogin />} />

                        <Route path="/" element={<ProtectedRoute role="admin"/>}>
                              <Route element={<AdminLayout />}>
                                    <Route path="dashboard" element={<Dashboard />} />
                                    <Route path="orders" element={<Orders />} />
                                    <Route path="products" element={<Products />} />
                                    <Route path="customers" element={<Customers />} />
                                    <Route path="feedback" element={<FeedbackPage />} />
                                    <Route path="promo" element={<PromoManagement />} />
                              </Route>
                        </Route>
                        
                        {/* NOT FOUND PAGE */}
                        <Route path="*" element={<NotFoundPage />} />
                        
                  </Routes>
            </Suspense> 
      )
}