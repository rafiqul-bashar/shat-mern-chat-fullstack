import axios from "axios";
export const host = import.meta.env.VITE_HOST;
export const axiosLocal = axios.create({
  baseURL: host,
  timeout: 8000,
});

export const loginRoute = `/api/auth/login`;
export const registerRoute = `/api/auth/register`;
export const logoutRoute = `/api/auth/logout`;
export const allUsersRoute = `/api/auth/allusers`;
export const sendMessageRoute = `/api/messages/addmsg`;
export const recieveMessageRoute = `/api/messages/getmsg`;
export const setAvatarRoute = `/api/auth/setavatar`;
