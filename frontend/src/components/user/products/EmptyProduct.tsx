
interface EmptyProductProps{
      setSearchQuery: (search: string) => void;
      setSelectedCategory: (category: string) => void;
      setPriceRange: (priceRange: [number, number]) => void;
}

export default function EmptyProduct({ setSearchQuery, setSelectedCategory, setPriceRange} : EmptyProductProps){
      return(
            <div className="text-center py-12">
                  <p className="text-gray-500 text-lg">No products found matching your criteria.</p>
                  <button
                        onClick={() => {
                              setSearchQuery('');
                              setSelectedCategory('All');
                              setPriceRange([0, 20]);
                        }}
                        className="mt-4 text-amber-600 hover:text-amber-700 font-semibold"
                  >
                        Clear filters
                  </button>
            </div>
      );
}