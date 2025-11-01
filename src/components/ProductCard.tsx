import { Product } from '../types/product';

interface ProductCardProps {
  product: Product;
  onClick: () => void;
}

export const ProductCard = ({ product, onClick }: ProductCardProps) => {
  return (
    <div
      onClick={onClick}
      className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-xl h-full"
    >
      <div className="aspect-square bg-gray-50 flex items-center justify-center p-4 sm:p-6">
        <img
          src={product.image}
          alt={product.title}
          className="max-h-full max-w-full object-contain"
        />
      </div>
      <div className="p-3 sm:p-4 flex flex-col flex-grow">
        <h3 className="text-xs sm:text-sm font-semibold text-gray-800 line-clamp-2 mb-2 min-h-[2rem] sm:min-h-[2.5rem]">
          {product.title}
        </h3>
        <div className="flex items-center justify-between mt-auto">
          <span className="text-lg sm:text-2xl font-bold text-gray-900">
            ${product.price.toFixed(2)}
          </span>
          <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
            {product.category}
          </span>
        </div>
      </div>
    </div>
  );
};
