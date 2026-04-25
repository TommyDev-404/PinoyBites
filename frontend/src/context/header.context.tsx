import { createContext, useContext, useState } from "react";

type PageHeaderContextType = {
      header: string | null;
      handleSetHeader: (name: string) => void;
};

const PageHeaderContext = createContext<PageHeaderContextType | undefined>(undefined);


export function PageHeaderProvider({ children }: { children : React.ReactNode }) {
      const [header, setHeader] = useState<string | null>(
            localStorage.getItem("currentPage")
      );

      const handleSetHeader = (name: string) => {
            setHeader(name);
            localStorage.setItem("currentPage", name);
      };

      return (
            <PageHeaderContext.Provider value={{ header, handleSetHeader }}>
                  {children}
            </PageHeaderContext.Provider>
      );
}

export const usePageHeader = () => {
      const context = useContext(PageHeaderContext);

      if (!context) {
            throw new Error("usePageHeader must be used within PageHeaderProvider");
      }

      return context;
};