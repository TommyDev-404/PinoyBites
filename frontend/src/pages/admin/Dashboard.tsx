import OrderStatusDistribution from '@/components/admin/dashboard/OrderStatusDistribution';
import { PromoDistributionCard } from '@/components/admin/dashboard/PromoDistribution';
import RecentOrders from '@/components/admin/dashboard/RecentOrders';
import StatsGrid from '@/components/admin/dashboard/StatsGrid';
import TopCustomers from '@/components/admin/dashboard/TopCustomers';
import TopSellingProducts from '@/components/admin/dashboard/TopSellingProducts';
import AdminLoading from '@/components/shared/AdminLoading';
import { 
      useAdminDashboardStatistics, 
      useAdminOrderStatusDistribution, 
      useAdminRecentOrders, 
      useAdminTopCustomers, 
      useAdminTopSellingProducts 
} from '@/hooks/admin/dashboard.hooks';
import type { DashboardStatistics } from '@/types/admin/dashboard.types';

export default function Dashboard(){
      const { data: statisticsData, isLoading: statisticsDataLoading } = useAdminDashboardStatistics();
      const statistics = statisticsData?.statistics ?? {} as DashboardStatistics;

      const { data: recentOrdersData, isLoading: recentOrdersDataLoading } = useAdminRecentOrders();
      const recentOrders = recentOrdersData?.recent_orders ?? []
      
      const { data: orderStatusDistributionData, isLoading: orderStatusDistributionDataLoading } = useAdminOrderStatusDistribution();
      const orderStatusDistribution = orderStatusDistributionData?.status ?? [];
      
      const { data: topSellingProductsData, isLoading: topSellingProductsDataLoading } = useAdminTopSellingProducts();
      const topSellingProducts = topSellingProductsData?.products ?? [];
      
      const { data: topCustomersData, isLoading: topCustomersDataLoading } = useAdminTopCustomers();
      const topCustomers = topCustomersData?.customers ?? [];
      
      const isLoading =
            statisticsDataLoading ||
            recentOrdersDataLoading ||
            orderStatusDistributionDataLoading ||
            topSellingProductsDataLoading ||
            topCustomersDataLoading;

      if (isLoading) return <AdminLoading/>
      
      return (
            <div className="space-y-6 fade-in">
                  {/* Stats Grid */}
                  <StatsGrid 
                        totalOrders={statistics.total_orders}
                        todayOrders={statistics.today_orders}
                        pendingOrders={statistics.pending_order}
                        totalRevenue={statistics.total_revenue}
                        totalProducts={statistics.total_products}
                  />
                  

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Recent Activity */}
                        <RecentOrders
                              orders={recentOrders}
                        />
                        
                        {/* Top Customers */}
                        <TopCustomers 
                              customers={topCustomers}
                        />
                  </div>
            
                  {/* Top Performers */}
                  <TopSellingProducts products={topSellingProducts}/>

                  <div className='grid grid-cols-2 gap-6'>

                        <OrderStatusDistribution 
                              order_distribution={orderStatusDistribution}
                        />

                  </div>

            </div>
      );    
}
