
export type RegisterData = {
      username: string;
      email: string;
      contact: number;
      address: string;
      password: string;
};    

export type UserData = {
      user_id: number;
      username: string;
      email: string;
      address?: string;
      contact_num?: string;
      profile_image?: string;
      role: string
}

export type LoginData = {
      email: string;
      password: string;
};    

export type EmailVerificationData = {
      email: string;
};    

export type CodeVerificationData = {
      user_id: number;
      code: string;
};    

export type ChangePasswordData = {
      user_id: number;
      password: string;
};    

export type CodeFormType = {
      code0: string;
      code1: string;
      code2: string;
      code3: string;
      code4: string;
      code5: string;
};
