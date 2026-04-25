import { Request, Response } from "express";
import { addNewProduct, getAllProducts, removeSpecificProduct, updateProductInfo, viewSpecificProduct } from "../../services/admin/products.services";
import { AddProductSchema, RemoveProductSchema, UpdateProductSchema } from "../../validators/admin/products.validators";

export const allProducts = async (req: Request, res: Response) => {
      try{
            const products = await getAllProducts();
            
            res.status(200).json({ 
                  success: true,
                  products
            });
      }catch(err){
            console.error(err);
            res.status(500).json({ message: "Failed to retrieve all products." });
      }
};

export const addProduct = async (req: Request, res: Response) => {
      const parsed = AddProductSchema.safeParse(req.body);

      if (!parsed.success) {
            console.log(parsed.error.format());
            return res.status(400).json({ message: "Invalid body", errors: parsed.error.issues });
      }

      const { 
            name,
            description,
            price,
            image_url,
            category,
            ingredients,
            steps
      } = parsed.data;

      try{
            const addedProduct = await addNewProduct({
                  name,
                  description,
                  price,
                  image_url,
                  category,
                  ingredients,
                  steps
            });
            
            res.status(200).json({ 
                  success: true,
                  orders: addedProduct
            });
      }catch(err){
            console.error(err);
            res.status(500).json({ message: "Failed to update product." });
      }
};

export const updateProducts = async (req: Request, res: Response) => {
      
      const parsedQuery = RemoveProductSchema.safeParse(req.query);

      if (!parsedQuery.success) {
            return res.status(400).json({ message: "Invalid query", errors: parsedQuery.error.issues });
      }

      const parsedBody = UpdateProductSchema.safeParse(req.body);

      if (!parsedBody.success) {
            return res.status(400).json({ message: "Invalid body", errors: parsedBody.error.issues });
      }

      const product_id = parsedQuery.data.product_id;
      const updated_data = parsedBody.data;
      console.log(updated_data);
      try{
            const updatedProduct = await updateProductInfo(product_id, updated_data);
            
            res.status(200).json({ 
                  success: true,
                  orders: updatedProduct
            });
      }catch(err){
            console.error(err);
            res.status(500).json({ message: "Failed to update product." });
      }
};

export const viewProduct = async (req: Request, res: Response) => {
      const parsed = RemoveProductSchema.safeParse(req.query);
      if (!parsed.success) {
            return res.status(400).json({ message: "Invalid query", errors: parsed.error.issues });
      }

      const { product_id } = parsed.data;

      try{
            const product = await viewSpecificProduct(product_id);
            
            res.status(200).json({ 
                  success: true,
                  message: "Product info retrieve successfully!",
                  product
            });
      }catch(err){
            console.error(err);
            res.status(500).json({ message: "Failed to view product." });
      }
};

export const removeProduct = async (req: Request, res: Response) => {
      const parsed = RemoveProductSchema.safeParse(req.query);
      if (!parsed.success) {
            return res.status(400).json({ message: "Invalid query", errors: parsed.error.issues });
      }

      const { product_id } = parsed.data;

      try{
            const removedProduct = await removeSpecificProduct(product_id);
            
            res.status(200).json({ 
                  success: true,
                  orders: removedProduct
            });
      }catch(err){
            console.error(err);
            res.status(500).json({ message: "Failed to remove order." });
      }
};
