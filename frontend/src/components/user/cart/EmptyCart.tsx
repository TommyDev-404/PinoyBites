import { ShoppingCart, ArrowLeft } from 'lucide-react';
import { NavLink } from 'react-router-dom';

export default function EmptyCart(){
      return (
            <section className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2'>
                  <div className="flex flex-col items-center justify-center py-20">
                        <ShoppingCart className="w-24 h-24 text-gray-300 mb-6" />
                        <h2 className="text-2xl font-bold mb-2">Your cart is empty</h2>
                        <p className="text-gray-600 mb-8">Add some delicious food to get started!</p>
                        <NavLink 
                              to={'/products'}
                              className={'flex items-center justify-center bg-amber-600 hover:bg-amber-700 py-3 px-6 text-sm text-white rounded-full'}
                        >
                              <ArrowLeft className="w-5 h-5 mr-2" />
                              Continue Shopping
                        </NavLink>
                  </div>
            </section>
      );
}