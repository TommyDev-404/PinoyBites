
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import type { TopCustomers } from "@/types/admin/dashboard.types";
import { Users } from "lucide-react";

type TopCustomersProps = {
      customers: TopCustomers[];
}

export default function TopCustomers({ customers }: TopCustomersProps){
      return (    
            <Card>
                  <CardHeader>
                        <CardTitle>Top Customers</CardTitle>
                        <CardDescription>Most valuable customers</CardDescription>
                  </CardHeader>

                  <CardContent>
                  {customers.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-10 text-center text-gray-500">
                              <Users className="w-10 h-10 mb-3 text-gray-400" />
                              <p className="font-medium">No top customers yet</p>
                              <p className="text-sm">Customer activity will appear here</p>
                        </div>      
                  ) : (
                        <div className="space-y-4">
                              {customers.map((customer, index) => (
                                          <div key={customer.user_id} className="flex items-center justify-between">
                                                <div className="flex items-center gap-3">
                                                      <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold">
                                                            {index + 1}
                                                      </div>
                                                      <div>
                                                            <p className="font-medium">{customer.name}</p>
                                                            <p className="text-sm text-gray-500">{customer.totalOrders} orders</p>
                                                      </div>
                                                </div>
                                                <p className="font-semibold">₱{customer.totalSpent}</p>
                                          </div>
                                    )
                              )}
                        </div>
                  )}
                  </CardContent>
            </Card>
      );     
}