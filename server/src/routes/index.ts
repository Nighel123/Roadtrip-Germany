import { Router, Request, Response } from "express";
import {
  addRoadtrip,
  getRoadtrips,
  imageUpoad,
} from "../controllers/roadtrips";
import {
  addressValidator,
  dateValidator,
  descriptionValidator,
  emailValidator,
  loggedInValidator,
  login,
  logout,
  me,
  passwordValidator,
  register,
  userNameValidator,
} from "../controllers/users";

import multer from "multer";
import { response } from "../controllers/helpers";

const router: Router = Router();

router.get("/roadtrips", getRoadtrips);

const upload = multer({
  dest: "./imageUploads",
  // you might also want to set some limits: https://github.com/expressjs/multer#limits
});

router.post(
  "/addRoadtrip",
  upload.single(
    "file"
  ) /* parsing the formData obj into the req. obj. thats why multer is on top */,
  loggedInValidator,
  addressValidator,
  descriptionValidator,
  dateValidator,
  addRoadtrip,
  imageUpoad
);

router.post("/login", login);
router.get("/logout", logout);
router.post(
  "/register",
  passwordValidator,
  userNameValidator,
  emailValidator,
  dateValidator,
  register
);
router.get("/me", me);

const ok = async (req: Request, res: Response): Promise<void> => {
  response(res, 200, "OK");
};
/* validators */
router.post("/userNameValidator", userNameValidator, ok);
router.post("/emailValidator", emailValidator, ok);
router.post("/passwordValidator", passwordValidator, ok);
router.post("/dateValidator", dateValidator, ok);
router.post("/addressValidator", addressValidator, ok);
router.post("/descriptionValidator", descriptionValidator, ok);

export default router;
