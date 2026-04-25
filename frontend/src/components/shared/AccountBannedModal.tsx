import { useGlobalContext } from "@/context/global.context";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/auth.context";

export const BannedModal = () => {
      const { logout } = useAuth();
      const { bannedReason, setBannedReason } = useGlobalContext();
      
      if (!bannedReason) return null;

      const handleOk = () => {
            setBannedReason(undefined);
            logout();
      };

      return (
            <Dialog open={!!bannedReason} onOpenChange={handleOk}>
                  <DialogContent>
                  <DialogHeader>
                        <DialogTitle>Account Banned</DialogTitle>
                        <DialogDescription>
                              Your account has been banned. <br /> Reason: {bannedReason}
                        </DialogDescription>
                  </DialogHeader>
                  <DialogFooter>
                        <Button onClick={handleOk}>OK</Button>
                  </DialogFooter>
                  </DialogContent>
            </Dialog>
      );
};