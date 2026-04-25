
type FilterProps = {
      categories: string[];
      setShowFilters: (open: boolean) => void;
      selectedCategory: string;
      setSelectedCategory: (category: string) => void;
      priceRange: [number, number];
      setPriceRange: (range: [number, number]) => void;
      clearFilters: () => void;
};

export default function ProductFilters({
      categories,
      setShowFilters,
      selectedCategory,
      setSelectedCategory,
      priceRange,
      setPriceRange,
      clearFilters,
}: FilterProps) {
      
      return (
            <div className="mt-6 absolute top-46.5 md:top-15 left-0 z-20 rounded-xl shadow-xl bg-white p-6 w-full">
                  <div className="flex justify-end">
                        <span onClick={() => setShowFilters(false)} className="text-xl cursor-pointer">&times;</span>
                  </div>
                  <div className="grid md:grid-cols-2 gap-6">
                        {/* Price Range */}
                        <div>
                              <label className="block text-sm font-semibold text-gray-900 mb-3">Price Range: ${priceRange[0]} - ${priceRange[1]}</label>
                              <div className="flex items-center gap-4">
                                    <input
                                          type="range"
                                          min="0"
                                          max="20"
                                          value={priceRange[1]}
                                          onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                                          className="flex-1"
                                    />
                              </div>
                        </div>

                        {/* Categories */}
                        <div>
                              <label className="block text-sm font-semibold text-gray-900 mb-3">Category</label>
                              <div className="flex flex-wrap gap-2">
                                    {categories.map((category) => (
                                          <button
                                                key={category}
                                                onClick={() => setSelectedCategory(category)}
                                                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                                                selectedCategory === category
                                                ? 'bg-amber-600 text-white'
                                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                                }`}
                                          >
                                                {category}
                                          </button>
                                    ))}
                              </div>
                        </div>
                  </div>

                  {/* Clear Filters */}
                  <div className="mt-4 flex justify-end">
                        <button
                              onClick={clearFilters}
                              className="text-amber-600 hover:text-amber-700 font-medium"
                        >
                              Clear All Filters
                        </button>
                  </div>
            </div>
      );
}