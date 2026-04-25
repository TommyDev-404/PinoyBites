import { checkCurrentLoggedUser } from "@/auth/check-user.auth";
import { adminLoginService, adminLogoutService } from "@/services/admin/auth.services";
import { changePasswordService, codeVerificationService, emailVerificationService, loginService, logoutService, registerService } from "@/services/user/auth.services";
import type { AdminLoginData } from "@/types/admin/auth.types";
import type { EmailVerificationResponseType, NormalApiResponse } from "@/types/api-response.types";
import type { AccountCheckInfoType } from "@/types/user/account.types";
import type {LoginData, RegisterData } from "@/types/user/auth.types";
import { setSessionExpiredHandler } from "@/utils/sessionHandler";
import { createContext, useContext, useEffect, useState } from "react";


interface AuthContextType {
      user: AccountCheckInfoType | null; 
      recoveryUserId: number | null;
      showSessionModal: boolean;
      authLogin: (userData: LoginData) => Promise<string>;
      adminLogin: (userData: AdminLoginData) => Promise<string>; // new
      adminLogout: () => Promise<string>;
      authRegister: (userData: RegisterData) => Promise<string>;
      logout: () => Promise<string>;
      verifyEmail: (email: string) => Promise<EmailVerificationResponseType>;
      verifyCode: (code: string) => Promise<NormalApiResponse>;
      changeUserPassword: (password: string) => Promise<NormalApiResponse>;
      setShowSessionModal: (open: boolean) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// this auth context, track the user who are logged in or track their session
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
      const [user, setUser] = useState<AccountCheckInfoType | null>(null);
      const [ recoveryUserId, setRecoveryId ] = useState<number | null>(null);
      const [showSessionModal, setShowSessionModal] = useState(false); // general loading state
      
      // it check the user who logged in if their login token is valid, then they dont need to login again but it has a remember me feature - for user customer only not admin
      useEffect(() => {
            const fetchUser = async () => {
                  try {
                        const res = await checkCurrentLoggedUser(); 
                        setUser(res.user); 
                  } catch (err) {
                        setUser(null); // ensure user is null if invalid
                  }
            };
      
            fetchUser();
      }, []);

      useEffect(() => {
            setSessionExpiredHandler(async() => {
                  await new Promise(resolve => setTimeout(resolve, 400));
                  setUser(null);
                  
                  // show the home page when user session expired
                  if (window.location.pathname !== "/home" && user?.role === 'user') {
                        window.location.href = "/home";
                  }
            });
      }, []);
      
      // admin auth
      const adminLogin = async (data: AdminLoginData) => {
            try {
                  const res = await adminLoginService(data);
                  if (res.user.role !== "admin") {
                        throw new Error("Not authorized as admin");
                  }
                  
                  setUser(res.user);
                  return res.message;
            } catch (err: any) {
                  console.error("Admin login failed", err);
                  throw new Error(err?.message || "Admin login failed");
            }
      };

      const adminLogout = async() => {
            try{
                  const res = await adminLogoutService();
                  await new Promise(resolve => setTimeout(resolve, 600));

                  setUser(null);
                  return res.message;
            }catch(err){
                  console.error('Logout failed', err);
                  return "Logout failed";
            }
      };

      // user auth
      const authLogin = async (data: LoginData) => {
            try {
                  const res = await loginService(data);
                  setUser(res.user);

                  return res.message;
            }catch(err: any){
                  console.error("Login failed", err);
                  throw new Error(err?.message || "Login failed");
            }
      };

      const authRegister = async (data: RegisterData) => {
            try {
                  const res = await registerService(data);
                  setUser(res.user);
                  localStorage.setItem("hasSession", "true");
      
                  return res.message;
            }catch(err: any){
                  console.error("Login failed", err);
                  throw new Error(err?.message || "Registration failed");
            }
      };

      const logout = async() => {
            try{
                  const res = await logoutService();
                  
                  await new Promise(resolve => setTimeout(resolve, 600));
                  setUser(null);

                  return res.message;
            }catch(err){
                  console.error('Logout failed', err);
                  return "Logout failed";
            }
      };
      
      const verifyEmail = async (email: string): Promise<EmailVerificationResponseType> => {
            try {
                  const res = await emailVerificationService({ email });
                  if (res.user_id) {
                        setRecoveryId(res.user_id);
                  }
            
                  return res;
            }catch(err: any){
                  console.error("Login failed", err);
                  throw new Error(err?.message || "Registration failed");
            }
      };

      const verifyCode = async (code: string): Promise<NormalApiResponse> => {
            if (!recoveryUserId) throw new Error("User not logged in");
            
            try {
                  const res = await codeVerificationService({ user_id: recoveryUserId, code });
                  return res;
            } catch (err: any) {
                  console.error("Code verification failed", err);
                  throw new Error(err?.message || "Code verification failed");
            }
      };
      
      const changeUserPassword = async (password: string): Promise<NormalApiResponse> => {
            if (!recoveryUserId) throw new Error("User not logged in");

            try {
                  const res = await changePasswordService({ user_id: recoveryUserId, password });
                  return res;
            } catch (err: any) {
                  console.error("Change password failed", err);
                  throw new Error(err?.message || "Change password failed");
            } 
      };

      return (
            <AuthContext.Provider value={{ 
                  user, 
                  showSessionModal,
                  setShowSessionModal,
                  recoveryUserId,
                  adminLogin,
                  authLogin, 
                  authRegister, 
                  logout, 
                  adminLogout,
                  verifyEmail,
                  verifyCode,
                  changeUserPassword
            }}>
                  {children}
            </AuthContext.Provider>
      );
};

export const useAuth = () => {
      const context = useContext(AuthContext);
      if (!context) throw new Error("useAuth must be used within AuthProvider");
      return context;
};