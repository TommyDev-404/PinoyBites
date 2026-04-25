import { useState } from "react"
import { CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"
import RateExperienceModal from "@/components/user/RateModal"
import { useCheckUserFeedback } from "@/hooks/user/order.hooks"
import { useAuth } from "@/context/auth.context"

export default function OrderSuccess() {
      const { user } = useAuth(); 

      const { data: checkUserFeedbackData } = useCheckUserFeedback(user?.user_id!);
      const isUserGivenFeedback = checkUserFeedbackData?.is_reviewed ?? false; 

      const [openRating, setOpenRating] = useState<boolean>(isUserGivenFeedback ? false : true);
      const navigate = useNavigate();
      
      return (
            <div className="flex flex-col items-center justify-center text-center h-screen">

                  {/* Success Icon */}
                  <CheckCircle className="w-20 h-20 text-green-500 mb-4" />

                  {/* Title */}
                  <h1 className="text-2xl font-bold">
                        Order Placed Successfully! 🎉
                  </h1>

                  <p className="text-muted-foreground mt-2">
                        Thank you for ordering in Pinoy Bites.
                  </p>

                  <div className="flex gap-3 mt-6">
                        <Button onClick={() => navigate("/orders")}>
                              View Orders
                        </Button>

                        <Button variant="outline" onClick={() => navigate("/products")}>
                              Continue Shopping
                        </Button>
                        </div>            

                  <RateExperienceModal
                        open={openRating}
                        onOpenChange={setOpenRating}
                  />

            </div>
      )
}