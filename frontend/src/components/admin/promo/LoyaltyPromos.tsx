
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { PromoCodeInfo } from "@/types/admin/promo.types";
import { Info } from "lucide-react";

type PromoCodesProps = {
      promo_codes: PromoCodeInfo[]
}

export default function LoyaltyPromos({ promo_codes }: PromoCodesProps){
      return (
            <Card>
                  <CardHeader>
                        <CardTitle>Loyalty Tier Promos</CardTitle>
                        <CardDescription>Promos automatically granted to users based on their loyalty tier</CardDescription>
                  </CardHeader>
            
                  <CardContent>
                        <Table>
                              <TableHeader>
                                    <TableRow>
                                    <TableHead>Tier Name</TableHead>
                                    <TableHead>User</TableHead>
                                    <TableHead>Discount</TableHead>
                                    <TableHead>Received</TableHead>
                                    <TableHead>Expiry</TableHead>
                                    <TableHead>Status</TableHead>
                                    </TableRow>
                              </TableHeader>
                              <TableBody>
                                    {promo_codes.length === 0 ? (
                                          <TableRow>
                                                <TableCell colSpan={6} className="p-6">
                                                      <div className="flex flex-col justify-center items-center gap-2">
                                                      <Info className="w-5 h-5 text-gray-400" />
                                                      <span className="text-gray-500">No user with promo yet.</span>
                                                      </div>
                                                </TableCell>
                                          </TableRow>
                                    ) : (promo_codes.map(promo => {
                                          const isActive = promo.expires_at > new Date() ? true : false;

                                          return (
                                                <TableRow key={promo.id}>
                                                      <TableCell className="font-mono">{promo.loyalty_tiers.tier_name}</TableCell>
                                                      <TableCell>{promo.users.username}</TableCell>
                                                      <TableCell>{promo.discount}%</TableCell>
                                                      <TableCell>{new Date(promo.created_at).toLocaleDateString('en-PH', { month: 'short', day: '2-digit', year: 'numeric'})}</TableCell>
                                                      <TableCell>{new Date(promo.expires_at).toLocaleDateString('en-PH', { month: 'short', day: '2-digit', year: 'numeric'})}</TableCell>
                                                      <TableCell>
                                                            {!isActive? (
                                                                  <Badge variant="default">Active</Badge>
                                                            ) : (
                                                                  <Badge variant="destructive">Expired</Badge>
                                                            )}
                                                      </TableCell>
                                                </TableRow>
                                          );
                                    }))}
                              </TableBody>
                        </Table>
                  </CardContent>
            </Card>
      );
}