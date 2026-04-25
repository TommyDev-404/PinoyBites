
import {
      Dialog,
      DialogContent,
      DialogHeader,
      DialogTitle,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAdminReplyFeedback } from "@/hooks/admin/feedback.hooks";
import { useForm } from "react-hook-form";

type Props = {
      feedbackId: number;
      open: boolean;
      onClose: () => void;
};

export default function ReplyFeedbackModal({ feedbackId, open, onClose }: Props) {
      const { mutate: replyFeedback } = useAdminReplyFeedback(onClose);

      const { register, handleSubmit, reset } = useForm({
            defaultValues: {
                  reply: ''
            }
      });
      
      const onSubmit = (data: { reply: string }) => {
            replyFeedback({
                  review_id: feedbackId,
                  reply: data.reply,
            });

            reset();
            onClose();
      };

      return (
            <Dialog open={open} onOpenChange={onClose}>
                  <DialogContent>
                        <DialogHeader>
                              <DialogTitle>Reply to Feedback</DialogTitle>
                        </DialogHeader>

                        <div className="space-y-3">
                              <Input
                                    placeholder="Write your reply..."
                                    {...register('reply', { required: true })}
                              />

                              <div className="flex gap-2 justify-end">
                                    <Button variant="secondary" onClick={onClose}>
                                          Cancel
                                    </Button>

                                    <Button onClick={handleSubmit(onSubmit)}>
                                          Send Reply
                                    </Button>
                              </div>
                        </div>
                  </DialogContent>
            </Dialog>
      );
}