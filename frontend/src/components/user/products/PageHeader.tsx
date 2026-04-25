
interface PageHeaderProps{
      user: boolean
}

export default function PageHeader({ user }: PageHeaderProps){
      return(
            <div className="mb-8">
                  {user ? (
                        <>
                              <h1 className="text-4xl font-bold text-gray-900 mb-2">Start Your Order</h1>
                              <p className="text-gray-600">
                              Choose your favorite freshly made Filipino snacks—bibingka, puto, turon, biko, and more.  
                              Add them to your cart and enjoy authentic Pinoy flavors today!
                              </p>
                        </>
                  ) : (
                        <>
                              <h1 className="text-4xl font-bold text-gray-900 mb-2">Our Snacks</h1>
                              <p className="text-gray-600">
                                    Explore our full range of traditional Filipino merienda, freshly prepared daily with love and premium ingredients.
                              </p>
                        </>
                  )}
            </div>

      );
}