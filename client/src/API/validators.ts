import axios, { AxiosResponse } from "axios";
import { Month, AddressFrontend, ApiDataValidatorType } from "common";

const baseUrl: string =
  process.env.REACT_APP_SERVER_URL || "http://localhost:4000";

export const userNameValidator = async (
  userName: string
): Promise<AxiosResponse<ApiDataValidatorType>> => {
  try {
    const response: AxiosResponse<ApiDataValidatorType> = await axios.post(
      baseUrl + "/userNameValidator",
      { userName: userName }
    );
    return response;
  } catch (error) {
    throw error;
  }
};

export const emailValidator = async (
  email: string
): Promise<AxiosResponse<ApiDataValidatorType>> => {
  try {
    const response: AxiosResponse<ApiDataValidatorType> = await axios.post(
      baseUrl + "/emailValidator",
      { email: email }
    );
    return response;
  } catch (error) {
    throw error;
  }
};

export const dateValidator = async (
  day: number,
  month: Month,
  year: number
): Promise<AxiosResponse<ApiDataValidatorType>> => {
  try {
    const response: AxiosResponse<ApiDataValidatorType> = await axios.post(
      baseUrl + "/dateValidator",
      { day: day, month: month, year: year }
    );
    return response;
  } catch (error) {
    throw error;
  }
};

export const passwordValidator = async (
  password: string
): Promise<AxiosResponse<ApiDataValidatorType>> => {
  try {
    const response: AxiosResponse<ApiDataValidatorType> = await axios.post(
      baseUrl + "/passwordValidator",
      { password: password }
    );
    return response;
  } catch (error) {
    throw error;
  }
};

export const addressValidator = async (
  address: AddressFrontend
): Promise<AxiosResponse<ApiDataValidatorType>> => {
  try {
    const response: AxiosResponse<ApiDataValidatorType> = await axios.post(
      baseUrl + "/addressValidator",
      address
    );
    return response;
  } catch (error) {
    throw error;
  }
};

export const descriptionValidator = async (
  description: string
): Promise<AxiosResponse<ApiDataValidatorType>> => {
  try {
    const response: AxiosResponse<ApiDataValidatorType> = await axios.post(
      baseUrl + "/descriptionValidator",
      { description: description }
    );
    return response;
  } catch (error) {
    throw error;
  }
};
