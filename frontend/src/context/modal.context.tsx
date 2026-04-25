import { createContext, useContext, useState  } from "react";
import type { CartItem, ViewProductRecipe } from "@/types/user/products.types";
import type { CheckOutPayload } from "@/types/user/cart.types";
import type { ProductToBeRatedInfo, ViewOrderPayload } from "@/types/user/notification.types";
import type { PasswordPayload } from "@/types/user/account.types";
import type { AdminAllOrdersInfo } from "@/types/admin/orders.types";
import ConfirmationModal from "@/components/shared/ConfirmationModal";
import OverlaySpinner from "@/components/shared/OverlaySpinner";
import LoginModal from "@/components/user/authentication/LoginModal";

type ModalOption = 
      'loginModal' |
      'addToCart' | 
      'placeOrder' | 
      'loginLoading' |
      'logoutLoading' |
      'notifInfo' |
      'logoutConfirmation' |
      'removeConfirmation' |
      'viewProductInfo' |
      'verifyOtp' |
      'adminOrderDetails' |
      'adminAddTier' |
      'adminUpdateTier' |
      'adminBanCustomer' |
      'adminUnBanCustomer' |
      null;

type ModalData = {
      modalToOpen: ModalOption
      productPayload?: CartItem;
      checkoutPayload?: CheckOutPayload;
      productInfo?: ViewProductRecipe;
      placeOrderPayload?: CartItem;
      viewOrderInfoPayload?: ViewOrderPayload;
      message?: string;
      actionName?: string;
      customerId?: number;
      productToRate?: ProductToBeRatedInfo,
      otpPayload?: PasswordPayload,
      adminAllOrderPayload?: AdminAllOrdersInfo;
      function?: (id?: number) => Promise<any>;
}

type ModalContextType = {
      modalOpen: ModalData;
      setModalOpen: React.Dispatch<React.SetStateAction<ModalData>>;
};

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export function ModalProvider({ children }: { children: React.ReactNode }) {
      const [ modalOpen, setModalOpen ] = useState<ModalData>({ modalToOpen : null });

      return(
            <ModalContext.Provider value={{ modalOpen, setModalOpen }}>
                  {children}
                  

                  {/* GLOBAL MODAL HERE */}
                  <ConfirmationModal 
                        message={modalOpen.message!} 
                        modalType={'remove'}
                        actionName={modalOpen.actionName!}
                        open={modalOpen.modalToOpen === "removeConfirmation"} 
                        onClose={() => setModalOpen({ modalToOpen : null })}
                        execFunc={modalOpen.function}
                  />

                  <ConfirmationModal 
                        message={modalOpen.message!} 
                        modalType={'logout'}
                        actionName={modalOpen.actionName!}
                        open={modalOpen.modalToOpen === "logoutConfirmation"} 
                        onClose={() => setModalOpen({ modalToOpen : null })}
                        execFunc={modalOpen.function}
                  />

                  <OverlaySpinner open={modalOpen.modalToOpen === "loginLoading"} message={'Logging in...'}/>
                  <OverlaySpinner open={modalOpen.modalToOpen === "logoutLoading"} message={'Logging out...'}/>
                  
                  <LoginModal open={modalOpen.modalToOpen === 'loginModal'} onClose={() => setModalOpen({ modalToOpen : null })} />
            </ModalContext.Provider>
      );

}

export const useModal = () => {
      const context = useContext(ModalContext);
      if (!context) {
            throw new Error("useAuthModal must be used within an AuthModalProvider");
      }
      return context;
};