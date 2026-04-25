import { Search, SlidersHorizontal, X } from 'lucide-react';
import type { SortOption } from '@/types/user';

interface SearchBarProps{
      searchQuery: string;
      setSearchQuery: (search: string) => void;
      sortBy: SortOption;
      setSortBy:(sort: SortOption) => void;
      showFilters: boolean;
      setShowFilters: (isFilter: boolean) => void;
}

export default function SearchBar({ searchQuery, setSearchQuery, sortBy, setSortBy, showFilters, setShowFilters} : SearchBarProps){
      return (
            <div className="flex flex-col md:flex-row gap-4">
                  {/* Search Bar */}
                  <div className="flex-1 relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                        <input
                              type="text"
                              placeholder="Search for breads, pastries..."
                              value={searchQuery}
                              onChange={(e) => setSearchQuery(e.target.value)}
                              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                        />
                        {searchQuery && (
                              <button
                                    onClick={() => setSearchQuery('')}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                              >
                                    <X size={20} />
                              </button>
                        )}
                  </div>

                  {/* Sort Dropdown */}
                  <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value as SortOption)}
                        className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  >
                        <option value="recommended">Recommended</option>
                        <option value="new">Newest First</option>
                        <option value="rating">Highest Rated</option>
                        <option value="price-low">Price: Low to High</option>
                        <option value="price-high">Price: High to Low</option>
                  </select>

                  {/* Filter Toggle Button */}
                  <button
                        onClick={() => setShowFilters(!showFilters)}
                        className="flex items-center justify-center gap-2 px-6 py-3 bg-amber-600 hover:bg-amber-700 text-white rounded-lg font-semibold transition-colors"
                  >
                        <SlidersHorizontal size={20} />
                        Filters
                  </button>
            </div>
      );
}