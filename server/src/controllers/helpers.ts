import { RoadtripObject, UserFrontend, UserObject } from "common";
import { Response } from "express";

interface respObj {
  [index: string]: string | RoadtripObject | UserFrontend | RoadtripObject[];
}

export const response = (
  res: Response,
  status: 200 | 201 | 202 | 204 | 500,
  data: string | respObj
) => {
  if (typeof data === "string") {
    res.status(status).json({ message: data });
  } else {
    res.status(status).json(data);
  }
};
