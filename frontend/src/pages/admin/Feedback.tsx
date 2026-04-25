import FeedbackStatsCards from "@/components/admin/feedback/FeedbackStatsCard";
import FeedbackTable from "@/components/admin/feedback/FeedbackTable";
import { useAdminFeedbackStatistics } from "@/hooks/admin/feedback.hooks";

export default function FeedbackPage() {
      const { data: feedbackStatistics } = useAdminFeedbackStatistics();
      const statistics = feedbackStatistics?.statistics;

      return (
            <div className="space-y-6 fade-in">
                  <FeedbackStatsCards statistics={statistics!}/>

                  <FeedbackTable/>
            </div>
      );
}