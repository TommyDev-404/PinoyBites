
import PromoStats from "@/components/admin/promo/PromoStats";
import LoyaltyTier from "@/components/admin/promo/LoyaltyTier";
import { useAdminAllIssuedPromo, useAdminAllLoyaltyTiers, useAdminPromoStatistics } from "@/hooks/admin/promo.hooks";
import LoyaltyPromos from "@/components/admin/promo/LoyaltyPromos";
import AdminLoading from "@/components/shared/AdminLoading";

export default function PromoManagement() {
      const { data: promoStatistics, isLoading: promoStatisticsLoading } = useAdminPromoStatistics();
      const { data: loyaltyTiersData, isLoading: loyaltyTiersDataLoading } = useAdminAllLoyaltyTiers();
      const { data: promoCodesData, isLoading: promoCodesDataLoading } = useAdminAllIssuedPromo();

      if (promoStatisticsLoading || loyaltyTiersDataLoading || promoCodesDataLoading) return <AdminLoading/>;

      return (
            <div className="space-y-6 fade-in">
                  {/* Summary Cards */}
                  <PromoStats statistics={promoStatistics?.statistics!}/>

                  {/* Loyalty Tier */}
                  <LoyaltyTier loyalty_tiers={loyaltyTiersData?.loyalty_tiers ?? []}/>

                  {/* Promo Code */}
                  <LoyaltyPromos promo_codes={promoCodesData?.promo_codes ?? []}/>
            </div>
      );
}