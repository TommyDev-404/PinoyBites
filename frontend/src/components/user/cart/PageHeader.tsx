import { useNavigate } from 'react-router-dom';

interface PageHeaderProps{
      cartItemsCount: number;
}

export default function PageHeader({ cartItemsCount } : PageHeaderProps){
      
      return(
            <div className="mb-8">
                  <h1 className="text-3xl md:text-4xl font-bold">Shopping Cart</h1>

                  {/* Description */}
                  <p className="text-gray-600 mt-2">
                        Review the snacks you've added to your cart before checkout. 
                        You can update quantities, remove items, or proceed to place your order.
                  </p>

                  {/* Cart Count */}
                  <p className="text-gray-500 mt-1">
                        {cartItemsCount} item{cartItemsCount !== 1 ? "s" : ""} in your cart
                  </p>
            </div>
      );
}