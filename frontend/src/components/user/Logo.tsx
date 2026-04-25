import PinoyBitesLogo from '@/assets/PinoyBitesLogo.png';
import { useIsMobile } from '@/hooks/useIsMobile';

interface LogoProps {
      variant?: "light" | "dark";
      isHeroVisble?: boolean;
      size?: "sm" | "md";
}

export default function Logo({ variant = "dark", isHeroVisble, size='md' }: LogoProps) {
      const isMobile = useIsMobile();

      const textColor = isHeroVisble ? "text-white" : "text-gray-800";
      const accentColor = variant === "light" ? "text-amber-300" : "text-amber-600";

      return (
            <div className="flex items-center gap-2">
                  <img
                        src={PinoyBitesLogo}
                        height={isMobile ? 50 : 64}
                        width={isMobile ? 50 : 64}
                        className="object-contain"
                  />

                  <div className="font-semibold">
                        <div className={`${textColor} ${size === 'sm' ? 'text-xs' : 'text-[18px]'}`}>
                              Pinoy
                        </div>
                        <div className={`${accentColor} ${size === 'sm' ? 'text-sm -mt-0.5' : 'text-xl -mt-1.5'} font-bold`}>
                              Bites
                        </div>
                  </div>
            </div>
      );
}