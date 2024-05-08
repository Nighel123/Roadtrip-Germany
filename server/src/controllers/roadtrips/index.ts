import { Response, Request, NextFunction } from "express";
import { Address, Roadtrip } from "../../models/Roadtrip";
import {
  IRoadtripForm,
  Month,
  RoadtripDestAddress,
  RoadtripDestAddressDocument,
  RoadtripDocument,
  RoadtripObject,
  RoadtripStartAddress,
  RoadtripStartAddressDocument,
  monthToNumber,
  months,
} from "common";
import path from "path";
import fs from "fs";
import rootPath from "app-root-path";
import { log } from "console";
import { User } from "../../models/User";
import { response } from "../helpers";
import { logout } from "../users";

export const getRoadtrips = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const roadtrips: RoadtripObject[] = await Roadtrip.find();
    response(res, 200, { roadtrips });
  } catch (error) {
    throw error;
  }
};

export const imageUpoad = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const handleError = (message: string): void => {
    response(res, 202, message);
  };

  try {
    if (!req.file) {
      //log("no files there");
      response(
        res,
        202,
        "Bitte ein Bild auswählen, dass du mit dem Roadtrip hochladen möchtest."
      );
      return;
    }
    const fileTypes: string[] = [".jpeg", ".jpg", ".png", ".tiff"];
    const extension = path.extname(req.file.originalname).toLowerCase();
    if (!fileTypes.includes(extension)) {
      const types = fileTypes.join(", ");
      response(
        res,
        202,
        `Das Bild muss von einem der folgenden Typen sein: ${types}`
      );
      return;
    }
    const id: string = req.body.newRoadtrip._id.toString();

    const root = rootPath.toString();
    const tempPath = req.file.path;
    const targetPath = path.join(root, `./imageUploads/${id}${extension}`);

    fs.rename(tempPath, targetPath, (err) => {
      if (err) {
        log(err);
        response(
          res,
          202,
          "ein Fehler ist passiert während das Bild hochgeladen wurde."
        );
        return;
      }
      response(res, 201, "OK");
    });
  } catch (error) {
    throw error;
  }
};

export const addRoadtrip = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    if (!req.file) {
      //log("no files there");
      response(
        res,
        202,
        "Bitte ein Bild auswählen, dass du mit dem Roadtrip hochladen möchtest."
      );
      return;
    }
    const extension = path.extname(req.file.originalname).toLowerCase();
    const body = req.body as IRoadtripForm;
    if (!req.session.userId) {
      response(
        res,
        202,
        `Du musst dich einloggen bevor du einen Roadtrip posten kannst.`
      );
      return;
    }
    const user = await User.findOne({ _id: req.session.userId });
    if (!user) {
      response(
        res,
        202,
        "Wir konnten keinen Nutzer passend zu deiner Session-Id finden."
      );
      return;
    }
    const {
      description,
      startLand,
      startTown,
      destLand,
      destTown,
      day,
      month,
      year,
    } = body;
    const startDateGF = new Date(`${year}/${monthToNumber(month)}/${day}`);
    const roadtrip = await new Roadtrip({
      iniUser: user.userName,
      description: description,
      startAddress: {
        town: startTown,
        land: startLand,
      },
      destAddress: {
        town: destTown,
        land: destLand,
      },
      startDateGF: startDateGF,
      imgExt: extension,
    });

    const newRoadtrip = await roadtrip.save();
    req.body.newRoadtrip = newRoadtrip;

    next();
  } catch (error) {
    throw error;
  }
};
