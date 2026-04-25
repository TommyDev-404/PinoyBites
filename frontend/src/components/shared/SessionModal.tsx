import {
      Dialog,
      DialogContent,
      DialogHeader,
      DialogTitle,
      DialogDescription,
      DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/auth.context";

export default function SessionExpiredModal() {
      const { showSessionModal, setShowSessionModal, logout } = useAuth();

      const handleLogin = async () => {
            await logout();
            setShowSessionModal(false);
            window.location.href = "/login";
      };

      return (
            <Dialog open={showSessionModal} onOpenChange={() => setShowSessionModal(false)}>
                  <DialogContent className="sm:max-w-md text-center">
                        <DialogHeader>
                              <DialogTitle>Session Expired</DialogTitle>
                              <DialogDescription>
                                    Please log in again to continue.
                              </DialogDescription>
                        </DialogHeader>
            
                        <DialogFooter className="flex justify-center">
                              <Button onClick={handleLogin} className="w-full">
                                    Okay
                              </Button>
                        </DialogFooter>
                  </DialogContent>
            </Dialog>
      );
}