import axios, { AxiosResponse } from "axios";
import { ApiDataRoadtripsType, ApiDataValidatorType } from "common";

const baseUrl: string =
  process.env.REACT_APP_SERVER_URL || "http://localhost:4000";

export const getRoadtrips = async (): Promise<
  AxiosResponse<ApiDataRoadtripsType>
> => {
  try {
    const response: AxiosResponse<ApiDataRoadtripsType> = await axios.get(
      baseUrl + "/roadtrips",
      { withCredentials: true }
    );
    return response;
  } catch (error) {
    throw error;
  }
};

export const addRoadtrip = async (
  formData: FormData
): Promise<AxiosResponse<ApiDataValidatorType>> => {
  try {
    const response: AxiosResponse<ApiDataValidatorType> = await axios.post(
      baseUrl + "/addRoadtrip",
      formData,
      { withCredentials: true }
    );
    return response;
  } catch (error) {
    throw error;
  }
};
