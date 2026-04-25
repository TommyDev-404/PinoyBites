

export default function MapFallbackImage(){
      return(
            <div className="w-full h-full flex flex-col items-center justify-center bg-gray-100 text-center px-6">
                  <svg
                        className="w-12 h-12 text-gray-400 mb-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                  >
                        <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 01.553-.894L9 2m0 18l6-2m-6 2V2m6 16l5.447-2.724A1 1 0 0021 16.382V5.618a1 1 0 00-.553-.894L15 2m0 16V2"
                        />
                  </svg>

                  <p className="text-gray-600 font-semibold">Map unavailable offline</p>
                  <p className="text-sm text-gray-500 mt-1">123 Bakery Street, Buenavista City, Philippines</p>
            </div>
      );
}