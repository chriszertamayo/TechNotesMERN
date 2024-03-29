import { Router } from "express";
const router = Router();
import usersController from "../controllers/usersController.js";
import verifyJWT from "../middleware/verifyJWT.js";

router.use(verifyJWT);

router
  .route("/")
  .get(usersController.getAllUsers)
  .post(usersController.createNewUser)
  .patch(usersController.updateUser)
  .delete(usersController.deleteUser);

export default router;
