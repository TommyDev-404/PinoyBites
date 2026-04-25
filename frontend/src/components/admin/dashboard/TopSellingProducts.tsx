import { Card, CardContent, CardHeader, CardDescription, CardTitle } from '@/components/ui/card';
import type { TopSellingProducts } from '@/types/admin/dashboard.types';
import { PackageSearch } from 'lucide-react';

interface TopSellingProductsProps{
      products: TopSellingProducts[];
}

export default function TopSellingProducts({ products }: TopSellingProductsProps){
      return (
            <Card>
                  <CardHeader>
                        <CardTitle>Top Performing Products</CardTitle>
                        <CardDescription>Best selling items this month</CardDescription>
                  </CardHeader>

                  <CardContent>
                  {products.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-10 text-center text-gray-500 dark:text-gray-400">
                              <PackageSearch className="w-10 h-10 mb-3 text-gray-400" />
                              <p className="font-medium">No top products yet</p>
                              <p className="text-sm">Sales data will appear here</p>
                        </div>
                  ) : (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                              {products.map((product, index) => (
                                    <div key={product.product_id} className="p-4 bg-gradient-to-br from-amber-50 to-orange-50 rounded-lg border border-amber-200">
                                          <div className="flex items-center gap-3 mb-3">
                                                <div className="w-10 h-10 bg-amber-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                                                      {index + 1}
                                                </div>
                                                <div>
                                                      <p className="font-semibold">{product.name}</p>
                                                      <p className="text-xs text-gray-500">{product.category}</p>
                                                </div>
                                          </div>
                                          <div className="flex items-center justify-between">
                                                <div>
                                                      <p className="text-xs text-gray-600">Units Sold</p>
                                                      <p className="text-lg font-bold text-amber-600">{product.sold}</p>
                                                </div>
                                                <div className="text-right">
                                                      <p className="text-xs text-gray-600">Revenue</p>
                                                      <p className="text-lg font-bold text-gray-900">₱{product.revenue}</p>
                                                </div>
                                          </div>
                                    </div>
                              ))}
                        </div>
                  )}
                  </CardContent>
            </Card>
      );
}