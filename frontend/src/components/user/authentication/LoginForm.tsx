import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/auth.context";
import { useModal } from "@/context/modal.context";
import { PlaySound } from "@/utils/PlaySound";
import toast from "react-hot-toast";
import type { LoginData } from "@/types/user/auth.types";
import { Eye, EyeOff, Loader2Icon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import google from "@/assets/google.png";

type LoginForm = {
      email: string;
      password: string;
};

type LoadingState = "idle" | "validating";


interface LoginFormProps {
      formUsage: 'modal' | 'page';
      onClose?: () => void;
}

export default function LoginForm({ formUsage, onClose }: LoginFormProps) {
      const { authLogin } = useAuth();
      const { setModalOpen } = useModal();
      const navigate = useNavigate();

      const [showPassword, setShowPassword] = useState(false);
      const [loadingState, setLoadingState] = useState<LoadingState>("idle");

      // Use useForm
      const { register, handleSubmit, formState: { errors } } = useForm<LoginForm>();
      
      const onSubmit = async (data: LoginData) => {
            setLoadingState('validating');
            try {
                  // auth context 
                  await authLogin(data);
                  
                  setLoadingState('idle');
                  
                  setModalOpen({ modalToOpen: 'loginLoading' }); // opwn login loading

                  await new Promise((r) => setTimeout(r, 500));

                  setModalOpen({ modalToOpen: null });
                  navigate("/products"); // Redirect after successful registration
            } catch (error: any) {
                  setLoadingState('idle');
                  // Handle errors
                  console.error(error.message);
                  toast.error(error.message || "Failed to login account");
                  PlaySound();
            }
      };

      const handleGoogleLogin = () => {
            alert("Google login clicked");
      };
      
      return (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-4">
                  <div className="flex flex-col space-y-2">
                        <Input
                              type="email"
                              placeholder="Email"
                              className="py-5"
                              {...register("email", { required: "Email is required" })}
                        />
                        {errors.email && <span className="text-red-500 text-sm">{errors.email.message}</span>}

                        <div className="relative w-full">
                              <Input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Password"
                                    className="pr-10 py-5"
                                    {...register("password", { required: "Password is required" })}
                              />
                              {errors.password && (
                                    <span className="text-red-500 text-sm absolute -bottom-5 left-0">{errors.password.message}</span>
                              )}

                              <Button
                                    type="button"
                                    variant="ghost"
                                    className="absolute top-1/2 right-2 -translate-y-1/2 p-1"
                                    onClick={() => setShowPassword(!showPassword)}
                              >
                                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                              </Button>
                        </div>
                  </div>

                  <div className="flex justify-end">
                        <p
                              onClick={() => {
                                    if (formUsage === 'page') {
                                          navigate?.("/auth/forgot-password");
                                    } else {
                                          navigate("/auth/forgot-password");
                                    }
                              }}
                              className="text-xs text-stone-600 hover:underline cursor-pointer"
                        >
                              Forgot Password?
                        </p>
                  </div>

                  <Button
                        type="submit"
                        className={`w-full py-5 ${
                        loadingState === "validating" ? "bg-amber-600 pointer-events-none" : "bg-amber-500 hover:bg-amber-600"}`}
                  >
                        {loadingState === "idle" && "Login"}
                        {loadingState === "validating" && (
                              <>
                                    <Loader2Icon className="w-4 h-4 animate-spin text-white mr-2" />
                                    Validating...
                              </>
                        )}
                  </Button>

                  <div className="flex items-center justify-center gap-2">
                        <span className="text-gray-400">or</span>
                  </div>

                  <div className="flex flex-col space-y-2 mt-2">
                        <Button
                              variant="outline"
                              onClick={handleGoogleLogin}
                              className="w-full flex items-center justify-between gap-2 py-5"
                        >
                              <img src={google} alt="Google" className="w-5 h-5" />
                              Continue with Google
                              <div />
                        </Button>
                  </div>

                  <div className="text-center mt-4 text-sm text-gray-600">
                        Don’t have an account?{" "}
                        <button
                              type="button"
                              className="text-amber-600 hover:underline font-medium"
                              onClick={() => {
                                    if (formUsage === 'page') {
                                          navigate?.("/auth/create-account");
                                    } else {
                                          onClose?.();
                                          navigate("/auth/create-account");
                                    }
                              }}
                        >
                              Create account
                        </button>
                  </div>
            </form>
      );
}