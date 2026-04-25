import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import type { CustomerStatisticsType } from "@/types/admin/customers.types";
import { Users, UserCheck, XCircle } from "lucide-react";

type CustomerStatsProps = {
      stats: CustomerStatisticsType;
};

export default function CustomerStats({ stats }: CustomerStatsProps) {
      const items = [
            {
                  title: "Total Customers",
                  value: stats.total,
                  desc: "All registered customers",
                  icon: Users,
                  iconColor: "text-blue-600",
            },
            {
                  title: "Active Customers",
                  value: stats.active,
                  desc: "Currently active accounts",
                  icon: UserCheck,
                  iconColor: "text-green-600",
            },
            {
                  title: "Banned Customers",
                  value: stats.banned,
                  desc: "Accounts currently banned",
                  icon: XCircle,
                  iconColor: "text-red-500",
            },
      ];

      return (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full">
                  {items.map((item) => {
                        const Icon = item.icon;

                        return (
                              <Card key={item.title}>
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
                                          <p className="text-xs text-gray-500 mt-1">{item.desc}</p>
                                    </CardContent>
                              </Card>
                        );
                  })}
            </div>
      );
}