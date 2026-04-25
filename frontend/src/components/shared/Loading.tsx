
import PinoyBitesLogo from '@/assets/PinoyBitesLogo.png';

export default function Loading() {
      return (
            <div className="fixed inset-0 flex flex-col items-center justify-center bg-white z-50">
                  {/* Animated Icon */}
                  <div className="animate-bounce text-amber-500 text-6xl drop-shadow-lg">
                        <img
                              src={PinoyBitesLogo}
                              height={100}
                              width={100}
                              className="object-contain"
                        />
                  </div>

                  {/* Text with dots animation */}
                  <p className="text-sm font-bold text-gray-700">Loading Pinoy Bites...</p>

                  {/* Optional subtle shimmer */}
                  <div className="mt-4 w-60 h-1 bg-amber-200 rounded-full overflow-hidden relative">
                        <div className="absolute w-30 h-1 bg-amber-500 animate-[shimmer_1.5s_infinite]"></div>
                  </div>

                  <style>
                        {`
                        @keyframes shimmer {
                              0% { left: -50%; }
                              50% { left: 100%; }
                              100% { left: 100%; }
                        }
                        `}
                  </style>
            </div>
      )
}