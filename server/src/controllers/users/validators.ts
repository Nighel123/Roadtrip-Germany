import { Request, Response, NextFunction } from "express";
import { User } from "../../models/User";
import {
  Address,
  IRoadtripForm,
  Roadtrip,
  RoadtripObject,
  SingletonDate,
  UserObject,
} from "common";
import {
  dateSyntaxValidator,
  emailSyntaxValidator,
  passwordSyntaxValidator,
  userNameSyntaxValidator,
} from "../../helpers/syntaxValidators";
import { response } from "../helpers";

export const emailValidator = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { email } = req.body as Pick<UserObject, "email">;
  const isValid = emailSyntaxValidator(email);
  if (isValid !== true) {
    response(res, 202, isValid);
    return;
  }
  try {
    const user = await User.findOne({ email: email });
    if (user) {
      response(res, 202, "Diese Email existiert bereits.");
      return;
    }
  } catch (error) {
    throw error;
  }
  next();
};

export const userNameValidator = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { userName } = req.body as Pick<UserObject, "userName">;
  const isValid = userNameSyntaxValidator(userName);
  if (isValid !== true) {
    response(res, 202, isValid);
    return;
  }
  try {
    const user = await User.findOne({ userName: userName });
    if (user) {
      response(res, 202, "Dieser Nutzername existiert bereits.");
      return;
    }
  } catch (error) {
    throw error;
  }
  next();
};

export const passwordValidator = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const { password } = req.body as Pick<UserObject, "password">;
  const isValid = passwordSyntaxValidator(password);
  if (isValid !== true) {
    response(res, 202, isValid);
    return;
  }
  next();
};

export const dateValidator = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const { day, month, year } = req.body as SingletonDate;
  const isValid = dateSyntaxValidator(day, month, year);
  if (isValid !== true) {
    response(res, 202, isValid);
    return;
  }
  next();
};

export const addressValidator = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const testAddress = ({
    town,
    land,
    add = "",
  }: {
    town: string;
    land: string;
    add?: string;
  }): boolean => {
    if (2 > town.length || town.length > 60) {
      response(
        res,
        202,
        `Bitte gebe eine Stadt mit mindestens zwei und maximal 60 Buchstaben ein${
          add ? add : "."
        }`
      );
      return false;
    }

    if (2 > land.length || land.length > 60) {
      response(
        res,
        202,
        `Bitte gebe ein Land mit mindestens zwei und maximal 60 Buchstaben ein${
          add ? add : "."
        }`
      );
      return false;
    }
    return true;
  };

  /* only checks whether startLand is not empty */

  if (req.body.startLand === undefined || req.body.startTown === undefined) {
    const { town, land } = req.body as Address;
    const valid = testAddress({ town, land });
    if (!valid) {
      return;
    }
  } else {
    const { startLand, startTown } = req.body as IRoadtripForm;
    const validStart = testAddress({
      land: startLand,
      town: startTown,
      add: ", in der du starten möchtest.",
    });
    if (!validStart) {
      return;
    }
    const { destTown, destLand } = req.body as IRoadtripForm;
    const validDest = testAddress({
      town: destTown,
      land: destLand,
      add: ", in dem du starten möchtest.",
    });
    if (!validDest) {
      return;
    }
  }
  next();
};

export const descriptionValidator = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  /* only checks whether startLand is not empty */
  const { description } = req.body as Pick<Roadtrip, "description">;
  const min = 100,
    max = 5000;
  if (min > description.length) {
    response(
      res,
      202,
      `Bitte gebe eine Beschreibung mit mindestens ${min} Buchstaben ein.`
    );
    return;
  }
  if (max < description.length) {
    response(
      res,
      202,
      `Bitte gebe eine Beschreibung mit maximal ${max} Buchstaben ein.`
    );
    return;
  }
  next();
};

export const loggedInValidator = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  if (!req.session.userId) {
    response(
      res,
      202,
      `Du musst dich einloggen bevor du einen Roadtrip posten kannst.`
    );
    return;
  }
  next();
};
