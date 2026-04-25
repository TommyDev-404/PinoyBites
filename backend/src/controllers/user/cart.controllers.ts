import { Request, Response } from "express";
import { CartSchema, CartUserIDSchema, RemoveCartSchema } from "../../validators/user/cart.validators";
import { addUserCartItems, checkUserPromoEligibility, findUserCartItems, removeItemFromUserCart, updateUserCartItems } from "../../services/user/cart.services";

export const getCart = async (req: Request, res: Response) => {
      const parsed = CartUserIDSchema.safeParse(req.query);

      if (!parsed.success) {
            return res.status(400).json({ message: "Invalid query", errors: parsed.error.issues });
      }

      const { user_id } = parsed.data;

      try{
            const cartItems = await findUserCartItems(user_id);
            res.json({
                  success: true,
                  message: 'User cart retrieve successfully!',
                  cart_items: cartItems
            });
      }catch(err){
            console.error(err);
            res.status(500).json({ message: "Failed to retreive cart items." });
      }
};

export const addToCart = async (req: Request, res: Response) => {
      console.log(req.body);
      const parsed = CartSchema.safeParse(req.body);

      if (!parsed.success) {
            return res.status(400).json({ message: "Invalid body", errors: parsed.error.issues });
      }
      
      const { user_id, product_id, quantity } = parsed.data;

      try {
            await addUserCartItems(user_id, product_id, quantity);

            res.status(200).json({ 
                  success: true, 
                  message: 'Item added to cart!', 
            });
      } catch (err) {
            console.error(err);
            res.status(500).json({ message: "Failed to add to cart." });
      }
};

export const updateCart = async (req: Request, res: Response) => {
      const parsed = CartSchema.safeParse(req.body);

      if (!parsed.success) {
            return res.status(400).json({ message: "Invalid body", errors: parsed.error.issues });
      }
      
      const { user_id, product_id, quantity } = parsed.data;

      try {
            await updateUserCartItems(user_id, product_id, quantity);

            res.status(200).json({ 
                  success: true, 
                  message: 'Cart updated successfully!', 
            });
      } catch (err) {
            console.error(err);
            res.status(500).json({ message: "Failed to update cart." });
      }
};

export const removeCartItem = async (req: Request, res: Response) => {
      const parsed = RemoveCartSchema.safeParse(req.query);

      if (!parsed.success) {
            return res.status(400).json({ message: "Invalid query", errors: parsed.error.issues });
      }

      const { user_id, product_id } = parsed.data;

      try{
            await removeItemFromUserCart(user_id, product_id);

            res.json({ 
                  success: true,
                  message:"Item removed!"
            });
      }catch(err){
            console.error(err);
            res.status(500).json({ message: "Failed to remove item." });
      }
};

export const checkPromoForUser = async (req: Request, res: Response) => {
      const parsed = CartUserIDSchema.safeParse(req.query);

      if (!parsed.success) {
            return res.status(400).json({ message: "Invalid query", errors: parsed.error.issues });
      }

      const { user_id } = parsed.data;

      try{
            const result = await checkUserPromoEligibility(user_id);

            const promo = result.length > 0 ?
                  {
                        id: result[0].id,
                        tier_name: result[0].tier_name,
                        discount: result[0].discount
                  }
                  : {};
            res.json({ 
                  success: true,
                  message:"User promo retrieved successfully!",
                  promo
            });
      }catch(err){
            console.error(err);
            res.status(500).json({ message: "Failed to remove item." });
      }
};