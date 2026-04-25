import {
      Dialog,
      DialogContent,
      DialogHeader,
      DialogTitle,
      DialogDescription,
      DialogFooter,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

import { useForm, Controller } from "react-hook-form";
import { useAdminUnBanCustomer } from "@/hooks/admin/customers.hooks";

type Props = {
      customerId: number;
      open: boolean;
      onClose: () => void;
};

type FormData = {
      reason?: string;
};

export default function UnbanCustomerModal({ open, onClose, customerId }: Props) {
      const { control, handleSubmit } = useForm<FormData>({
            defaultValues: {
                  reason: "",
            },
      });

      const { mutate: unbanCustomer, isPending } = useAdminUnBanCustomer(onClose);

      const onSubmit = (data: FormData) => {
            const payload = {
                  user_id: customerId,
                  reason: data.reason || "No reason provided",
            };
      
            unbanCustomer(payload);
      };

      return (
            <Dialog open={open} onOpenChange={onClose}>
                  <DialogContent className="sm:max-w-md space-y-4">
                        <DialogHeader>
                              <DialogTitle>Unban Customer</DialogTitle>
                              <DialogDescription>
                                    This will restore the customer's access to their account.
                              </DialogDescription>
                        </DialogHeader>
            
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                              <div className="space-y-2">
                                    <Label>Optional Note</Label>
                                    <Controller
                                          name="reason"
                                          control={control}
                                          render={({ field }) => (
                                          <Textarea
                                          placeholder="Reason for lifting the ban..."
                                          {...field}
                                          />
                                          )}
                                    />
                              </div>
                  
                              <DialogFooter>
                                    <Button variant="outline" onClick={onClose}>
                                          Cancel
                                    </Button>
                        
                                    <Button
                                          type="submit"
                                          className="bg-green-600 hover:bg-green-700"
                                          disabled={isPending}
                                    >
                                          {isPending ? "Processing..." : "Confirm Unban"}
                                    </Button>
                              </DialogFooter>
                        </form>
                  </DialogContent>
            </Dialog>
      );
}