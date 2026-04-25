import { Card, CardContent } from "@/components/ui/card";
import type { PromoStatisticsInfo } from "@/types/admin/promo.types";
import { Ticket, Users } from "lucide-react";

type PromoStatisticsProps = {
      statistics: PromoStatisticsInfo;
};

export default function PromoStats({ statistics } : PromoStatisticsProps){
      return (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card>
                        <CardContent className="p-4 flex items-center justify-between">
                              <div>
                              <p className="text-sm text-gray-500">Total Promos Issued</p>
                              <p className="text-2xl font-bold">{statistics?.active_promo}</p>
                              </div>
                              <Ticket className="text-amber-600" />
                        </CardContent>
                  </Card>

                  <Card>
                        <CardContent className="p-4 flex items-center justify-between">
                              <div>
                              <p className="text-sm text-gray-500">Total Active Promos</p>
                              <p className="text-2xl font-bold">{statistics?.promo_issued}</p>
                              </div>
                              <Users className="text-blue-600" />
                        </CardContent>
                  </Card>

                  <Card>
                        <CardContent className="p-4 flex items-center justify-between">
                              <div>
                              <p className="text-sm text-gray-500">Loyalty Tiers</p>
                              <p className="text-2xl font-bold">{statistics?.loyalty_tiers}</p>
                              </div>
                              <Ticket className="text-green-600" />
                        </CardContent>
                  </Card>
            </div>
      );
}