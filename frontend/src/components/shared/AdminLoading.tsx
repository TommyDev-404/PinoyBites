
export default function AdminLoading() {

      return (
            <div className="absolute inset-0 flex flex-col items-center justify-center backdrop-blur-xl bg-stone-100 px-6 text-center space-y-3">
                  <p className="text-base sm:text-lg md:text-xl font-semibold  text-gray-800 dark:text-gray-200 tracking-wide">Preparing your data</p>
                  <p className="text-xs sm:text-sm text-gray-400 max-w-xs sm:max-w-sm">Fetching the latest updates from the system</p>
                  
                  <div className="flex items-center justify-center space-x-2 pt-2">
                        <span className="w-3 h-3 bg-orange-500 rounded-full animate-bounce animation-duration-[0.4s]"></span>
                        <span className="w-3 h-3 bg-orange-500 rounded-full animate-bounce animation-duration-[0.4s] delay-75"></span>
                        <span className="w-3 h-3 bg-orange-500 rounded-full animate-bounce animation-duration-[0.4s] delay-150"></span>
                  </div>
            </div>
      );
}
