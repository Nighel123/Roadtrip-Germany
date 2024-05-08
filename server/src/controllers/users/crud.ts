import { Request, Response } from "express";
import { User } from "../../models/User";
import { IRegisterInputs, UserObject, log, monthToNumber } from "common";
import { response } from "../helpers";
import bcrypt from "bcryptjs";

const saltRounds = 10;

const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const body = req.body as Pick<UserObject, "userName" | "password">;
    const user = await User.findOne({ userName: body.userName });
    if (!user) {
      response(res, 202, "Dieses Benutzernamen gibt es nicht.");
      return;
    }
    let { userName, email, birthday, sex, _id } = user;
    const passwordMatch = await bcrypt.compare(body.password, user?.password);
    if (passwordMatch) {
      if (req.session.userId) {
        response(res, 200, {
          message: "Du bist bereits eingeloggt.",
          user: { userName, email, birthday, sex, _id },
        });
        return;
      }
      req.session.userId = String(user._id);
      await req.session.save();
      //console.log(req.session.userId);

      response(res, 200, {
        message: "Du bist erfolgreich eingeloggt.",
        user: { userName, email, birthday, sex, _id },
      });
    } else {
      response(res, 202, "Das Passwort stimmt nicht.");
    }
  } catch (error) {
    throw error;
  }
};

const me = async (req: Request, res: Response): Promise<void> => {
  const { userId } = req.session;
  if (userId) {
    const user = await User.findOne({ _id: userId });
    if (user) {
      let { userName, email, birthday, sex, _id } = user;
      response(res, 200, {
        message: "OK",
        user: { userName, email, birthday, sex, _id },
      });
    } else {
      response(res, 204, "Kein Nutzer mit diesem Username.");
    }
  } else {
    response(res, 204, "Du bist nicht eingeloggt.");
  }
};

const logout = async (req: Request, res: Response): Promise<void> => {
  try {
    req.session.destroy((error: any) => {
      if (error) {
        console.log("destroying the session failed.", error);
        return;
      }
      console.log("session destroyed!", req.session?.userId);
    });
  } catch (ex) {
    throw ex;
  }
};

const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userName, password, email, sex, day, month, year } =
      req.body as IRegisterInputs;

    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);
    const monthNumber = monthToNumber(month);
    const date = `${year}/${monthNumber}/${day}`;
    const newUser: UserObject = await new User({
      userName: userName,
      password: hashedPassword,
      email: email,
      birthday: new Date(date),
      sex: sex,
    }).save();
    response(res, 201, {
      message: "Der User wurde erfolgreich erstellt.",
      user: newUser,
    });
  } catch (error) {
    throw error;
  }
};

export { logout, login, register, me };
