// services/rating.service.ts
import { prisma } from "../../lib/prisma";
import { AddProductType, UpdateProductType } from "../../validators/admin/products.validators";
import { getIO } from "../../lib/socket.lib";


export const getAllProducts = async () => {
      const totalSold = await prisma.order_items.groupBy({
            by: ['product_id'],
            where: {
                  orders: {
                        OR: [
                              { payment_method: { not: 'COD' }},
                              { status: 'Delivered'}
                        ]
                  }
            },
            _sum: { quantity: true }
      });

      const products = await prisma.products.findMany({
            select: {
                  product_id: true,
                  name: true,
                  description: true,
                  price: true,
                  image_url: true,
                  category: true,
                  ingredients: true,
                  steps: true,
            },
            orderBy: {
                  product_id: 'desc'
            }
      });

      const soldMap = new Map(totalSold.map(sold => [sold.product_id, sold._sum.quantity])); // create a new data of sold data for easily retrieving

      return products.map(p => ({
            ...p,
            sold: soldMap.get(p.product_id) ?? 0
      }));
};

export const addNewProduct = async (data: AddProductType) => {
      const result = await prisma.products.create({
            data: {
                  name: data.name,
                  description: data.description,
                  is_new: true, // default
                  price: data.price,
                  image_url: data.image_url,
                  avg_rating: 0.0, // default
                  total_reviews: 0, // default
                  category: data.category,
                  ingredients: data.ingredients,
                  steps: data.steps,
            },
      });

      const io = getIO();

      io.to("users").emit("new_product", result);

      return result;
};

export const updateProductInfo = async (product_id: number, updated_data: UpdateProductType ) => {
      const result = prisma.products.update({
            where: {
                  product_id: product_id
            },
            data: {
                  ...updated_data
            }
      });
      
      const io = getIO();

      io.to("users").emit("update_product", result);

      return result;
};

export const removeSpecificProduct = async (product_id: number) => {
      const result = await prisma.products.delete({
            where: {
                  product_id
            },
            select: { 
                  product_id: true
            }
      });
      
      const io = getIO();

      io.to("users").emit("remove_product", result);

      return result;
};

export const viewSpecificProduct = async (product_id: number) => {
      const product = await prisma.products.findFirst({
            where: {
                  product_id
            }
      });

      return product;
};