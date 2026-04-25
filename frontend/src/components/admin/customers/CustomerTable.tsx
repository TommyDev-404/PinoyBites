import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Ban, Eye, UserCheck } from "lucide-react";
import CustomerDetailsModal from "./CustomerDetails";
import BanCustomerModal from "./BanCustomerModal";
import UnbanCustomerModal from "./UnBanModal";
import type { CustomersInfo } from "@/types/admin/customers.types";

type CustomerTableProps = {
      customers: CustomersInfo[]
};

type ModalToOpenType = 'view details' | 'ban customer' | 'unban customer' | null;

export default function CustomerTable({ customers }: CustomerTableProps ) {
      const [ modalToOpen, setModalOpen ] = useState<ModalToOpenType>(null);
      const [ customerId, setCustomerId ] = useState<number>(0);

      const openCustomerDetailsModal = (customerId: number) => {
            setModalOpen('view details');
            setCustomerId(customerId);
      };

      const openBanModal = (customerId: number) => {
            setModalOpen('ban customer');
            setCustomerId(customerId);
      };

      const openUnBanModal = (customerId: number) => {
            setModalOpen('unban customer');
            setCustomerId(customerId);
      };

      return (
            <Card>
                  <CardHeader>
                        <CardTitle>Customer Management</CardTitle>
                        <CardDescription>View and manage customer information</CardDescription>
                  </CardHeader>
                  <CardContent>
                        <Table>
                              <TableHeader>
                                    <TableRow>
                                          <TableHead className="text-center">Customer Name</TableHead>
                                          <TableHead className="text-center">Contact</TableHead>
                                          <TableHead className="text-center">Total Orders</TableHead>
                                          <TableHead className="text-center">Total Spent</TableHead>
                                          <TableHead className="text-center">Account Status</TableHead>
                                          <TableHead className="text-center">Actions</TableHead>
                                    </TableRow>
                              </TableHeader>
                              <TableBody className="text-center">
                                    {customers.map((customer) => (
                                          <TableRow key={customer.user_id}>
                                                <TableCell className="font-medium">{customer.username}</TableCell>
                                                <TableCell>
                                                      <p className="text-sm">{customer.email}</p>
                                                      <p className="text-xs text-gray-500">{customer.contact_num}</p>
                                                </TableCell>
                                          <TableCell>{customer.total_orders} orders</TableCell>
                                          <TableCell className="font-semibold">₱{customer.total_spent}</TableCell>
                                          <TableCell className="font-semibold">{ customer.account_status}</TableCell>
                                          <TableCell className="flex justify-center items-center gap-4">
                                                {customer.account_status === 'Banned' ? (
                                                      <Button
                                                            size="icon"
                                                            className="text-white bg-green-600 hover:bg-green-700"
                                                            onClick={() => openUnBanModal(customer.user_id)}
                                                      >
                                                            <UserCheck size={16} />
                                                      </Button>
                                                      ) : (
                                                      <Button
                                                            size="icon"
                                                            className="text-white bg-red-500 hover:bg-red-600"
                                                            onClick={() => openBanModal(customer.user_id)}
                                                      >
                                                            <Ban size={16} />
                                                      </Button>
                                                )}

                                                <Button variant="ghost" size="icon" onClick={() => openCustomerDetailsModal(customer.user_id)}>
                                                      <Eye size={16} />
                                                </Button>
                                          </TableCell>
                                          </TableRow>
                                    ))}
                              </TableBody>
                        </Table>
                  </CardContent>

                  {modalToOpen === 'view details' ?
                        <CustomerDetailsModal
                              customer={customers.find((customer) => customer.user_id === customerId)!}
                              open={true}
                              onClose={() => setModalOpen(null)}
                        />
                  : modalToOpen === 'ban customer' ?
                        <BanCustomerModal
                              customerId={customerId}
                              open={true}
                              onClose={() => setModalOpen(null)}
                        /> 
                  : modalToOpen === 'unban customer' ?
                        <UnbanCustomerModal
                              customerId={customerId}
                              open={true}
                              onClose={() => setModalOpen(null)}
                        /> 
                  : null}
            </Card>
      );
}