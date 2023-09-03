export type UserLogin = {
   username: string;
   password: string;
};

export type UserData = {
   email: string;
   first_name: string;
   id: number;
   last_name: string;
   username: string;
};

export type ErrorAuth = "errorLogin";

export type ErrorAuthState = {
   error: string;
   message: string;
};
