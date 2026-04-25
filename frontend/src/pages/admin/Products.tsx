import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit, Trash2, Eye } from "lucide-react";
import ProductModal from "@/components/admin/products/ProductModal";
import { useState } from "react";
import { useAdminAllProducts, useAdminRemoveProduct, useAdminViewProduct } from "@/hooks/admin/products.hooks";
import ConfirmationModal from "@/components/shared/ConfirmationModal";
import AdminLoading from "@/components/shared/AdminLoading";
import ProductViewModal from "@/components/admin/products/ViewProductInfo";


type ModalToOpen = 'add' | 'update' | 'remove' | 'view' | null;

export default function Products() {
      const [ modalToOpen, setModalToOpen ] = useState<ModalToOpen>(null);
      const [ productId, setProductId ] = useState<number>(0);

      const [currentPage, setCurrentPage] = useState(1);
      const pageSize = 10; // show 10 products per page

      const { mutate: removeProduct } = useAdminRemoveProduct();
      const { data: allProductsData, isLoading: allProductsLoading } = useAdminAllProducts();
      const products = allProductsData?.products ?? [];

      const paginatedProducts = products.slice(
            (currentPage - 1) * pageSize,
            currentPage * pageSize
      );
      
      const totalPages = Math.ceil(products.length / pageSize);

      const openUpdateProduct = (product_id: number) => {
            setModalToOpen('update');
            setProductId(product_id);
      }

      const handleRemoveProduct = (product_id: number) => {
            setModalToOpen('remove');
            setProductId(product_id);
      };
      
      const handleViewProduct = (product_id: number) => {
            setModalToOpen('view');
            setProductId(product_id);
      };

      if (allProductsLoading) return <AdminLoading/>;

      return (
            <Card className="fade-in">
                  <CardHeader>
                        <div className="flex items-center justify-between">
                              <div>
                                    <CardTitle>Products Management</CardTitle>
                                    <CardDescription>Manage your product catalog</CardDescription>
                              </div>
                              <Button
                                    onClick={() => setModalToOpen('add')}
                                    className="bg-amber-600 hover:bg-amber-700"
                              >
                                    <Plus size={18} className="mr-2" />
                                    Add Product
                              </Button>
                        </div>
                  </CardHeader>

                  <CardContent>
                        <Table>
                              <TableHeader>
                                    <TableRow>
                                          <TableHead className="text-center">Product Name</TableHead>
                                          <TableHead className="text-center">Category</TableHead>
                                          <TableHead className="text-center">Price</TableHead>
                                          <TableHead className="text-center">Sold</TableHead>
                                          <TableHead className="text-center">Actions</TableHead>
                                    </TableRow>
                              </TableHeader>

                              <TableBody className="text-center">
                                    {paginatedProducts.map((product) => (
                                          <TableRow key={product.product_id}>
                                                <TableCell className="font-medium">{product.name}</TableCell>
                                                <TableCell>
                                                      <Badge variant="outline">{product.category}</Badge>
                                                </TableCell>
                                                <TableCell className="font-semibold">₱{product.price}</TableCell>
                                                <TableCell>{product.sold} units</TableCell>
                                                <TableCell className="text-center">
                                                      <div className="flex items-center justify-center gap-2">
                                                            <Button 
                                                                  onClick={() => openUpdateProduct(product.product_id)}
                                                                  variant="ghost" 
                                                                  size="icon" 
                                                                  className="text-green-500 hover:text-green-600"
                                                            >
                                                                  <Edit size={16} />
                                                            </Button>

                                                            <Button 
                                                                  onClick={() => handleRemoveProduct(product.product_id)}
                                                                  variant="ghost" 
                                                                  size="icon" 
                                                                  className="text-red-600 hover:text-red-700 hover:bg-red-50"
                                                            >
                                                                  <Trash2 size={16} />
                                                            </Button>

                                                            <Button 
                                                                  onClick={() => handleViewProduct(product.product_id)}
                                                                  variant="ghost" 
                                                                  size="icon" 
                                                            >
                                                                  <Eye size={16} />
                                                            </Button>
                                                      </div>
                                                </TableCell>
                                          </TableRow>
                                    ))}
                              </TableBody>
                        </Table>
                        <div className="flex items-center justify-between mt-4">
                              <p className="text-sm text-gray-500">
                                    Page {currentPage} of {totalPages || 1}
                              </p>

                              <div className="flex gap-2">
                                    {[...Array(totalPages)].map((_, i) => (
                                          <Button
                                                key={i}
                                                variant={currentPage === i + 1 ? "default" : "outline"}
                                                size="sm"
                                                onClick={() => setCurrentPage(i + 1)}
                                          >
                                          {i + 1}
                                          </Button>
                                    ))}
                              </div>

                              <div className="flex items-center gap-2">
                                    <Button
                                          variant="outline"
                                          size="sm"
                                          disabled={currentPage === 1}
                                          onClick={() => setCurrentPage((prev) => prev - 1)}
                                    >
                                          Prev
                                    </Button>

                                    <Button
                                          variant="outline"
                                          size="sm"
                                          disabled={currentPage === totalPages}
                                          onClick={() => setCurrentPage((prev) => prev + 1)}
                                    >
                                          Next
                                    </Button>
                              </div>
                        </div>
                  </CardContent>

                  {modalToOpen === "add" ?
                        <ProductModal
                              modalType="add"
                              open={true}
                              onClose={() => setModalToOpen(null)}
                        />
                  : modalToOpen === "update" ?
                        <ProductModal
                              payload={ products.find((product) => product.product_id === productId) }
                              modalType="update"
                              open={true}
                              onClose={() => setModalToOpen(null)}
                        />
                  :  modalToOpen === "view" ?
                        <ProductViewModal
                              product_id={productId!}
                              open={true}
                              onClose={() => { setModalToOpen(null), setProductId(0) }}
                        />
                  : modalToOpen === 'remove' ?
                        <ConfirmationModal 
                              message={"Are you sure you want to remove this product? It will be gone forever."} 
                              modalType={'remove'}
                              actionName={"Remove"}
                              open={true} 
                              onClose={() => setModalToOpen(null)}
                              execFunc={() => removeProduct({ product_id: productId })}
                        />
                  : null}
            </Card>
      );
};

