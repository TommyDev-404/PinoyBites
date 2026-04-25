import { useLocation } from "react-router-dom";
import { useEffect } from "react";

export default function ScollToTop() {
      const { pathname } = useLocation(); // <-- this is the current path

      useEffect(() => {
            window.scrollTo(0, 0); // <-- jump directly to top
      }, [pathname]); // triggers whenever pathname changes

      return null;
}