import axios, { AxiosResponse } from "axios";
import { UserObject, ApiDataUserType } from "common";

const baseUrl: string =
  process.env.REACT_APP_SERVER_URL || "http://localhost:4000";

export const me = async (): Promise<AxiosResponse<ApiDataUserType>> => {
  try {
    const response: AxiosResponse<ApiDataUserType> = await axios.get(
      baseUrl + "/me",
      { withCredentials: true }
    );
    return response;
  } catch (error) {
    throw error;
  }
};

export const login = async (
  userName: string,
  password: string
): Promise<AxiosResponse<ApiDataUserType>> => {
  try {
    const response: AxiosResponse<ApiDataUserType> = await axios.post(
      baseUrl + "/login",
      {
        userName,
        password,
      },
      { withCredentials: true }
    );
    return response;
  } catch (error) {
    throw error;
  }
};

export const register = async (
  user: Partial<UserObject>
): Promise<AxiosResponse<ApiDataUserType>> => {
  try {
    const response: AxiosResponse<ApiDataUserType> = await axios.post(
      baseUrl + "/register",
      user
    );
    return response;
  } catch (error) {
    throw error;
  }
};

export const logout = async (): Promise<AxiosResponse<ApiDataUserType>> => {
  try {
    const response: AxiosResponse<ApiDataUserType> = await axios.get(
      baseUrl + "/logout",
      { withCredentials: true }
    );
    return response;
  } catch (error) {
    throw error;
  }
};
