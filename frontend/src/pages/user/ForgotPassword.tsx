import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { Mail, ArrowLeft, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
      CardContent,
      CardDescription,
      CardHeader,
      CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useNavigate } from "react-router-dom";
import AuthLayout from "@/layout/AuthLayout";
import { useAuth } from "@/context/auth.context";
import type { CodeFormType } from "@/types/user/auth.types";


export default function ForgotPassword() {
      const { verifyEmail, verifyCode } = useAuth();
      const [step, setStep] = useState<"email" | "code">("email");
      const [error, setError] = useState("");
      const [success, setSuccess] = useState("");
      const [isLoading, setIsLoading] = useState(false);
      //const [ userID, setUserId ] = useState<number>(0);

      const navigate = useNavigate();
      const emailForm = useForm<{ email: string }>();
      const codeForm = useForm<CodeFormType>();

      const [otp, setOtp] = useState(["", "", "", "", "", ""]);
      const inputsRef = useRef<Array<HTMLInputElement | null>>([]);

      const sendEmail = async (data: { email: string }) => {
            setIsLoading(true);
            setError("");
            setSuccess("");

            await new Promise((r) => setTimeout(r, 1200));
            const emailVerificationSuccess = await verifyEmail(data.email); 

            if (emailVerificationSuccess.success) {
                  setSuccess(emailVerificationSuccess.message);
                  //setUserId(emailVerificationSuccess.data?.user_id!);
                  setStep("code");
                  setOtp(["", "", "", "", "", ""]); // clear previous inputs
            } else {
                  setError("Email not found.");
            }

            setIsLoading(false);
      };

      const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
            const val = e.target.value;

            if (!/^[0-9]?$/.test(val)) return; // only allow digits

            const newOtp = [...otp];
            newOtp[index] = val;
            setOtp(newOtp);

            // auto-focus next input
            if (val && index < 5) {
                  inputsRef.current[index + 1]?.focus();
            }

            // auto-focus previous on backspace
            if (!val && index > 0) {
                  inputsRef.current[index - 1]?.focus();
            }
      };

      const codeVerification = async () => {
            setIsLoading(true);
            setError("");

            const codeVerificationSuccess = await verifyCode(otp.join(""));

            if (codeVerificationSuccess.success) {
                  navigate("/auth/reset-password");
            } else {
                  setError("Invalid verification code.");
            }

            setIsLoading(false);
      };

      return (
            <AuthLayout>
                  <div className="flex justify-center">
                        <div className="w-16 h-16 bg-amber-600 rounded-full flex items-center justify-center">
                              {step === 'code' ?
                                    <Lock className="text-white" size={30} />
                              : 
                                    <Mail className="text-white" size={30} />
                              }
                        </div>
                  </div>

                  <CardHeader className="text-center">
                        <CardTitle className="text-2xl font-bold">
                              {step === "email" ? "Forgot Password" : "Verify Code"}
                        </CardTitle>

                        <CardDescription>
                              {step === "email"
                              ? "Enter your admin email to receive a reset code"
                              : "Enter the 6-digit verification code sent to your email"}
                        </CardDescription>
                  </CardHeader>

                  <CardContent>

                        {error && (
                              <Alert variant="destructive" className="mb-4">
                                    <AlertDescription>{error}</AlertDescription>
                              </Alert>
                        )}

                        {success && step === "code" && (
                              <Alert className="mb-4 border-green-200">
                                    <AlertDescription className="text-green-500 flex flex-col text-center items-center justify-center">
                                          {success}
                                    </AlertDescription>
                              </Alert>
                        )}

                        {/* EMAIL STEP */}
                        {step === "email" && (
                              <form onSubmit={emailForm.handleSubmit(sendEmail)} className="space-y-6">
                                    <div className="space-y-2">
                                          <div className="relative">
                                                <Mail
                                                      className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                                                      size={18}
                                                />
                                                <Input
                                                      id="email"
                                                      type="email"
                                                      placeholder="Enter your email"
                                                      className="pl-10 py-5"
                                                      {...emailForm.register("email", {
                                                            required: "Email is required",
                                                      })}
                                                />
                                          </div>
                                          {emailForm.formState.errors.email && (
                                          <p className="text-sm text-red-600">
                                                {emailForm.formState.errors.email.message}
                                          </p>
                                          )}
                                    </div>

                                    <Button
                                          type="submit"
                                          className="w-full bg-amber-600 hover:bg-amber-700"
                                          disabled={isLoading}
                                    >
                                          {isLoading ? "Sending..." : "Send Code"}
                                    </Button>
                              </form>
                        )}

                        {/* CODE STEP */}
                        {step === "code" && (

                              <form onSubmit={codeForm.handleSubmit(codeVerification)}>
                                    <div className="space-y-4">
                                          <div className="flex justify-center gap-2">
                                                {otp.map((digit, i) => (
                                                      <input
                                                            key={i}
                                                            {...codeForm.register(`code${i}` as keyof CodeFormType)}
                                                            maxLength={1}
                                                            value={otp[i]}
                                                            onChange={(e) => {
                                                                  handleOtpChange(e, i);
                                                                  codeForm.setValue(`code${i}` as keyof CodeFormType, e.target.value);
                                                            }}
                                                            ref={(el) => { inputsRef.current[i] = el }}
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
                                    </div>
                              </form>
                        )}

                        <div className="flex items-center gap-2 justify-center mt-4">
                              <p className="text-sm text-stone-700">Remember password?</p>
                              <span onClick={() => { navigate('/auth/login') }} className="text-sm font-medium text-amber-600 hover:underline cursor-pointer">Login</span>
                        </div>

                  </CardContent>
            </AuthLayout>
      );
}