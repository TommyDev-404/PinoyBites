import type { AccountInfoResponseType, EmailVerificationResponseType, NormalApiResponse } from "@/types/api-response.types";
import api from "../axios"; // your Axios instance
import type { LoginData, RegisterData, CodeVerificationData, EmailVerificationData, ChangePasswordData } from "@/types/user/auth.types";


export const registerService = async (data: RegisterData): Promise<AccountInfoResponseType> => {
      try {
            const response = await api.post<AccountInfoResponseType>("/auth/register", data);
            return response.data;
      } catch (error: any) {
            // Handle error properly
            if (error.response) {
                  // Backend responded with an error
                  throw new Error(error.response.data.message || "Failed to create account!");
            } else {
                  // Network error or other
                  throw new Error(error.message || "Failed to create account!");
            }
      }
};

export const loginService = async (data: LoginData): Promise<AccountInfoResponseType> => {
      try {
            const response = await api.post<AccountInfoResponseType>("/auth/login", data);
            return response.data;
      } catch (error: any) {
            // Handle error properly
            if (error.response) {
                  // Backend responded with an error
                  throw new Error(error.response.data.message || "Failed to login account!");
            } else {
                  // Network error or other
                  throw new Error(error.message || "Failed to login account!");
            }
      }
};

export const emailVerificationService = async (data: EmailVerificationData): Promise<EmailVerificationResponseType> => {
      try {
            const response = await api.post<EmailVerificationResponseType>("/auth/forgot/verify-email", data);
            return response.data;
      } catch (error: any) {
            // Handle error properly
            if (error.response) {
                  // Backend responded with an error
                  throw new Error(error.response.data.message || "Failed to verify email!");
            } else {
                  // Network error or other
                  throw new Error(error.message || "Failed to verify email!");
            }
      }
};

export const codeVerificationService = async (data: CodeVerificationData): Promise<NormalApiResponse> => {
      try {
            const response = await api.post<NormalApiResponse>("/auth/forgot/verify-code", data);
            return response.data;
      } catch (error: any) {
            // Handle error properly
            if (error.response) {
                  // Backend responded with an error
                  throw new Error(error.response.data.message || "Failed to verify recovery code!");
            } else {
                  // Network error or other
                  throw new Error(error.message || "Failed to verify recovery code!");
            }
      }
};

export const changePasswordService = async (data: ChangePasswordData): Promise<NormalApiResponse> => {
      try {
            const response = await api.post<NormalApiResponse>("/auth/forgot/change-password", data);
            return response.data;
      } catch (error: any) {
            // Handle error properly
            if (error.response) {
                  // Backend responded with an error
                  throw new Error(error.response.data.message || "Failed to verify recovery code!");
            } else {
                  // Network error or other
                  throw new Error(error.message || "Failed to verify recovery code!");
            }
      }
};

export const logoutService = async (): Promise<NormalApiResponse> => {
      try {
            const response = await api.post<NormalApiResponse>("/auth/logout");
            return response.data;
      } catch (error: any) {
            // Handle error properly
            if (error.response) {
                  // Backend responded with an error
                  throw new Error(error.response.data.message || "Failed to logout account!");
            } else {
                  // Network error or other
                  throw new Error(error.message || "Failed to logout account!");
            }
      }
};