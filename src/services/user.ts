import httpRequest from "./axiosSetup";

export const getFollower = () => {
   return httpRequest.get(`/api/member/get_follower`);
};

export const getProfile = () => {
   return httpRequest.get(`/user/get_profile`)
}
