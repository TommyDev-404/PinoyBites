import OrdersTable from "@/components/admin/orders/OrdersTable";
import OrderStats from "@/components/admin/orders/OrderStats";
import AdminLoading from "@/components/shared/AdminLoading";
import { useAdminOrdersStatistics } from "@/hooks/admin/orders.hooks";

export default function Orders(){
	const { data: orderStatisticsData, isLoading: orderStatsLoading } = useAdminOrdersStatistics();
	const orderStatistics = orderStatisticsData?.order_stats;

      const isLoading = orderStatsLoading

      if (isLoading) return <AdminLoading/>;

      return (
            <div className="flex flex-col gap-8 fade-in">
                  {/* Order Summary */}
                  <OrderStats orderStatistics={orderStatistics!}/>
                  
                  {/* Order Table Info */}
                  <OrdersTable />
            </div>
      );
}