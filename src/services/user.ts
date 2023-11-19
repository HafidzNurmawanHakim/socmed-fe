import httpRequest from "./axiosSetup";

export const getFollower = (idUser: number) => {
   return httpRequest.get(`/api/member/get_follower/${idUser}`);
};
