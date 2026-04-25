import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Lock, User, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import Logo from '@/components/user/Logo';
import { useNavigate } from 'react-router-dom';
import type { AdminLoginData } from '@/types/admin/auth.types';
import { useAuth } from '@/context/auth.context';
import toast from 'react-hot-toast';
import { PlaySound } from '@/utils/PlaySound';
import { useModal } from '@/context/modal.context';


export default function AdminLogin() {
      const { setModalOpen } = useModal();
      const { adminLogin } = useAuth();

      const [showPassword, setShowPassword] = useState(false);
      const [error, setError] = useState('');
      const [isLoading, setIsLoading] = useState(false);
      const navigate = useNavigate();

      const { register, handleSubmit, formState: { errors } } = useForm<AdminLoginData>();

      const onSubmit = async (data: AdminLoginData) => {
            setIsLoading(true);
            try{
                  const message = await adminLogin(data);
                  
                  toast.success(message); // show success toast
                  PlaySound();
                  setIsLoading(false);
                  
                  setModalOpen({ modalToOpen: 'loginLoading' }); // opwn login loading
                  
                  setTimeout(() => {
                        setModalOpen({ modalToOpen: null });
                        navigate("/admin/dashboard"); // Redirect after successful registration
                  }, 1000);
            }catch(err: any) {
                  setIsLoading(false);
                  console.log(err);
                  toast.error(err.message || "Failed to login account");
                  PlaySound();
            }
      };

      return (
            <div className="min-h-screen bg-linear-to-br from-amber-50 via-orange-50 to-amber-100 flex items-center justify-center p-4">
                  <div className="w-full max-w-md">
                  {/* Logo */}
                  <div className="flex justify-center mb-8">
                        <Logo/>
                  </div>

                  <Card className="shadow-2xl border-2 border-amber-200">
                        <CardHeader className="text-center space-y-2">
                              <div className="flex justify-center mb-4">
                                    <div className="w-16 h-16 bg-amber-600 rounded-full flex items-center justify-center">
                                          <Lock className="text-white" size={32} />
                                    </div>
                              </div>
                              <CardTitle className="text-2xl font-bold">Admin Login</CardTitle>
                              <CardDescription>
                                    Enter your credentials to access the admin dashboard
                              </CardDescription>
                        </CardHeader>

                        <CardContent>
                              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                                    {error && (
                                          <Alert variant="destructive">
                                                <AlertDescription>{error}</AlertDescription>
                                          </Alert>
                                    )}

                                    <div className="space-y-2">
                                          <Label htmlFor="username">Username</Label>
                                          <div className="relative">
                                                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                                <Input
                                                      id="username"
                                                      type="text"
                                                      placeholder="Enter username"
                                                      className="pl-10"
                                                      {...register('username', { required: 'Username is required' })}
                                                />
                                          </div>
                                          {errors.username && (
                                                <p className="text-sm text-red-600">{errors.username.message}</p>
                                          )}
                                    </div>

                                    <div className="space-y-2">
                                          <Label htmlFor="password">Password</Label>
                                          <div className="relative">
                                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                                <Input
                                                      id="password"
                                                      type={showPassword ? 'text' : 'password'}
                                                      placeholder="Enter password"
                                                      className="pl-10 pr-10"
                                                      {...register('password', { required: 'Password is required' })}
                                                />
                                                <button
                                                      type="button"
                                                      onClick={() => setShowPassword(!showPassword)}
                                                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                                >
                                                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                                </button>
                                          </div>
                                          {errors.password && (
                                                <p className="text-sm text-red-600">{errors.password.message}</p>
                                          )}
                                    </div>
                                    
                                    <div className='flex justify-end'>
                                          <p className='underline text-xs text-stone-600'>Forgot password?</p>
                                    </div>
                                    <Button
                                          type="submit"
                                          className="w-full bg-amber-600 hover:bg-amber-700"
                                          disabled={isLoading}
                                    >
                                          {isLoading ? 'Logging in...' : 'Login'}
                                    </Button>

                              </form>
                        </CardContent>
                  </Card>

                  <p className="text-center text-sm text-gray-600 mt-6">
                        © 2026 Pinoy Bites. All rights reserved.
                  </p>
                  </div>
            </div>
      );
}
