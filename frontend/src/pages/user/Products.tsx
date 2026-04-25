import { lazy, useEffect, useState } from 'react';
import { Heart, Loader } from 'lucide-react';
import ProductCard from '@/components/user/products/ProductCard';
import { motion } from 'framer-motion';
import { useAuth } from '@/context/auth.context';
import EmptyProduct from '@/components/user/products/EmptyProduct';
import SearchBar from '@/components/user/products/SearchBar';
import PageHeader from '@/components/user/products/PageHeader';
import { pageWidth } from '@/utils/padding';
import { useAddFavoriteProducts, useFavoriteProducts, useProducts } from '@/hooks/user/products.hooks';
import type { ProductFilters, ProductType, SortOption } from '@/types/user/products.types';
import { useDebounce } from '@/hooks/useDebounce';
import { initSocket } from '@/lib/socket';
import { useQueryClient } from '@tanstack/react-query';
import { useGlobalContext } from '@/context/global.context';


const Filter = lazy(() => import('@/components/user/products/FilterCard'));

const categories = [
	'All',
	'Bread',
	'Fried',
	'Steamed',
	'Rice Cakes',
	'Dessert'
];

export default function Products() {
      const { user } = useAuth();

      const [searchQuery, setSearchQuery] = useState('');
      const [selectedCategory, setSelectedCategory] = useState('All');
      const [sortBy, setSortBy] = useState<SortOption>('new');
      const [priceRange, setPriceRange] = useState<[number, number]>([0, 100]);
      const [showFilters, setShowFilters] = useState(false);

      const debouncedSearch = useDebounce(searchQuery, 500);

      const filters: ProductFilters = {
            searchProduct: debouncedSearch,
            selectedCategory,
            sortBy,
            minPrice: priceRange[0],
            maxPrice: priceRange[1],
      }; 

      const { data: allProducts, isLoading: allProductsLoading } = useProducts(filters);
      const products = allProducts?.products ?? [];

      const { data: userFavorites = [] } = useFavoriteProducts(user?.user_id!);
      const { mutate: addFavorite } = useAddFavoriteProducts();

      const toggleFavorite = (productId: number) => {
            addFavorite({ userId: user?.user_id!, productId });
      };

      const clearFilters = () => {
            setSearchQuery('');
            setSelectedCategory('All');
            setSortBy('recommended');
            setPriceRange([0, 20]);
      };

      return (
            <section className={`${pageWidth}`}>
                        {/* Page Header */}
                  <PageHeader user={user ? true : false}/>

                  {/* Search and Filter Bar */}
                  <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.30 }}
                        className="bg-white rounded-xl shadow-md p-4 mb-8 relative"
                  >
                        {/* Search Bar */}
                        <SearchBar
                              searchQuery={searchQuery}
                              setSearchQuery={setSearchQuery}
                              sortBy={sortBy}
                              setSortBy={setSortBy}
                              showFilters={showFilters}
                              setShowFilters={setShowFilters}
                        />

                        {/* Expandable Filters */}
                        {showFilters && (
                              <Filter
                                    categories={categories}
                                    setShowFilters={setShowFilters}
                                    selectedCategory={selectedCategory}
                                    setSelectedCategory={setSelectedCategory}
                                    priceRange={priceRange}
                                    setPriceRange={setPriceRange}
                                    clearFilters={clearFilters}
                              />
                        )}
                  </motion.div>

                  {/* Favorite Products Section */}
                  {userFavorites.length > 0 && (
                        <div className="mb-12">
                              <motion.div
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, amount: 0.3 }}
                                    transition={{ duration: 0.25 }}
                              >
                                    <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                                          <Heart className="fill-red-500 text-red-500" size={24} />
                                          Your Favorites
                                    </h2>
                              </motion.div>

                              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                                    {userFavorites.map((product, index) => (
                                          <motion.div
                                                key={product.product_id}
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ duration: 0.3, delay: index * 0.03 }}
                                          >
                                                <ProductCard
                                                      key={product.product_id}
                                                      product={product}
                                                      isFavorite={userFavorites.map((item) => item.product_id).includes(product.product_id)}
                                                      onToggleFavorite={toggleFavorite}
                                                />
                                          </motion.div>
                                    ))}
                              </div>
                        </div>
                  )}

                  {/* Results Count */}
                  <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.30 }}
                        className="mb-6"
                  >
                        <p className="text-gray-600">
                              Showing <span className="font-semibold text-gray-900">{products.length}</span> products
                              {selectedCategory !== 'All' && (
                                    <span> in <span className="font-semibold text-amber-600">{selectedCategory}</span></span>
                              )}
                        </p>
                  </motion.div>

                  {/* All Products Grid */}
                  {allProductsLoading ? (
                        <div className="flex justify-center items-center min-h-screen">
                              <Loader className="w-20 h-20 animate-spin text-amber-600" />
                        </div>
                  ) : products.length > 0 ? (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                              {products.map((product, index) => (
                                    <motion.div
                                          key={product.product_id}
                                          initial={{ opacity: 0, y: 20 }}
                                          animate={{ opacity: 1, y: 0 }}
                                          transition={{ duration: 0.3, delay: index * 0.03 }}
                                    >
                                          <ProductCard
                                                key={product.product_id}
                                                product={product}
                                                isFavorite={userFavorites.map((item) => item.product_id).includes(product.product_id)}
                                                onToggleFavorite={toggleFavorite}
                                          />
                                    </motion.div>
                              ))}
                        </div>
                        ) : (
                              <EmptyProduct
                                    setSearchQuery={setSearchQuery}
                                    setSelectedCategory={setSelectedCategory}
                                    setPriceRange={setPriceRange}
                              /> 
                        )
                  }
            </section>
      );
}
