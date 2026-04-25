import { ArrowLeftCircle, Package } from "lucide-react";
import { NavLink } from "react-router-dom";

export default function EmptyOrders(){
      return(
            <section className='flex flex-col items-center justify-center py-auto'>
                  <div className="flex flex-col items-center justify-center py-20">
                        <Package className="w-24 h-24 text-gray-300 mb-6" />
                        <h2 className="text-2xl font-bold mb-2">No Orders Data</h2>
                        <p className="text-gray-600 mb-8">Your orders data will appear here after checkout.</p>
                        <NavLink
                              to={"/products"}
                              className="flex items-center justify-center bg-amber-600 hover:bg-amber-700 py-3 px-6 text-sm text-white rounded-full"
                        >
                              <ArrowLeftCircle className="w-5 h-5 mr-2" />
                              Browse Products
                        </NavLink>
                  </div>
            </section>
      );
}