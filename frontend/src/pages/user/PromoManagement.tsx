import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Edit, Ticket, Users } from "lucide-react";

// Types
interface LoyaltyTier {
  id: number;
  tier_name: string;
  required_spent: number;
  discount_percent: number;
  valid_days: number;
}

interface PromoCode {
  id: number;
  code: string;
  user_name: string;
  discount_percent: number;
  expires_at: string;
  is_used: boolean;
}

interface PromoManagementProps {
  tiers: LoyaltyTier[];
  promos: PromoCode[];
}

const tiers: LoyaltyTier[] = [
      { id: 1, tier_name: 'Bronze', required_spent: 1000, discount_percent: 5, valid_days: 7 },
      { id: 2, tier_name: 'Silver', required_spent: 3000, discount_percent: 10, valid_days: 7 },
      { id: 3, tier_name: 'Gold', required_spent: 5000, discount_percent: 15, valid_days: 10 },
      { id: 4, tier_name: 'Platinum', required_spent: 8000, discount_percent: 20, valid_days: 14 }
    ];

    const promos: PromoCode[] = [
      { id: 1, code: 'BRONZE-JUAN-001', user_name: 'Juan DelaCruz', discount_percent: 5, expires_at: '2026-03-29', is_used: true },
      { id: 2, code: 'SILVER-JUAN-002', user_name: 'Juan DelaCruz', discount_percent: 10, expires_at: '2026-03-29', is_used: false },
      { id: 3, code: 'BRONZE-MARIA-003', user_name: 'Maria Santos', discount_percent: 5, expires_at: '2026-03-25', is_used: false },
      { id: 4, code: 'SILVER-CARLO-004', user_name: 'Carlo Reyes', discount_percent: 10, expires_at: '2026-03-25', is_used: true },
      { id: 5, code: 'GOLD-CARLO-005', user_name: 'Carlo Reyes', discount_percent: 15, expires_at: '2026-03-28', is_used: false },
      { id: 6, code: 'PLATINUM-ANA-006', user_name: 'Ana Lim', discount_percent: 20, expires_at: '2026-04-01', is_used: false },
      { id: 7, code: 'SILVER-RODEL-007', user_name: 'Rodel Tan', discount_percent: 10, expires_at: '2026-03-27', is_used: false }
    ];

export default function PromoManagement() {
  const [isOpen, setIsOpen] = useState(false);

  const activePromos = promos.filter(p => !p.is_used && new Date(p.expires_at) > new Date());

  return (
    <div className="space-y-6 p-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Active Promos</p>
              <p className="text-2xl font-bold">{activePromos.length}</p>
            </div>
            <Ticket className="text-amber-600" />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Promos Issued</p>
              <p className="text-2xl font-bold">{promos.length}</p>
            </div>
            <Users className="text-blue-600" />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Loyalty Tiers</p>
              <p className="text-2xl font-bold">{tiers.length}</p>
            </div>
            <Ticket className="text-green-600" />
          </CardContent>
        </Card>
      </div>

      {/* Loyalty Tier Management */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Loyalty Tiers</CardTitle>
            <CardDescription>Manage reward thresholds</CardDescription>
          </div>

          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus size={16} className="mr-2" /> Add Tier
              </Button>
            </DialogTrigger>

            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add Loyalty Tier</DialogTitle>
              </DialogHeader>

              <div className="space-y-3">
                <Input placeholder="Tier Name" />
                <Input placeholder="Required Spent" type="number" />
                <Input placeholder="Discount %" type="number" />
                <Input placeholder="Valid Days" type="number" />
                <Button className="w-full">Save Tier</Button>
              </div>
            </DialogContent>
          </Dialog>
        </CardHeader>

        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Required Spent</TableHead>
                <TableHead>Discount</TableHead>
                <TableHead>Validity</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tiers.map(tier => (
                <TableRow key={tier.id}>
                  <TableCell>{tier.tier_name}</TableCell>
                  <TableCell>₱{tier.required_spent.toLocaleString()}</TableCell>
                  <TableCell>{tier.discount_percent}%</TableCell>
                  <TableCell>{tier.valid_days} days</TableCell>
                  <TableCell>
                    <Button size="sm" variant="outline">
                      <Edit size={14} />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Promo Code List */}
      <Card>
        <CardHeader>
          <CardTitle>Issued Promo Codes</CardTitle>
          <CardDescription>All generated user promo codes</CardDescription>
        </CardHeader>

        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Code</TableHead>
                <TableHead>User</TableHead>
                <TableHead>Discount</TableHead>
                <TableHead>Expiry</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {promos.map(promo => {
                const isActive = !promo.is_used && new Date(promo.expires_at) > new Date();
                return (
                  <TableRow key={promo.id}>
                    <TableCell className="font-mono">{promo.code}</TableCell>
                    <TableCell>{promo.user_name}</TableCell>
                    <TableCell>{promo.discount_percent}%</TableCell>
                    <TableCell>{new Date(promo.expires_at).toLocaleDateString()}</TableCell>
                    <TableCell>
                      {promo.is_used ? (
                        <Badge variant="secondary">Used</Badge>
                      ) : isActive ? (
                        <Badge variant="default">Active</Badge>
                      ) : (
                        <Badge variant="destructive">Expired</Badge>
                      )}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}