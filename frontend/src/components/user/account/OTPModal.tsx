import { useRef, useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/auth.context";
import type { PasswordPayload } from "@/types/user/account.types";
import toast from "react-hot-toast";

interface OtpModalProps {
      payload: PasswordPayload
      open: boolean;
      onClose: (open: boolean) => void;
}

export default function OtpModal({ payload, open, onClose }: OtpModalProps) {
      const { verifyCode, changeUserPassword } = useAuth();
      const [isLoading, setIsLoading] = useState(false);

      const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);
      const inputsRef = useRef<Array<HTMLInputElement | null>>([]);
      

      const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
      const value = e.target.value.replace(/[^0-9]/g, "");

      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (value && inputsRef.current[index + 1]) {
            inputsRef.current[index + 1]?.focus();
      }
      };

      const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
            if (e.key === "Backspace" && !otp[index] && inputsRef.current[index - 1]) {
                  inputsRef.current[index - 1]?.focus();
            }
      };

      const handleSubmit = async (e: React.SyntheticEvent) => {
            e.preventDefault();
            setIsLoading(true);
            
            try {
                  const code = otp.join("");
                  const res = await verifyCode(code);
            
                  if (res.success) {
                        await changeUserPassword(payload.password);
                        toast.success("Password changed successfully!"); // ✅ Toast success
                        onClose(false); // close modal after success
                  } else {
                        toast.error(res.message || "Verification failed"); // ✅ Toast error
                  }
            } catch (err: any) {
                  console.error(err);
                  toast.error(err?.message || "Something went wrong. Try again."); // ✅ Toast error
            } finally {
                  setIsLoading(false);
            }
      };

      // close modal and clear otp
      const handleClose = (open: boolean) => {
            if (!open) setOtp(["", "", "", "", "", ""]);
            onClose(open);
      };

      return (
            <Dialog open={open} onOpenChange={handleClose}>
                  <DialogContent className="sm:max-w-md">
                        <DialogHeader>
                              <DialogTitle className="text-center">Enter Verification Code</DialogTitle>
                              <DialogDescription       className="text-center text-sm text-gray-500 mt-1">
                                    We’ve sent a 6-digit verification code to your email. Please enter it below to continue.
                              </DialogDescription>
                        </DialogHeader>
                        <form onSubmit={handleSubmit} className="space-y-6">
                              <div className="flex justify-center gap-2">
                                    {otp.map((digit, i) => (
                                          <input
                                                key={i}
                                                ref={(el) => {inputsRef.current[i] = el}}
                                                type="text"
                                                inputMode="numeric"
                                                maxLength={1}
                                                value={digit}
                                                onChange={(e) => handleChange(e, i)}
                                                onKeyDown={(e) => handleKeyDown(e, i)}
                                                className="w-10 h-12 text-center border border-gray-300 rounded-md text-xl focus:border-amber-600 focus:ring-1 focus:ring-amber-600"
                                          />
                                    ))}
                              </div>

                              <Button
                                    type="submit"
                                    className="w-full bg-amber-600 hover:bg-amber-700"
                                    disabled={isLoading || otp.some((d) => !d)}
                              >
                                    {isLoading ? "Verifying..." : "Verify Code"}
                              </Button>
                        </form>
                  </DialogContent>
            </Dialog>
      );
}
