
export type SortOption = 'recommended' | 'price-low' | 'price-high' | 'new' | 'rating';

export type ProductType = {
      product_id: number;
      name: string;
      description: string;
      price: number; // DECIMAL becomes number in TS
      image_url: string;
      avg_rating: number; // 0–5 range enforced in DB
      total_reviews: number;
      category: string;
      ingredients: string[]; // JSONB array
      steps: string[];       // JSONB array
      is_new: boolean;
};

export type ProductFilters = {
      searchProduct?: string;
      selectedCategory?: string;
      sortBy?: string;
      minPrice?: number;
      maxPrice?: number;
}

export type CartItem = {
      product_id: number;
      name: string;
      description: string;
      price: number;
      quantity?: number;
      image_url: string;
      category: string;
}

export type ViewProductRecipe = {
      name: string;
      image_url: string;
      ingredients: string[]; // JSONB array
      steps: string[];       // JSONB array
};

export type AddFavoriteResponse = {
      success: boolean;
      message: string;
}

export type AddToCartModalProps = {
      product: CartItem
      open: boolean,
      onClose: () => void
};