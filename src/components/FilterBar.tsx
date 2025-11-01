import { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

interface FilterBarProps {
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  sortOrder: string;
  onSortChange: (order: string) => void;
}

export const FilterBar = ({
  categories,
  selectedCategory,
  onCategoryChange,
  sortOrder,
  onSortChange,
}: FilterBarProps) => {
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isSortOpen, setIsSortOpen] = useState(false);

  const sortOptions = [
    { value: '', label: 'Default' },
    { value: 'asc', label: 'Price: Low to High' },
    { value: 'desc', label: 'Price: High to Low' },
  ];

  const currentSortLabel = sortOptions.find(opt => opt.value === sortOrder)?.label || 'Default';

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!(event.target as Element).closest('.dropdown')) {
        setIsCategoryOpen(false);
        setIsSortOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="flex flex-col sm:flex-row gap-4">
      <div className="flex-1 min-w-64 dropdown">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Category
        </label>
        <div className="relative">
          <button
            onClick={() => setIsCategoryOpen(!isCategoryOpen)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-left flex justify-between items-center"
          >
            <span>{selectedCategory ? selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1) : 'All Categories'}</span>
            <ChevronDown className="w-2 h-5 text-gray-400" />
          </button>
          {isCategoryOpen && (
            <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-lg mt-1 max-h-48 overflow-y-auto shadow-lg">
              <li
                onClick={() => { onCategoryChange(''); setIsCategoryOpen(false); }}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              >
                All Categories
              </li>
              {categories.map((category) => (
                <li
                  key={category}
                  onClick={() => { onCategoryChange(category); setIsCategoryOpen(false); }}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className="flex-1 min-w-64 dropdown">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Sort by Price
        </label>
        <div className="relative">
          <button
            onClick={() => setIsSortOpen(!isSortOpen)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-left flex justify-between items-center"
          >
            <span>{currentSortLabel}</span>
            <ChevronDown className="w-5 h-5 text-gray-400" />
          </button>
          {isSortOpen && (
            <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-lg mt-1 max-h-48 overflow-y-auto shadow-lg">
              {sortOptions.map((option) => (
                <li
                  key={option.value}
                  onClick={() => { onSortChange(option.value); setIsSortOpen(false); }}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                >
                  {option.label}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};
