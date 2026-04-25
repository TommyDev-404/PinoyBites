import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { useAuth } from "@/context/auth.context";

interface LogoutModalProps {
      open: boolean;
      onClose: () => void;
}

export default function LogoutModal({ open, onClose }: LogoutModalProps) {
      const { logout } = useAuth();

      return (
            <Dialog open={open} onOpenChange={onClose}>
                  <DialogContent className="max-w-sm">
                        <DialogHeader>
                        <DialogTitle className="flex items-center gap-2">
                              <LogOut size={20} className="text-red-600" /> Logout
                        </DialogTitle>
                        </DialogHeader>

                        <p className="text-sm text-gray-700 mt-2">
                        Are you sure you want to logout? You will be signed out of your account.
                        </p>

                        <DialogFooter className="mt-4 flex justify-end gap-2">
                        <Button variant="outline" onClick={onClose}>
                              Cancel
                        </Button>
                        <Button variant="destructive" onClick={logout}>
                              Logout
                        </Button>
                        </DialogFooter>
                  </DialogContent>
            </Dialog>
      );
}