import {
      Dialog,
      DialogContent,
      DialogHeader,
      DialogTitle,
      DialogDescription,
} from "@/components/ui/dialog";
import LoginForm from "@/components/user/authentication/LoginForm";

type LoginProps = {
      open: boolean,
      onClose: () => void
};

export default function LoginModal({ open, onClose } : LoginProps) {

      return (
            <Dialog open={open} onOpenChange={onClose}>
                  <DialogContent className="sm:max-w-md">
                        <DialogHeader>
                              <DialogTitle className="text-center text-xl">Login Account</DialogTitle>
                              <DialogDescription className="text-center">
                                    Enter your credentials or continue with Google/Facebook
                              </DialogDescription>
                        </DialogHeader>

                        <LoginForm
                              formUsage={'modal'}
                              onClose={onClose}
                        />
                  </DialogContent>
            </Dialog>
      );
}