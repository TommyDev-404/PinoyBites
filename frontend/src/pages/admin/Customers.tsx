
import CustomerTable from "@/components/admin/customers/CustomerTable";
import CustomerStats from "@/components/admin/customers/CustomerStats";
import { useAdminAllCustomers, useAdminCustomerStatistics } from "@/hooks/admin/customers.hooks";
import type { CustomerStatisticsType } from "@/types/admin/customers.types";
import AdminLoading from "@/components/shared/AdminLoading";


export default function Customers() {
      const { data: statisticsData, isLoading: statisticsLoading } = useAdminCustomerStatistics();
      const stats = statisticsData?.statistics ?? {} as CustomerStatisticsType;

      const { data: customersData, isLoading: customerLoading } = useAdminAllCustomers();
      const customers = customersData?.customers ?? [];

      if(customerLoading || statisticsLoading) return <AdminLoading/>;

      return (
            <div className="space-y-6 fade-in">
                  <CustomerStats stats={stats}/>
                  
                  <CustomerTable customers={customers}/>
            </div>
      );
}