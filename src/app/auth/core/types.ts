export type UserLogin = {
   username: string;
   password: string;
};
export type UserRegis = {
   username: string;
   password: string;
   first_name: string;
   last_name: string;
   email: string;
   password2: string;
};

export type UserData = {
   email: string;
   first_name: string;
   id: number;
   last_name: string;
   username: string;
};

export type UserProfile = {
   bio: string;
   birthdate: string;
   email: string;
   first_name: string;
   gender: string;
   last_name: string;
   profile_image: string;
   username: string;
};

export type ErrorAuth = "errorLogin";

export type ErrorAuthState = {
   error: string;
   message: string;
};
