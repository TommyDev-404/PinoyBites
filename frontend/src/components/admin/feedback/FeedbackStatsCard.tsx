import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import type { FeedBackStatisticsType } from "@/types/user/feedback.types";
import {
      MessageSquare,
      Star,
      ThumbsUp,
      ThumbsDown,
      Users,
} from "lucide-react";

type FeedbackStatsProps = {
      statistics: FeedBackStatisticsType;
};

export default function FeedbackStatsCards({ statistics }: FeedbackStatsProps) {
      const items = [
            {
                  title: "Total Feedback",
                  value: statistics?.total_feedback,
                  desc: "All submitted feedback",
                  icon: MessageSquare,
                  iconColor: "text-blue-600",
            },
            {
                  title: "Average Rating",
                  value: `${Number(statistics?.avg_rating || 0).toFixed(1)} ⭐`,
                  desc: "Overall user satisfaction",
                  icon: Star,
                  iconColor: "text-yellow-500",
            },
            {
                  title: "Good Feedback",
                  value: statistics?.good_feedback,
                  desc: "Ratings 4 stars and above",
                  icon: ThumbsUp,
                  iconColor: "text-green-600",
            },
            {
                  title: "Bad Feedback",
                  value: statistics?.bad_feedback ?? 0,
                  desc: "Ratings 2 stars and below",
                  icon: ThumbsDown,
                  iconColor: "text-red-500",
            },
            {
                  title: "Users Rated",
                  value: statistics?.user_rated_count ?? 0,
                  desc: "Customers who submitted feedback",
                  icon: Users,
                  iconColor: "text-purple-600",
            },
      ];

      return (
            <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-6 w-full">
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