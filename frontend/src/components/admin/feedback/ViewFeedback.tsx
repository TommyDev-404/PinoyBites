import {
      Dialog,
      DialogContent,
      DialogHeader,
      DialogTitle,
} from "@/components/ui/dialog";
import type { AllFeedbackType } from "@/types/user/feedback.types";
import {
      User,
      Calendar,
      Star,
      CheckCircle,
      XCircle,
      MinusCircle,
} from "lucide-react";

type Props = {
      feedback: AllFeedbackType;
      open: boolean;
      onClose: () => void;
};

export default function FeedbackDetailsModal({ feedback, open, onClose }: Props) {
      const statusConfig = {
            Good: {
                  style: "bg-green-100 text-green-700",
                  icon: CheckCircle,
            },
            Bad: {
                  style: "bg-red-100 text-red-700",
                  icon: XCircle,
            },
            Neutral: {
                  style: "bg-gray-100 text-gray-600",
                  icon: MinusCircle,
            },
      };
      
      const status = feedback.status || "Neutral";
      const StatusIcon = statusConfig[feedback.status].icon;
      
      return (
            <Dialog open={open} onOpenChange={onClose}>
                  <DialogHeader className="sr-only">
                        <DialogTitle>Feedback Details</DialogTitle>
                  </DialogHeader>

                  <DialogContent className="max-w-md rounded-2xl p-0 overflow-hidden">
                        
                        {/* PROFILE HEADER */}
                        <div className="bg-gradient-to-r from-indigo-500 to-purple-500 p-6 text-white text-center">
                              <div className="w-16 h-16 mx-auto rounded-full bg-white/20 flex items-center justify-center mb-3">
                                    <User size={28} />
                              </div>
                        
                              <h2 className="text-lg font-semibold">{feedback.username}</h2>
                              <p className="text-xs opacity-90 flex items-center justify-center gap-1 mt-1">
                                    <Calendar size={12} />
                                    {new Date(feedback.created_at).toLocaleDateString("en-PH", {
                                          month: "long",
                                          day: "2-digit",
                                          year: "numeric",
                                    })}
                              </p>
                        </div>
                  
                        {/* BODY */}
                        <div className="p-6 space-y-5">
                              
                              {/* STATUS + RATING */}
                              <div className="flex justify-between items-center">
                                    {/* STATUS */}
                                    <span
                                          className={`px-3 py-1 text-sm font-medium rounded-full flex items-center gap-1 ${statusConfig[status].style}`}
                                    >
                                          <StatusIcon size={16} />
                                          {status}
                                    </span>
                              
                                    {/* RATING */}
                                    <div className="flex items-center gap-1">
                                          <Star className="text-yellow-500 fill-yellow-400" size={18} />
                                          <span className="text-lg font-bold text-gray-900">
                                                {feedback.rating}
                                          </span>
                                          <span className="text-sm text-gray-500">/ 5</span>
                                    </div>
                              </div>
                        
                              {/* DIVIDER */}
                              <div className="border-t" />
                        
                              {/* COMMENT */}
                              <div>
                                    <p className="text-xs text-gray-500 mb-2">Feedback</p>
                                    <p className="text-sm text-gray-800 leading-relaxed bg-gray-50 p-4 rounded-xl border">
                                          {feedback.comment}
                                    </p>
                              </div>
                        </div>
                  </DialogContent>
            </Dialog>
      );
}