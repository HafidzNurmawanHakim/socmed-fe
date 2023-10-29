import httpRequest from "./axiosSetup";

export const getFollower = () => {
   return httpRequest.get(`/api/member/get_follower`);
};
