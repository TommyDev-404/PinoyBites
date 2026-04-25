
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useAdminAddLoyaltyTier, useAdminUpdateLoyaltyTier } from "@/hooks/admin/promo.hooks";
import type { LoyaltyTierInfo, UpdateLoyaltyTierInfo } from "@/types/admin/promo.types";
import { useForm, type DefaultValues } from "react-hook-form";

type Props = {
      payload?: LoyaltyTierInfo;
      modalType:  'add' | 'update';
      open: boolean;
      onClose: () => void;
};

export default function TierModal({ open, onClose, modalType, payload } : Props ){
      const { register, handleSubmit, formState: { dirtyFields } } = useForm<LoyaltyTierInfo>({
            defaultValues: {
                  id: modalType === 'update' ? payload?.id : undefined,
                  tier_name: modalType === 'update' ? payload?.tier_name : '',
                  discount:  modalType === 'update' ? payload?.discount : undefined,
                  required_spent:  modalType === 'update' ? payload?.required_spent : undefined,
                  valid_days:  modalType === 'update' ? payload?.valid_days : undefined
            }
      });

      const { mutate: addLoyaltyTier, isPending: addLoyaltyTierPending } = useAdminAddLoyaltyTier(onClose);
      const { mutate: updateLoyaltyTier, isPending: updateLoyaltyTierPending } = useAdminUpdateLoyaltyTier(onClose);

      const onSubmit = (data: LoyaltyTierInfo) => {
            if (modalType === 'update') {
                  const updatedData: Partial<LoyaltyTierInfo> = {};
                  
                  Object.keys(dirtyFields).forEach((key) => {
                        const k = key as keyof LoyaltyTierInfo; // TS type assertion
                        updatedData[k] = data[k] as any;
                  });
                  console.log('Updated: ', updatedData);
                  
                  updateLoyaltyTier({ id: data.id!, updated_data: updatedData });
            } else {
                  addLoyaltyTier(data);
            }
      };

      return (
            <Dialog open={open} onOpenChange={onClose}>
                  <DialogContent>
                        <DialogHeader>
                              <DialogTitle>
                                    {modalType === 'add' ? 'Add Loyalty Tier' : 'Update Loyalty Tier'}
                              </DialogTitle>

                              <DialogDescription>
                                    {modalType === 'add'
                                          ? 'Create a new loyalty tier and define its benefits for your customers.'
                                          : 'Update the details of this loyalty tier to adjust its benefits or criteria.'}
                              </DialogDescription>
                        </DialogHeader>
            
                        <form onSubmit={handleSubmit(onSubmit)}>
                              <div className="space-y-3">
                                    <Input placeholder="Tier Name" {...register('tier_name')}/>
                                    <Input placeholder="Required Spent" type="number" {...register('required_spent')}/>
                                    <Input placeholder="Discount %" type="number"{...register('discount')} />
                                    <Input placeholder="Valid Days" type="number" {...register('valid_days')}/>
                                    <Button type="submit" className="w-full">
                                          {modalType === 'add' ? 'Add Tier' : 'Update Tier'}
                                    </Button>
                              </div>
                        </form>
                  </DialogContent>
            </Dialog>
      );
}