import {deleteStorageObject, getStorageObject, setStorageObject} from "./storage";

export const getAccessToken = () => {
  return getStorageObject("token");

}

export const setSessionToken = (token: string) =>{
  setStorageObject("token", token);
}

export const getSessionUser = ()  => {
  const user = getStorageObject("user");
  if(user){
    return user;
  }
  return undefined;
}

export const setSessionUser = (sessionData: object) =>{
  setStorageObject("user", sessionData);
}

export const removeUser = () => {
  deleteStorageObject("user");
  deleteStorageObject("tokens");
}