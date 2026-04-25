import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff, Loader2Icon } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { PlaySound } from "@/utils/PlaySound";
import { capitalizeWords } from "@/utils/helper";
import { useNavigate } from "react-router-dom";
import AuthLayout from "@/layout/AuthLayout";
import type { RegisterData  } from "@/types/user/auth.types";
import {
      CardContent,
      CardDescription,
      CardHeader,
      CardTitle,
} from "@/components/ui/card";
import { useModal } from "@/context/modal.context";
import { useAuth } from "@/context/auth.context";


export default function RegisterPage() {
      const { setModalOpen } = useModal();
      const { authRegister } = useAuth();
      const { register, handleSubmit, setValue } = useForm<RegisterData>();

      const [ showPassword, setShowPassword ] = useState<boolean>(false);
      const [ loading, setLoading ] = useState<boolean>(false);
      const navigate = useNavigate();

      const handleGoogleLogin = () => {
            // Replace this with Google OAuth logic
            alert("Google login clicked");
      };
      
      const onSubmit = async (data: RegisterData) => {
            setLoading(true);
            try {
                  // auth context 
                  const message = await authRegister(data);

                  setLoading(false);

                  toast.success(message); // show success toast
                  PlaySound();

                  setModalOpen({ modalToOpen: 'loginLoading' }); // opwn login loading
                  
                  setTimeout(() => {
                        setModalOpen({ modalToOpen: null });
                        navigate("/products"); // Redirect after successful registration
                  }, 1000);
                  
            } catch (error: any) {
                  // Handle errors
                  console.error(error.message);
                  toast.error(error.message || "Failed to create account");
            }
      };

      return (
            <AuthLayout>
                  <CardHeader className="text-center">
                        <CardTitle className="text-2xl font-bold">
                              Create Your Account
                        </CardTitle>

                        <CardDescription>
                        Fill in your details to register and remember it.
                        </CardDescription>
                  </CardHeader>

                  <CardContent>
                  
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3 mt-4">
                              <Input 
                                    {...register("username", { required: "Username is required" })}
                                    onChange={(e) => setValue("username", capitalizeWords(e.target.value))}
                                    type="text" 
                                    placeholder="Username" 
                                    required 
                                    style={{ textTransform: 'capitalize'}}
                                    className="py-5"
                              />
                              <Input 
                                    {...register("email", { required: "Email is required" })}
                                    type="email" 
                                    placeholder="Email" 
                                    required 
                                    className="py-5"
                              />
                              <Input 
                                    {...register("contact", { required: "Contact Number is required" })}
                                    type="number" 
                                    placeholder="Contact Number" 
                                    required 
                                    className="py-5"
                              />
                              <Input 
                                    {...register("address", { required: "Address is required" })}
                                    onChange={(e) => setValue("address", capitalizeWords(e.target.value))}
                                    type="text" 
                                    placeholder="Address" 
                                    required 
                                    className="py-5"
                              />
                              <div className="relative w-full">
                                    <Input
                                          {...register("password", { required: "Password is required" })}
                                          type={showPassword ? "text" : "password"}
                                          placeholder="Password"
                                          required
                                          className="pr-10 py-5" // extra padding for the icon
                                    />
                                          <Button
                                                type="button"
                                                variant="ghost"
                                                className="absolute top-1/2 right-2 -translate-y-1/2 p-1"
                                                onClick={() => setShowPassword(!showPassword)}
                                          >
                                                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                          </Button>
                              </div>

                              <Button 
                                    type="submit" 
                                    className="w-full py-5 mt-4"
                              >
                                    {loading ? 
                                          <>
                                                <Loader2Icon className="w-4 h-4 text-white animate-spin"/>
                                                Creating...
                                          </>
                                    :
                                          'Sign Up'
                                    }
                              </Button>

                              {/* Switch to Login */}
                              <div className="text-center mt-4 text-sm text-gray-600">
                                    Already have an account?{" "}
                                    <button type="button" className="text-amber-600 hover:underline font-medium" onClick={() => { navigate('/auth/login')}}>
                                    Login
                                    </button>
                              </div>
                        </form>
                  </CardContent>  
            </AuthLayout>
      );
}