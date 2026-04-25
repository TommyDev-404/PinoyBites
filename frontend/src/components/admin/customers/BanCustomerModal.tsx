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
import {
      Select,
      SelectTrigger,
      SelectContent,
      SelectItem,
      SelectValue,
} from "@/components/ui/select";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { useForm, Controller } from "react-hook-form";
import type { BanUserData } from "@/types/admin/customers.types";
import { useAdminBanCustomer } from "@/hooks/admin/customers.hooks";

type Props = {
      customerId: number;
      open: boolean;
      onClose: () => void;
};

type FormData = {
      reason: string,
      duration: string,
      customDuration: string
}

export default function BanCustomerModal({ open, onClose, customerId }: Props) {
      const { control, handleSubmit, watch } = useForm<FormData>({
            defaultValues: {
                  reason: "",
                  duration: "7",
                  customDuration: ""
            },
      });

      const duration = watch("duration"); // watch duration to show/hide custom input

      const { mutate: banCustomer, isPending } = useAdminBanCustomer(onClose);

      const onSubmit = (data: FormData) => {
            const days = data.duration === "custom" ? Number(data.customDuration) : Number(data.duration);
            
            const payload: BanUserData = {
                  reason: data.reason || 'No reason provided.',
                  duration: days,
            };

            banCustomer({ user_id: customerId, data: payload });
      };

      return (
            <Dialog open={open} onOpenChange={onClose}>
                  <DialogContent className="sm:max-w-md space-y-4">
                        <DialogHeader>
                              <DialogTitle>Ban Customer</DialogTitle>
                              <DialogDescription>
                                    Temporarily restrict this customer from accessing their account.
                              </DialogDescription>
                        </DialogHeader>

                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                              {/* Duration */}
                              <div className="space-y-2">
                                    <Label>Ban Duration</Label>
                                    <Controller
                                          name="duration"
                                          control={control}
                                          render={({ field }) => (
                                                <Select 
                                                      value={field.value?.toString() || ""} // make sure value is string
                                                      onValueChange={(val) => {
                                                            field.onChange(val === "custom" ? "custom" : Number(val));
                                                      }}
                                                >
                                                      <SelectTrigger>
                                                            <SelectValue placeholder="Select duration" />
                                                      </SelectTrigger>
                                                      <SelectContent>
                                                            <SelectItem value="1">1 day</SelectItem>
                                                            <SelectItem value="3">3 days</SelectItem>
                                                            <SelectItem value="7">7 days</SelectItem>
                                                            <SelectItem value="30">30 days</SelectItem>
                                                            <SelectItem value="custom">Custom</SelectItem>
                                                      </SelectContent>
                                                </Select>
                                          )}
                                    />
                              </div>

                              {/* Custom duration, 999 means custom duration */}
                              {duration === "custom" && (
                                    <div className="space-y-2">
                                          <Label>Custom Duration (days)</Label>
                                          <Controller
                                                name="customDuration"
                                                control={control}
                                                render={({ field }) => (
                                                      <Input
                                                            type="number"
                                                            min={1}
                                                            placeholder="Enter number of days"
                                                            {...field}
                                                      />
                                                )}
                                          />
                                    </div>
                              )}

                              {/* Reason */}
                              <div className="space-y-2">
                                    <Label>Reason for Ban</Label>
                                    <Controller
                                          name="reason"
                                          control={control}
                                          rules={{ required: true }}
                                          render={({ field }) => (
                                                <Textarea
                                                      placeholder="Explain why this customer is being banned..."
                                                      {...field}
                                                />
                                          )}
                                    />
                              </div>

                              <DialogFooter>
                                    <Button variant="outline" onClick={onClose}>
                                    Cancel
                                    </Button>
                                    <Button type="submit" variant="destructive" disabled={!watch("reason") || isPending}>
                                          {isPending ? 'Processing...' : 'Confirm Ban'}
                                    </Button>
                              </DialogFooter>
                        </form>
                  </DialogContent>
            </Dialog>
      );
}