export type FormUserProfile = {
   username: string;
   first_name: string;
   last_name: string;
   birthdate: string;
   gender: "M" | "F";
   profile_image: string;
   email: string;
   bio: string;
};

export const initialUserProfile: FormUserProfile = {
   username: "",
   first_name: "",
   last_name: "",
   birthdate: "",
   gender: "M",
   profile_image: "",
   email: "",
   bio: "",
};
