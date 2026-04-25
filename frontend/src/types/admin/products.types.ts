

export type AllProductsInfo = {
      product_id: number,
      name: string,
      description: string,
      price: number,
      image_url: string,
      category: string,
      ingredients: string[],
      steps: string[],
      sold: number
}

export type UpdateProductsInfo = {
      product_id: number,
      name?: string,
      description?: string,
      price?: number,
      image_url?: string,
      category?: string,
      ingredients?: string[],
      steps?: string[]
}

export type IndividualProductInfo = {
      product_id: number;
      name: string;
      description: string;
      price: string;
      image_url: string;
      avg_rating: string;
      total_reviews: number;
      category: string;
      is_new: boolean;
      ingredients: string[];
      steps: string[];
      created_at: string;
};