import { useEffect, useState } from "react";

const MOBILE_BREAKPOINT = 768;

export function useIsMobile() {
      const [isMobile, setIsMobile] = useState<boolean>(false);

      useEffect(() => {
            function checkScreenSize() {
                  setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
            }

            // Run once when component mounts
            checkScreenSize();

            // Listen for resize
            window.addEventListener("resize", checkScreenSize);

            // Cleanup
            return () => {
                  window.removeEventListener("resize", checkScreenSize);
            };
      }, []);

      return isMobile;
}