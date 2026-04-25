
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Edit, Info, Plus, Ticket, Trash2 } from "lucide-react";
import type { LoyaltyTierInfo } from "@/types/admin/promo.types";
import { useState } from "react";
import TierModal from "./TierModal";
import { useAdminRemoveLoyaltyTier } from "@/hooks/admin/promo.hooks";
import ConfirmationModal from "@/components/shared/ConfirmationModal";

type LoyaltyTierProps = {
      loyalty_tiers: LoyaltyTierInfo[]
}

type ModalToOpenType = 'add' | 'update' | 'remove' | null;

export default function LoyaltyTier({ loyalty_tiers } : LoyaltyTierProps){
      const [ modalToOpen, setModalOpen ] = useState<ModalToOpenType>(null);
      const [ loyaltyTierID, setLoyaltyTierID ] = useState<number>(0); 

      const { mutate: removeLoyaltyTier } = useAdminRemoveLoyaltyTier(() => setModalOpen(null));

      const openAddTierModal = () => {
            setModalOpen('add');
      };
      
      const openUpdateTierModal = (id: number) => {
            setModalOpen('update');
            setLoyaltyTierID(id);
      };
      
      const handleRemoveLoyaltyTier = (id: number) => {
            setModalOpen('remove');
            setLoyaltyTierID(id);
      };

      return (
            <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                        <div>
                              <CardTitle>Loyalty Tiers</CardTitle>
                              <CardDescription>Manage reward thresholds</CardDescription>
                        </div>
                        
                        <Button onClick={openAddTierModal}>
                              <Plus size={16} className="mr-2" /> Add Tier
                        </Button>
                  </CardHeader>
            
                  <CardContent>
                        <Table>
                              <TableHeader>
                                    <TableRow>
                                          <TableHead className="text-center">Name</TableHead>
                                          <TableHead className="text-center">Required Spent</TableHead>
                                          <TableHead className="text-center">Discount</TableHead>
                                          <TableHead className="text-center">Validity</TableHead>
                                          <TableHead className="text-center">Actions</TableHead>
                                    </TableRow>
                              </TableHeader>
                              <TableBody>
                                    {loyalty_tiers.length === 0 ? (
                                          <TableRow>
                                                <TableCell colSpan={5} className="p-6">
                                                      <div className="flex flex-col justify-center items-center gap-2">
                                                            <Ticket className="w-5 h-5 text-gray-400" />
                                                            <span className="text-gray-500">No loyalty tiers yet.</span>
                                                      </div>
                                                </TableCell>
                                          </TableRow>
                                    ) : (loyalty_tiers.map(tier => (
                                          <TableRow key={tier.id} className="text-center">
                                                <TableCell>{tier.tier_name}</TableCell>
                                                <TableCell>₱{tier.required_spent.toLocaleString()}</TableCell>
                                                <TableCell>{tier.discount}%</TableCell>
                                                <TableCell>{tier.valid_days} days</TableCell>
                                                <TableCell className="flex items-center gap-3 justify-center">
                                                      <Button onClick={() => openUpdateTierModal(tier.id!)} size="sm" variant="outline">
                                                            <Edit size={14} />
                                                      </Button>

                                                      <Button onClick={() => handleRemoveLoyaltyTier(tier.id!)} size="sm" className="bg-red-500 hover:bg-red-600">
                                                            <Trash2 size={14} />
                                                      </Button>
                                                </TableCell>
                                          </TableRow>
                                    )))}
                              </TableBody>
                        </Table>
                  </CardContent>
                  
                  {modalToOpen === 'add' ?
                        <TierModal
                              modalType="add"
                              open={true}
                              onClose={() => setModalOpen(null)}
                        />
                  : modalToOpen === 'update' ?
                        <TierModal
                              payload={loyalty_tiers.find((tier) => tier.id === loyaltyTierID)}
                              modalType="update"
                              open={true}
                              onClose={() => setModalOpen(null)}
                        />
                  : modalToOpen === 'remove' ?
                        <ConfirmationModal 
                              message={'Are you sure you want to remove this loyalty tier?'} 
                              modalType={'remove'}
                              actionName={'Remove'}
                              open={true} 
                              onClose={() => setModalOpen( null )}
                              execFunc={() => removeLoyaltyTier({ id: loyaltyTierID})}
                        />
                  : null}
            </Card>
      );
}