
export type AccountInfoType = {
      user_id: number,
      username: string,
      email: string,
      address: string,
      contact_num: string,
      profile_image: string,
      role: string
};    

export type UpdateAccountInfoType = {
      username?: string,
      email?: string,
      address?: string,
      contact_num?: string,
      profile_image?: string,
};    

export type PasswordPayload = {
      password: string;
}

export type AccountCheckInfoType = {
      user_id: number,
      role: string
};    